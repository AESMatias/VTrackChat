
import axios from 'axios';
import { useUserProfileStore } from '../store/userProfile';

const apiUrl = process.env.SERVER_URL || '159.223.193.255';


export const handleLoginFunc = async (username: string, password: string) => {

  if (username === "" || password === "") {
    alert('Username and password are required!')
    return { success: false, message: 'Username and password are required' };
  }

  username = username.trim();
  
  try {
    
    // Send login request to the backend
    const response = await axios.post(
      `http://${apiUrl}:3000/auth/login`,
      { email: username, password: password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    

    // If login is successful, extract token and user data
    const { token, user } = await response.data;

    // Update Zustand store with the logged-in user data
    useUserProfileStore.getState().updateProfileStatus(
      user.username,
      0,
      user.tokens,
      true, // loggedIn status
      token,
      user.speechLanguage,
      user.profilePictureURL
    );

    // Optionally, store token in localStorage or cookies if needed
    // localStorage.setItem('token', token);
    return { success: true, token, user};

  } catch (error: any) {
    if (error.response) {
      // If backend responds with an error
      console.error(error)
      return { success: false, message: error.response.data.error };
    } else {
      // If there's an error with the request
      console.error(error)
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  }
};
