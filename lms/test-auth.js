try {
    const auth = require('next-auth/react');
    console.log('Successfully required next-auth/react');
} catch (e) {
    console.error('Failed to require next-auth/react:', e.message);
}
