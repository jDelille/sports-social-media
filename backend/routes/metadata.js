import express from 'express';
import { fetchMetadata } from '../controllers/metadata.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { url } = req.query;

  console.log('Requested URL:', url); // Log the URL received from the query params

  try {
    const metadata = await fetchMetadata(url); // Wait for metadata fetching to complete
    console.log('Fetched Metadata:', metadata); // Log the fetched metadata
    res.json(metadata); // Send the metadata as JSON response
  } catch (error) {
    console.error('Error in metadata route:', error);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
});

export default router;