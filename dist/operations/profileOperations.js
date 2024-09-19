"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfile = exports.updateProfile = exports.getProfileByEmail = exports.createOrUpdateProfile = exports.encodeBufferToBase64 = void 0;
const sharp_1 = __importDefault(require("sharp"));
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
// Utility function to encode file buffer to base64
const encodeBufferToBase64 = (buffer) => {
    return buffer.toString('base64');
};
exports.encodeBufferToBase64 = encodeBufferToBase64;
// Utility function to decode base64 to a file buffer
const decodeBase64ToBuffer = (base64Data) => {
    return Buffer.from(base64Data, 'base64');
};
// Utility function to compress image using sharp
const compressImage = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, sharp_1.default)(buffer)
        .resize({ width: 800 }) // Resize to a maximum width of 800px
        .jpeg({ quality: 80 }) // Compress with 80% quality
        .toBuffer();
});
// Create or Update Profile
const createOrUpdateProfile = (profileData, medicalFile, profilePhotoFile) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const email = (_a = profileData.email) === null || _a === void 0 ? void 0 : _a.toLowerCase(); // Normalize email to lowercase
        console.log("Checking email in users collection:", email);
        // Check if user exists in User collection
        const userExists = yield User_1.default.findOne({ email });
        console.log("User found:", userExists);
        if (!userExists) {
            throw new Error('Email does not exist in users collection');
        }
        // Encode medical details file to base64 and store filename if present
        if (medicalFile && medicalFile.buffer) {
            profileData.medicaldetails = (0, exports.encodeBufferToBase64)(medicalFile.buffer);
            profileData.medicaldetailsname = medicalFile.originalname; // Store the filename from the file object
        }
        // Encode profile photo to base64 if present
        if (profilePhotoFile && profilePhotoFile.buffer) {
            const compressedPhoto = yield compressImage(profilePhotoFile.buffer);
            profileData.profilePhoto = (0, exports.encodeBufferToBase64)(compressedPhoto);
        }
        // Check if profile already exists
        let profile = yield Profile_1.default.findOne({ email });
        if (profile) {
            // Update existing profile
            profile = yield Profile_1.default.findOneAndUpdate({ email }, profileData, { new: true });
        }
        else {
            // Create new profile
            profile = new Profile_1.default(profileData);
            yield profile.save();
        }
        return profile;
    }
    catch (error) {
        console.error("Error in createOrUpdateProfile:", error);
        if (error instanceof Error) {
            throw new Error(`Error creating or updating profile: ${error.message}`);
        }
        throw error;
    }
});
exports.createOrUpdateProfile = createOrUpdateProfile;
// Get Profile by Email
const getProfileByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_1.default.findOne({ email: email.toLowerCase() });
        if (profile) {
            // Decode base64-encoded medical details if present
            if (profile.medicaldetails) {
                profile.medicaldetails = profile.medicaldetails;
                // Optionally, you could decode and re-encode if needed
                // const medicalDetailsBuffer = decodeBase64ToBuffer(profile.medicaldetails);
                // profile.medicaldetails = medicalDetailsBuffer.toString('base64');
            }
            // Convert profile photo back to base64 if present
            if (profile.profilePhoto) {
                const profilePhotoBuffer = decodeBase64ToBuffer(profile.profilePhoto);
                profile.profilePhoto = profilePhotoBuffer.toString('base64');
            }
            // Format the date of birth if needed
            if (profile.dob) {
                // Ensure dob is in dd-mm-yyyy format
                const [day, month, year] = profile.dob.split('-');
                profile.dob = `${day}-${month}-${year}`;
            }
        }
        return profile;
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving profile: ${error.message}`);
        }
        throw error;
    }
});
exports.getProfileByEmail = getProfileByEmail;
// Update Profile
const updateProfile = (email, updateData, medicalFile, profilePhotoFile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Encode medical details file to base64 and store filename if present
        if (medicalFile && medicalFile.buffer) {
            updateData.medicaldetails = (0, exports.encodeBufferToBase64)(medicalFile.buffer);
            updateData.medicaldetailsname = medicalFile.originalname; // Store the filename from the file object
        }
        // Encode profile photo to base64 if present
        if (profilePhotoFile && profilePhotoFile.buffer) {
            const compressedPhoto = yield compressImage(profilePhotoFile.buffer);
            updateData.profilePhoto = (0, exports.encodeBufferToBase64)(compressedPhoto);
        }
        return yield Profile_1.default.findOneAndUpdate({ email: email.toLowerCase() }, updateData, { new: true });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error updating profile: ${error.message}`);
        }
        throw error;
    }
});
exports.updateProfile = updateProfile;
// Delete Profile
const deleteProfile = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Profile_1.default.findOneAndDelete({ email: email.toLowerCase() });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error deleting profile: ${error.message}`);
        }
        throw error;
    }
});
exports.deleteProfile = deleteProfile;
