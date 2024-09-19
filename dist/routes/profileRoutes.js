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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const profileOperations_1 = require("../operations/profileOperations");
const router = express_1.default.Router();
// Type guard to check if req.files is an object with field names
function isMulterFileDictionary(files) {
    return !Array.isArray(files);
}
const upload = (0, multer_1.default)({
    limits: { fileSize: 16 * 1024 * 1024 }, // 16 MB limit
    storage: multer_1.default.memoryStorage(), // Adjust storage as needed
    fileFilter: (req, file, cb) => {
        // Optionally, add file filter logic here
        cb(null, true);
    }
});
// Create or Update Profile with optional file uploads (medicaldetails and profilePhoto)
router.post('/create', upload.fields([
    { name: 'medicaldetails', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, name, rollno, mobilenumber, address, dob, fathername, fatherprofession, mothername, motherprofession, allergies, medication } = req.body;
    let medicalFile;
    let profilePhotoFile;
    if (req.files && isMulterFileDictionary(req.files)) {
        medicalFile = (_a = req.files['medicaldetails']) === null || _a === void 0 ? void 0 : _a[0];
        profilePhotoFile = (_b = req.files['profilePhoto']) === null || _b === void 0 ? void 0 : _b[0];
    }
    // Define profileData with optional medicaldetails and profilePhoto
    const profileData = {
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
        const profile = yield (0, profileOperations_1.createOrUpdateProfile)(profileData, medicalFile, profilePhotoFile);
        if (!profile) {
            return res.status(404).json({ error: 'Profile could not be created or updated' });
        }
        res.status(201).json(profile);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Get Profile by Email
router.get('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield (0, profileOperations_1.getProfileByEmail)(req.params.email);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Update Profile with optional file uploads (medicaldetails and profilePhoto)
router.put('/:email', upload.fields([
    { name: 'medicaldetails', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, rollno, mobilenumber, address, dob, fathername, fatherprofession, mothername, motherprofession, allergies, medication } = req.body;
    let medicalFile;
    let profilePhotoFile;
    if (req.files && isMulterFileDictionary(req.files)) {
        medicalFile = (_a = req.files['medicaldetails']) === null || _a === void 0 ? void 0 : _a[0];
        profilePhotoFile = (_b = req.files['profilePhoto']) === null || _b === void 0 ? void 0 : _b[0];
    }
    try {
        // Fetch existing profile
        const profile = yield (0, profileOperations_1.getProfileByEmail)(req.params.email);
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
            profile.medicaldetails = (0, profileOperations_1.encodeBufferToBase64)(medicalFile.buffer);
        }
        if (profilePhotoFile && profilePhotoFile.buffer) {
            profile.profilePhoto = (0, profileOperations_1.encodeBufferToBase64)(profilePhotoFile.buffer);
        }
        yield profile.save();
        res.status(200).json(profile);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Delete Profile
router.delete('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield (0, profileOperations_1.deleteProfile)(req.params.email);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
