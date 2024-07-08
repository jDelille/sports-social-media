import axios from 'axios';
import pkg from 'html-metadata-parser';
const { parse } = pkg;

export const fetchMetadata = async (url) => {
    try {
        const metadata = await parse("https://www.foxsports.com/stories/soccer/germany-great-toni-kroos-pens-emotional-farewell-post-pedri-accepts-apology");
        console.log(metadata); // Check if metadata is logged correctly
        return metadata; // Return the parsed metadata
    } catch (error) {
        console.error('Error fetching or parsing metadata:', error);
        return null; // Return null or handle error as needed
    }
  };