import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
    certificateId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
        default: Date.now,
    },
    verificationToken: {
        type: String,
        required: true,
    },
});

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
