import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

export const uploadImage = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `images/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log('File available at', url);
    return url;
  } catch (error) {
    console.error('Upload failed', error);
    throw error;
  }
};

export const deleteImage = async (imagePath: string): Promise<void> => {
  const imageRef = ref(storage, imagePath);
  
  try {
    await deleteObject(imageRef);
    console.log('Image successfully deleted.');
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}