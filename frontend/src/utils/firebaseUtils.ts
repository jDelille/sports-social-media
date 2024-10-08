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

export const uploadProfilePicture = async (file: File, userId: string): Promise<string> => {
  const storageRef = ref(storage, `profile-pictures/${userId}/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log('Profile picture available at', url);
    return url;
  } catch (error) {
    console.error('Profile picture upload failed', error);
    throw error;
  }
};

export const uploadGroupProfilePicture = async (file: File, userId: string): Promise<string> => {
  const storageRef = ref(storage, `group-profile-pictures/${userId}/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log('Group profile picture available at', url);
    return url;
  } catch (error) {
    console.error('Group profile picture upload failed', error);
    throw error;
  }
};

export const uploadHeaderImage = async (file: File, userId: string): Promise<string> => {
  const storageRef = ref(storage, `header-images/${userId}/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log('Header image available at', url);
    return url;
  } catch (error) {
    console.error('Header image upload failed', error);
    throw error;
  }
};

export const uploadGroupHeaderImage = async (file: File, userId: string): Promise<string> => {
  const storageRef = ref(storage, `group-header-images/${userId}/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log('Group header image available at', url);
    return url;
  } catch (error) {
    console.error('Group header image upload failed', error);
    throw error;
  }
};

export const deleteProfilePicture = async (userId: string, fileName: string): Promise<void> => {
  const imagePath = `profile-pictures/${userId}/${fileName}`;
  const imageRef = ref(storage, imagePath);

  try {
    await deleteObject(imageRef);
    console.log('Profile picture successfully deleted.');
  } catch (error) {
    console.error('Error deleting profile picture:', error);
    throw error;
  }
};