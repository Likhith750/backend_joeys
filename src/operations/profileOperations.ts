import mongoose, { Document, Schema } from 'mongoose';
import sharp from 'sharp';
import express, { Request, Response } from 'express';
import UserModel from '../models/User';
import ProfileModel, { IProfile } from '../models/Profile';

// Utility function to encode file buffer to base64
export const encodeBufferToBase64 = (buffer: Buffer): string => {
    return buffer.toString('base64');
};

// Utility function to decode base64 to a file buffer
const decodeBase64ToBuffer = (base64Data: string): Buffer => {
    return Buffer.from(base64Data, 'base64');
};

// Utility function to compress image using sharp
const compressImage = async (buffer: Buffer): Promise<Buffer> => {
    return sharp(buffer)
        .resize({ width: 800 }) // Resize to a maximum width of 800px
        .jpeg({ quality: 80 })  // Compress with 80% quality
        .toBuffer();
};

// Create or Update Profile
export const createOrUpdateProfile = async (profileData: Partial<IProfile>, medicalFile?: Express.Multer.File, profilePhotoFile?: Express.Multer.File): Promise<IProfile | null> => {
    try {
        const email = profileData.email?.toLowerCase();  // Normalize email to lowercase

        console.log("Checking email in users collection:", email);

        // Check if user exists in User collection
        const userExists = await UserModel.findOne({ email });
        console.log("User found:", userExists);

        if (!userExists) {
            throw new Error('Email does not exist in users collection');
        }

        // Encode medical details file to base64 and store filename if present
        if (medicalFile && medicalFile.buffer) {
            profileData.medicaldetails = encodeBufferToBase64(medicalFile.buffer);
            profileData.medicaldetailsname = medicalFile.originalname; // Store the filename from the file object
        }

        // Encode profile photo to base64 if present
        if (profilePhotoFile && profilePhotoFile.buffer) {
            const compressedPhoto = await compressImage(profilePhotoFile.buffer);
            profileData.profilePhoto = encodeBufferToBase64(compressedPhoto);
        }

        // Check if profile already exists
        let profile = await ProfileModel.findOne({ email });
        if (profile) {
            // Update existing profile
            profile = await ProfileModel.findOneAndUpdate({ email }, profileData, { new: true });
        } else {
            // Create new profile
            profile = new ProfileModel(profileData);
            await profile.save();
        }

        return profile;
    } catch (error) {
        console.error("Error in createOrUpdateProfile:", error);
        if (error instanceof Error) {
            throw new Error(`Error creating or updating profile: ${error.message}`);
        }
        throw error;
    }
};

// Get Profile by Email
export const getProfileByEmail = async (email: string): Promise<IProfile | null> => {
    try {
        const profile = await ProfileModel.findOne({ email: email.toLowerCase() });

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
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error retrieving profile: ${error.message}`);
        }
        throw error;
    }
};

// Update Profile
export const updateProfile = async (email: string, updateData: Partial<IProfile>, medicalFile?: Express.Multer.File, profilePhotoFile?: Express.Multer.File): Promise<IProfile | null> => {
    try {
        // Encode medical details file to base64 and store filename if present
        if (medicalFile && medicalFile.buffer) {
            updateData.medicaldetails = encodeBufferToBase64(medicalFile.buffer);
            updateData.medicaldetailsname = medicalFile.originalname; // Store the filename from the file object
        }

        // Encode profile photo to base64 if present
        if (profilePhotoFile && profilePhotoFile.buffer) {
            const compressedPhoto = await compressImage(profilePhotoFile.buffer);
            updateData.profilePhoto = encodeBufferToBase64(compressedPhoto);
        }

        return await ProfileModel.findOneAndUpdate(
            { email: email.toLowerCase() },
            updateData,
            { new: true }
        );
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error updating profile: ${error.message}`);
        }
        throw error;
    }
};

// Delete Profile
export const deleteProfile = async (email: string): Promise<IProfile | null> => {
    try {
        return await ProfileModel.findOneAndDelete({ email: email.toLowerCase() });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error deleting profile: ${error.message}`);
        }
        throw error;
    }
};