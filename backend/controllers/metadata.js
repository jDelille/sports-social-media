import axios from 'axios';
import pkg from 'html-metadata-parser';
const { parse } = pkg;

export const fetchMetadata = async (url) => {
    try {
        const metadata = await parse(url);
        return metadata; // Return the parsed metadata
    } catch (error) {
        console.error('Error fetching or parsing metadata:', error);
        return null; // Return null or handle error as needed
    }
  };