
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('ERROR: MONGODB_URI is not set in environment variables');
    process.exit(1);
}

console.log('Attempting to connect to MongoDB with URI found in environment...');
// Mask password in URI for logging
const maskedUri = uri.replace(/:([^:@]{1,})@/, ':****@');
console.log(`Connecting to: ${maskedUri}`);

mongoose.connect(uri)
    .then(() => {
        console.log('✅ SUCCESS: Connected to MongoDB successfully!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ ERROR: Connection failed');
        console.error(err.message);
        if (err.message.includes('bad auth')) {
            console.error('\n--> Tip: Check your username and password.');
            console.error('--> Tip: If your password has special characters like @, :, /, ?, #, etc., they MUST be URL encoded.');
            console.error('    Example: "p@ssword" becomes "p%40ssword"');
        }
        process.exit(1);
    });
