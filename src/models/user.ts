import { Schema, model, Document }  from 'mongoose';
import { IUser } from '../interfaces';


const UserSchema = new Schema (
    {
        firstName: {
            type: String,
            required: true,
            lowercase: true
        },
        lastName: {
            type: String,
            required: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        apikey: {
            type: Schema.Types.ObjectId, ref: 'Authentication',
            required: true
        },
        role: {
            type: [{}]
        },
        perfil: {
            type: [{}]
        }
    },
    {
        timestamps: true
    }
);


const userModel = model<IUser & Document>('User', UserSchema); 

export default userModel;

