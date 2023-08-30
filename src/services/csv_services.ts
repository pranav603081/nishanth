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

    //save data in collections
    async saveCsvDetails(csv_details) {
        console.log("entered");
        await csv_object.saveCsvRepoDetails(csv_details);

    }

    // create csv form data in upload directory
    async saveCsvFile(request) {
        const { file } = request; // Assuming the payload field is named 'file'
        const subdirectory = 'uploads'; // Name of the subdirectory
        const filename = file.hapi.filename; // Extract the original filename
        const subdirectoryPath = path.join(__dirname, subdirectory);
        const filePath = path.join(subdirectoryPath, filename);
        if (!fs.existsSync(subdirectoryPath)) {
            fs.mkdirSync(subdirectoryPath);
        }
        const writeStream = fs.createWriteStream(filePath);
        file.pipe(writeStream);
        // Wait for the file to be completely saved
        await new Promise((resolve) => {
            writeStream.on('finish', resolve);
        });
    }

    // async createChunk(chunkSize) {

    //     const inputFolderPath = path.join(__dirname, "uploads");
    //     const outputDirectory = path.join(__dirname, "chunks");

    //     //console.log("inputFolderPath",inputFolderPath);
    //     // Create the output directory if it doesn't exist
    //     if (!fs.existsSync(outputDirectory)) {
    //         fs.mkdirSync(outputDirectory);
    //     }
    //     // Read and process each CSV file in the input folder
    //     fs.readdir(inputFolderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
    //         if (err) {
    //             console.error('Error reading input folder:', err);
    //             return;
    //         }

    //         files.forEach((file: string, fileIndex: number) => {
    //             if (file.endsWith('.csv')) {
    //                 const inputFilePath: string = path.join(inputFolderPath, file);
    //                 //console.log("inputFilePath",inputFilePath);
    //                 processCsvFile(inputFilePath, fileIndex);
    //             }
    //         });
    //     });

    //     function processCsvFile(inputFilePath: string, fileIndex: number): void {
    //         const inputStream: fs.ReadStream = fs.createReadStream(inputFilePath);
    //         const rl: readline.Interface = readline.createInterface({
    //             input: inputStream,
    //             crlfDelay: Infinity
    //         });

    //         let chunkIndex: number = 0;
    //         let lines: string[] = [];

    //         rl.on('line', (line: string) => {
    //             lines.push(line);
    //             if (lines.length >= chunkSize) {
    //                 saveChunk(lines.slice(), fileIndex, chunkIndex);
    //                 lines = [];
    //                 chunkIndex++;
    //             }
    //         });

    //         rl.on('close', () => {
    //             if (lines.length > 0) {
    //                 saveChunk(lines, fileIndex, chunkIndex);
    //             }
    //         });
    //     }

    //     function saveChunk(chunkLines: string[], fileIndex: number, chunkIndex: number): void {
    //         const chunkFilePath: string = path.join(outputDirectory, `file${fileIndex}_chunk${chunkIndex}.csv`);
    //         const chunkData: string = chunkLines.join('\n') + '\n';

    //         fs.writeFile(chunkFilePath, chunkData, (writeErr: NodeJS.ErrnoException | null) => {
    //             if (writeErr) {
    //                 console.error('Error writing chunk file:', writeErr);
    //             } else {
    //                 //console.log(`Chunk ${chunkIndex} of file ${fileIndex} written to ${chunkFilePath}`);
    //             }
    //         });
    //     }
    // }

    // create chunk directory and chunk files from csv
    async createChunk(chunkSize) {

        const inputFolderPath = path.join(__dirname, "uploads");
        const outputDirectory = path.join(__dirname, "chunks");

        //console.log("inputFolderPath",inputFolderPath);
        // Create the output directory if it doesn't exist
        if (!fs.existsSync(outputDirectory)) {
            fs.mkdirSync(outputDirectory);
        }

        // Read and process each CSV file in the input folder
        const files = await fs.promises.readdir(inputFolderPath);

        console.log("files", files);

        for (const file of files) {
            if (file.endsWith('.csv')) {
                const inputFilePath: string = path.join(inputFolderPath, file);
                //console.log("inputFilePath",inputFilePath);
                await processCsvFile(inputFilePath);
            }
        };

        async function processCsvFile(inputFilePath: string) {
            const inputStream: fs.ReadStream = fs.createReadStream(inputFilePath);
            const rl: readline.Interface = readline.createInterface({
                input: inputStream,
                crlfDelay: Infinity
            });

            let chunkIndex: number = 0;
            let lines: string[] = [];

            for await (const line of rl) {
                lines.push(line);
                // rl.on('line', (line: string) => {
                //     lines.push(line);
                if (lines.length >= chunkSize) {
                    await saveChunk(lines.slice(), chunkIndex);
                    lines = [];
                    chunkIndex++;
                }
            };


            if (lines.length > 0) {
                await saveChunk(lines, chunkIndex);
            }
            console.log(`Chunk files created for ${inputFilePath}`);

        }

        async function saveChunk(chunkLines: string[], chunkIndex: number) {
            const chunkFilePath: string = path.join(outputDirectory, `file_chunk${chunkIndex}.csv`);
            const chunkData: string = chunkLines.join('\n') + '\n';

            await fs.promises.writeFile(chunkFilePath, chunkData);
            console.log(`Chunk file saved: ${chunkFilePath}`);
        }
    }

    // save csv records using chunk files
    async saveCsvDetails_v2() {
        console.log("entered");
        //await csv_object.saveCsvRepoDetails(csv_details);
        const outputDirectory = path.join(__dirname, "chunks");
        // Read and process each CSV file in the input folder
        const filesArray = await fs.promises.readdir(outputDirectory);
        //console.log("files",filesArray);

        if (filesArray.length > 0) {
            console.log('Files in the directory:');
            //console.log(filesArray);

            // Use Promise.all to process files in parallel
            await Promise.all(filesArray.map(processFile));

            console.log('All files processed');
        } else {
            console.log('No files found in the directory.');
        }

        async function processFile(fileName: string): Promise<void> {

            // Perform some asynchronous operation on the file
            console.log(`Processing file: ${fileName}`);

            let csv_details = await getCsvDetailsByFile(fileName);
            console.log("csv_details", csv_details);
            //await csv_object.saveCsvRepoDetails(csv_details);

        }

        //using fast-csv
        async function getCsvDetailsByFile(fileName) {
            const outputDirectory = path.join(__dirname, "chunks");
            const filePath = path.join(outputDirectory, fileName);
            console.log("getCsvDetails services", filePath);

            const readStream = fs.createReadStream(filePath);

            const parsedRows: any[] = [];

            await new Promise<void>((resolve, reject) => {
                readStream.pipe(fastcsv.parse({ headers: true }))
                    .on('data', (row) => {
                        //console.log('Parsed row:', row);
                        parsedRows.push(row);
                    })
                    .on('end', () => {
                        console.log(`Parsing complete for ${path.basename(filePath)}`);
                        resolve();
                    })
                    .on('error', (error) => {
                        console.error(`Error parsing file ${filePath}:`, error);
                        reject(error);
                    });
            });

            return parsedRows;
        }

    }

    async deleteFiles() {
        const uploads_directory_path = path.join(__dirname, "uploads");
        const chunks_directory_path = path.join(__dirname, "chunks");

        await deleteDirectoryIfExists(uploads_directory_path);
        await deleteDirectoryIfExists(chunks_directory_path);

        async function deleteDirectoryIfExists(directoryPath: string): Promise<void> {
            const isDirectoryExists = await fs.promises.stat(directoryPath)
                .then(stats => stats.isDirectory())
                .catch(() => false);

            if (isDirectoryExists) {
                await fs.promises.rm(directoryPath, { recursive: true });
                //console.log(`Directory ${directoryPath} deleted.`);
            } else {
                //console.log(`Directory ${directoryPath} does not exist.`);
            }

        }

    }
    //get csv details from collection
    async getCsvRepoDetails(filter) {
        console.log("entered service");
        let csv_repo_details = await csv_object.getCsvRepoDetails(filter);
        return csv_repo_details;

    }
}

export const csvServices = new CsvServices();
