
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuestion {
    question: string;
    options: string[]; // Array of 5 options
    correctAnswer: number; // Index of the correct option (0-4)
}

export interface IQuiz {
    title: string;
    questions: IQuestion[];
}

export interface IModule {
    name: string;
    videoId: string;
    place?: string;
    description: string;
    quiz?: IQuiz | null;
}

export interface ISubject extends Document {
    name: string;
    description?: string;
    template?: string;
    bannerColor?: string;
    hashtags?: string[];
    modules: IModule[];
    createdAt: Date;
    updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
    question: { type: String, required: true },
    options: { type: [String], required: true, validate: [(val: string[]) => val.length === 5, 'Must have exactly 5 options'] },
    correctAnswer: { type: Number, required: true, min: 0, max: 4 },
});

const QuizSchema = new Schema<IQuiz>({
    title: { type: String, required: true },
    questions: [QuestionSchema],
});

const ModuleSchema = new Schema<IModule>({
    name: { type: String, required: true },
    videoId: { type: String },
    place: { type: String, required: true },
    description: { type: String },
    quiz: { type: Schema.Types.Mixed, default: null },
});

const SubjectSchema = new Schema<ISubject>(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        template: { type: String },
        bannerColor: { type: String, default: 'blue' },
        hashtags: { type: [String], default: [] },
        modules: [ModuleSchema],
    },
    { timestamps: true }
);

// Use delete to force re-compilation of the model in development (solves schema mismatch/caching issues)
if (process.env.NODE_ENV !== "production") {
    delete mongoose.models.Subject;
}

const Subject: Model<ISubject> =
    mongoose.models.Subject || mongoose.model<ISubject>("Subject", SubjectSchema);

export default Subject;
