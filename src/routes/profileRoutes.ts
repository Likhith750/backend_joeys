import express from 'express';
import multer from 'multer';
import { IProfile } from '../models/Profile';
import { createOrUpdateProfile, getProfileByEmail, updateProfile, deleteProfile, encodeBufferToBase64 } from '../operations/profileOperations';

const router = express.Router();

// Type guard to check if req.files is an object with field names
function isMulterFileDictionary(files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }): files is { [fieldname: string]: Express.Multer.File[] } {
    return !Array.isArray(files);
}

const upload = multer({
    limits: { fileSize: 16 * 1024 * 1024 }, // 16 MB limit
    storage: multer.memoryStorage(), // Adjust storage as needed
    fileFilter: (req, file, cb) => {
        // Optionally, add file filter logic here
        cb(null, true);
    }
});

// Create or Update Profile with optional file uploads (medicaldetails and profilePhoto)
router.post('/create', upload.fields([
    { name: 'medicaldetails', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
]), async (req, res) => {
    const {
        email,
        name,
        rollno,
        mobilenumber,
        address,
        dob,
        fathername,
        fatherprofession,
        mothername,
        motherprofession,
        allergies,
        medication
    } = req.body;

    let medicalFile: Express.Multer.File | undefined;
    let profilePhotoFile: Express.Multer.File | undefined;

    if (req.files && isMulterFileDictionary(req.files)) {
        medicalFile = req.files['medicaldetails']?.[0];
        profilePhotoFile = req.files['profilePhoto']?.[0];
    }

    // Define profileData with optional medicaldetails and profilePhoto
    const profileData: Partial<IProfile> = {
        email,
        name,
        rollno,
        mobilenumber,
        address,
        dob,
        fathername,
        fatherprofession,
        mothername,
        motherprofession,
        allergies,
        medication
    };

    try {
        const profile = await createOrUpdateProfile(profileData, medicalFile, profilePhotoFile);
        if (!profile) {
            return res.status(404).json({ error: 'Profile could not be created or updated' });
        }
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Get Profile by Email
router.get('/:email', async (req, res) => {
    try {
        const profile = await getProfileByEmail(req.params.email);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Update Profile with optional file uploads (medicaldetails and profilePhoto)
router.put('/:email', upload.fields([
    { name: 'medicaldetails', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
]), async (req, res) => {
    const {
        name,
        rollno,
        mobilenumber,
        address,
        dob,
        fathername,
        fatherprofession,
        mothername,
        motherprofession,
        allergies,
        medication
    } = req.body;

    let medicalFile: Express.Multer.File | undefined;
    let profilePhotoFile: Express.Multer.File | undefined;

    if (req.files && isMulterFileDictionary(req.files)) {
        medicalFile = req.files['medicaldetails']?.[0];
        profilePhotoFile = req.files['profilePhoto']?.[0];
    }

    try {
        // Fetch existing profile
        const profile = await getProfileByEmail(req.params.email);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Update profile fields
        profile.name = name || profile.name;
        profile.rollno = rollno || profile.rollno;
        profile.mobilenumber = mobilenumber || profile.mobilenumber;
        profile.address = address || profile.address;
        profile.dob = dob || profile.dob;
        profile.fathername = fathername || profile.fathername;
        profile.fatherprofession = fatherprofession || profile.fatherprofession;
        profile.mothername = mothername || profile.mothername;
        profile.motherprofession = motherprofession || profile.motherprofession;
        profile.allergies = allergies || profile.allergies;
        profile.medication = medication || profile.medication;

        // Update medicaldetails and profilePhoto if new files are uploaded
        if (medicalFile && medicalFile.buffer) {
            profile.medicaldetails = encodeBufferToBase64(medicalFile.buffer);
        }

        if (profilePhotoFile && profilePhotoFile.buffer) {
            profile.profilePhoto = encodeBufferToBase64(profilePhotoFile.buffer);
        }

        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

// Delete Profile
router.delete('/:email', async (req, res) => {
    try {
        const profile = await deleteProfile(req.params.email);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
});

export default router;