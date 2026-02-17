
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
    template?: string;
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
    videoId: { type: String, required: true },
    place: { type: String },
    description: { type: String },
    quiz: { type: QuizSchema, default: null },
});

const SubjectSchema = new Schema<ISubject>(
    {
        name: { type: String, required: true, unique: true },
        template: { type: String },
        modules: [ModuleSchema],
    },
    { timestamps: true }
);

// Prevent overwriting the model if it's already compiled
const Subject: Model<ISubject> =
    mongoose.models.Subject || mongoose.model<ISubject>("Subject", SubjectSchema);

export default Subject;
