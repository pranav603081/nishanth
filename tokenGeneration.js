const jwt = require('jsonwebtoken');

// Inside your authentication logic, after validating the user's credentials
const user = {
    id: 1,
    username: 'user123',
    roles: ['user'],
};

const token = jwt.sign(user, 'your-secret-key', { expiresIn: '1h' });
console.log("token",token);



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1c2VyMTIzIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE2OTI2OTI5MDQsImV4cCI6MTY5MjY5NjUwNH0.8Lv8hsH6Vc1SDU8_J88lXUqGrbPZu6WA1ekC4vb239o