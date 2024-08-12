import { useState, useEffect } from 'react';
import { useAxios } from '../../hooks';

const useUrlMetadata = (text: string) => {
  const [urlMetadata, setUrlMetadata] = useState<any>(null);
  const [detectedUrl, setDetectedUrl] = useState<string | null>(null);

  useEffect(() => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex);
    if (urls && urls.length > 0) {
      setDetectedUrl(urls[0]);
    } else {
      setDetectedUrl(null);
      setUrlMetadata(null);
    }
  }, [text]);

  useEffect(() => {
    const fetchUrlMetadata = async (url: string) => {
      try {
        const response = await useAxios.get(`/metadata?url=${encodeURIComponent(url)}`);
        setUrlMetadata(response.data.og);
      } catch (error) {
        console.error("Error fetching URL metadata:", error);
        setUrlMetadata(null);
      }
    };

    if (detectedUrl) {
      fetchUrlMetadata(detectedUrl);
    }
  }, [detectedUrl]);

  return urlMetadata;
};

export default useUrlMetadata;