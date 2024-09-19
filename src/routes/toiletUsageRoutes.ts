import { Router } from 'express';
import {
    createToiletUsage,
    getAllToiletUsages,
    getToiletUsageByFullName
} from '../operations/toiletUsageOperations';

const router = Router();

// Route to create toilet usages
router.post('/toilet_usage', async (req, res) => {
    try {
        const result = await createToiletUsage(req.body.toiletUsages);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Route to get all toilet usages
router.get('/toilet_usages', async (req, res) => {
    try {
        const result = await getAllToiletUsages();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Route to get toilet usages by fullName
router.get('/toilet_usage/:fullName', async (req, res) => {
    try {
        const result = await getToiletUsageByFullName(req.params.fullName); // Updated to fetch by fullName
        if (!result || result.length === 0) {
            return res.status(404).json({ message: 'No toilet usage records found for the given full name' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
