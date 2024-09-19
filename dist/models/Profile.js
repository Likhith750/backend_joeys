"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const formatDate = (dateStr) => {
    // Convert dateStr in dd-mm-yyyy format to ddmmyyyy format
    const [day, month, year] = dateStr.split('-');
    return `${day}${month}${year}`;
};
const parseDate = (dateStr) => {
    // Convert ddmmyyyy format string to Date object
    const day = parseInt(dateStr.substring(0, 2), 10);
    const month = parseInt(dateStr.substring(2, 4), 10) - 1; // Months are 0-based
    const year = parseInt(dateStr.substring(4, 8), 10);
    return new Date(year, month, day);
};
const ProfileSchema = new mongoose_1.Schema({
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
        set: (value) => formatDate(value),
        get: (value) => {
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
const Profile = mongoose_1.default.model('Profile', ProfileSchema);
exports.default = Profile;
