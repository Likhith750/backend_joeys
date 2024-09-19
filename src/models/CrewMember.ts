import { Schema, model, Document } from 'mongoose';

export interface ICrewMember extends Document {
    fullName: string;
    className: string;
    role: string;
    name: string;
    email: string;
    relation: string;
}

const CrewMemberSchema = new Schema<ICrewMember>(
    {
        fullName: { type: String, required: true },
        className: { type: String, required: true },
        role: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        relation: { type: String, required: true },
    },
    { timestamps: true }
);

const CrewMember = model<ICrewMember>('CrewMember', CrewMemberSchema);

export default CrewMember;
