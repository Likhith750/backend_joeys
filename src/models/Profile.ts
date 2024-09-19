import mongoose, { Document, Schema } from 'mongoose';

export interface IProfile extends Document {
    name: string;
    rollno: string;
    email: string;
    mobilenumber: string;
    address: string;
    dob: string; // Store date as string in ddmmyyyy format
    fathername: string;
    fatherprofession: string;
    mothername: string;
    motherprofession: string;
    medicaldetails?: string; // Update to string to match file path
    medicaldetailsname?: string; // Add medicaldetailsname field
    allergies: string;
    medication: string;
    profilePhoto?: string; // Add profile photo field
}

const formatDate = (dateStr: string): string => {
    // Convert dateStr in dd-mm-yyyy format to ddmmyyyy format
    const [day, month, year] = dateStr.split('-');
    return `${day}${month}${year}`;
};

const parseDate = (dateStr: string): Date => {
    // Convert ddmmyyyy format string to Date object
    const day = parseInt(dateStr.substring(0, 2), 10);
    const month = parseInt(dateStr.substring(2, 4), 10) - 1; // Months are 0-based
    const year = parseInt(dateStr.substring(4, 8), 10);
    return new Date(year, month, day);
};

const ProfileSchema: Schema<IProfile> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    name: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
    },
    mobilenumber: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    dob: {
        type: String, // Store date in ddmmyyyy format
        required: false,
        set: (value: string) => formatDate(value),
        get: (value: string) => {
            // Return date in dd-mm-yyyy format
            const date = parseDate(value);
            return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
        },
    },
    fathername: {
        type: String,
        required: false,
    },
    fatherprofession: {
        type: String,
        required: false,
    },
    mothername: {
        type: String,
        required: false,
    },
    motherprofession: {
        type: String,
        required: false, 
    },
    medicaldetails: {
        type: String, // Use string to store file path
        required: false, // Make optional
    },
    medicaldetailsname: {
        type: String, // Add medicaldetailsname field
        required: false, // Make optional
    },
    allergies: {
        type: String,
        required: false,
    },
    medication: {
        type: String,
        required: false,
    },
    profilePhoto: {
        type: String, // Store file path or URL of profile photo
        required: false, // Make optional
    }
});

// Apply the getter and setter
ProfileSchema.set('toJSON', { getters: true });
ProfileSchema.set('toObject', { getters: true });

const Profile = mongoose.model<IProfile>('Profile', ProfileSchema);
export default Profile;