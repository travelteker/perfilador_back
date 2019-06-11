import { Schema, model, Document }  from 'mongoose';
import { ICredential } from '../interfaces';
import { number } from 'joi';

const KeySchema = new Schema (
    {
        active: {
            type: Boolean,
            required: true
        },
        tag: {
            type: Array,
            required: true
        },
        validUntil: {
            utcms: {
                type: Number,
                required: true
            },
            iso: {
                type: Date,
                required: true
            } 
        }
    },
    {
        timestamps: true
    }
);


const authApiModel = model<ICredential & Document>('Authentication', KeySchema); 

export default authApiModel;