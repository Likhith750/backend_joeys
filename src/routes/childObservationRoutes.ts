import { Router } from 'express';
import {
    createChildObservations,
    getAllChildObservations,
    getChildObservationById,
    getChildObservationsByRollId,
    getChildObservationsByFullName // Import the new function
} from '../operations/childObservationOperations';

const router = Router();

// Route to create multiple child observations
router.post('/child_observations', async (req, res) => {
    try {
        const { observations } = req.body;
        if (!Array.isArray(observations)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }

        // Validate if required fields are present
        if (!observations.every(obs => obs.rollId && obs.description && obs.fullName)) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const result = await createChildObservations(observations);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Route to get all child observations
router.get('/child_observations', async (req, res) => {
    try {
        const result = await getAllChildObservations();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Route to get a child observation by ID
router.get('/child_observation/:id', async (req, res) => {
    try {
        const result = await getChildObservationById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'ChildObservation not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Route to get observations by rollId
router.get('/child_observations/rollId/:rollId', async (req, res) => {
    try {
        const result = await getChildObservationsByRollId(req.params.rollId);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No observations found for this rollId' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Route to get observations by fullName
router.get('/child_observations/:fullName', async (req, res) => {
    try {
        const result = await getChildObservationsByFullName(req.params.fullName);
        if (result.length === 0) {
            return res.status(404).json({ message: 'No observations found for this fullName' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;
