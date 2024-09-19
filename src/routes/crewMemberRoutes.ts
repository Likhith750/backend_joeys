import express from 'express';
import { createCrewMembers, getCrewMembersByFullName, getAdditionalCrewMembers } from '../operations/crewMemberOperations';

const router = express.Router();

// Route to store crew members
router.post('/crew-members', async (req, res) => {
    try {
        const crewMembers = req.body;
        const result = await createCrewMembers(crewMembers);
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'An unknown error occurred' });
        }
    }
});

// Route to get crew members by fullName
router.get('/crew-members', async (req, res) => {
    try {
        const fullName = req.query.fullName as string;
        if (!fullName) {
            return res.status(400).json({ success: false, message: 'fullName query parameter is required' });
        }
        const crewMembers = await getCrewMembersByFullName(fullName);
        res.status(200).json(crewMembers);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'An unknown error occurred' });
        }
    }
});

// New route to get additional crew members based on name and relation
router.get('/crew-members/additional', async (req, res) => {
    try {
        const fullName = req.query.fullName as string;
        if (!fullName) {
            return res.status(400).json({ success: false, message: 'fullName query parameter is required' });
        }
        const additionalMembers = await getAdditionalCrewMembers(fullName);
        res.status(200).json(additionalMembers);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'An unknown error occurred' });
        }
    }
});

export default router;
