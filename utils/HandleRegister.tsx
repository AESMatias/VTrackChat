import axios from 'axios';
import { useUserProfileStore } from '../store/userProfile';

const apiUrl = process.env.SERVER_URL || '159.223.193.255';

export const handleRegisterFunc = async (username: string, password: string) => {
  if (username === "" || password === "") {
    return { success: false, message: 'Username and password are required' };
  }

  try {
    // Send register request to the backend
    const response = await axios.post(`http://${apiUrl}:3000/auth/register`, {
      email: username,
      password: password,
    });

    // If registration is successful, update the Zustand store
    const { token, user } = response.data;

    // Update Zustand store with the new user profile
    useUserProfileStore.getState().updateProfileStatus(
      user.username,
      user.currentPlan,
      user.tokens,
      true, // loggedIn status
      token,
      user.speechLanguage,
      user.profilePictureURL
    );

    // Optionally, store the token if returned
    // if (response.data.token) {
    //   localStorage.setItem('token', response.data.token);
    // }

    return { success: true, message: response.data.message };
    
  } catch (error: any) {
    if (error.response) {
      // If backend responds with an error
      return { success: false, message: error.response.data.error };
    } else {
      // If there's an error with the request
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  }
};
