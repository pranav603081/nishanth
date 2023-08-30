const csvParser = require('csv-parser');
const fastcsv = require('fast-csv');
import * as readline from 'readline';

import fs from 'fs';
import path from 'path';
import { csv_object } from '../repositories';

export class CsvServices {

    //using csv-parser
    async getCsvDetails(uploadedStream) {
        console.log("getCsvDetails services");
        const results = await new Promise<any[]>((resolve, reject) => {
            const parsedData: any[] = [];

            uploadedStream
                .pipe(csvParser())
                .on('data', (data: any) => {
                    parsedData.push(data);
                })
                .on('end', () => {
                    resolve(parsedData);
                })
                .on('error', (error: any) => {
                    reject(error);
                });
        });
        return results;
    }

    //using fast-csv
    async getCsvDetails_v2(uploadedStream) {
        console.log("getCsvDetails services");
        const parsedRows: any[] = [];
        const csvStream = fastcsv.parse({ headers: true })
            .on('data', (row) => {
                // Process each row here
                parsedRows.push(row);
            })
            .on('end', () => {
                console.log('CSV parsing finished.');
            });

        uploadedStream.pipe(csvStream);

        await new Promise((resolve) => {
            uploadedStream.on('end', resolve);
        });

        return parsedRows;
    }

    async savePayload(request) {
        const { file } = request; // Assuming the payload field is named 'file'
        const subdirectory = 'uploads'; // Name of the subdirectory
        const filename = file.hapi.filename; // Extract the original filename
        const subdirectoryPath = path.join(__dirname, subdirectory);
        const filePath = path.join(subdirectoryPath, filename);
        if (!fs.existsSync(subdirectoryPath)) {
            fs.mkdirSync(subdirectoryPath);
        }
        const writeStream = fs.createWriteStream(filePath);
        await file.pipe(writeStream);
    }

    async createChunk(inputFolderPath, outputDirectory, chunkSize) {
        //console.log("inputFolderPath",inputFolderPath);
        // Create the output directory if it doesn't exist
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
        }
        // Read and process each CSV file in the input folder
        fs.readdir(inputFolderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
            if (err) {
                console.error('Error reading input folder:', err);
                return;
            }

            files.forEach((file: string, fileIndex: number) => {
                if (file.endsWith('.csv')) {
                    const inputFilePath: string = path.join(inputFolderPath, file);
                    //console.log("inputFilePath",inputFilePath);
                    processCsvFile(inputFilePath, fileIndex);
                }
            });
        });

        function processCsvFile(inputFilePath: string, fileIndex: number): void {
            const inputStream: fs.ReadStream = fs.createReadStream(inputFilePath);
            const rl: readline.Interface = readline.createInterface({
                input: inputStream,
                crlfDelay: Infinity
            });
        
            let chunkIndex: number = 0;
            let lines: string[] = [];
        
            rl.on('line', (line: string) => {
                lines.push(line);
                if (lines.length >= chunkSize) {
                    saveChunk(lines.slice(), fileIndex, chunkIndex);
                    lines = [];
                    chunkIndex++;
                }
            });
        
            rl.on('close', () => {
                if (lines.length > 0) {
                    saveChunk(lines, fileIndex, chunkIndex);
                }
            });
        }

        function saveChunk(chunkLines: string[], fileIndex: number, chunkIndex: number): void {
            const chunkFilePath: string = path.join(outputDirectory, `file${fileIndex}_chunk${chunkIndex}.csv`);
            const chunkData: string = chunkLines.join('\n') + '\n';
        
            fs.writeFile(chunkFilePath, chunkData, (writeErr: NodeJS.ErrnoException | null) => {
                if (writeErr) {
                    console.error('Error writing chunk file:', writeErr);
                } else {
                    //console.log(`Chunk ${chunkIndex} of file ${fileIndex} written to ${chunkFilePath}`);
                }
            });
        }
    }

    //adding worker threads
    async getCsvDetails_v3(request) {
        console.log("getCsvDetails_v3 services");
        //await this.savePayload(request);
        const input_folder_path = path.join(__dirname, "uploads");
        const outputDirectory = path.join(__dirname, "chunks");
        const chunkSize = 1000000; // Number of lines per chunk

        await this.createChunk(input_folder_path, outputDirectory, chunkSize);
        return [{ name: "sharu", address: "pune" }, { name: "nishanth", address: "banglore" }, { name: "nishanth", address: "banglore" }];

    }

    async getCsvRepoDetails(filter) {
        console.log("entered service");
        let csv_repo_details = await csv_object.getCsvRepoDetails(filter);
        return csv_repo_details;

    }

    async saveCsvDetails(csv_details) {
        console.log("entered");
        csv_object.saveCsvRepoDetails(csv_details);

    }
}

export const csvServices = new CsvServices();
