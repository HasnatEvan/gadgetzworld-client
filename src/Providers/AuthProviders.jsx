import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { app } from '../Firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user with email & password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email & password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (name, photoURL = null) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    });
  };


  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);

    } catch (error) {
      console.error("Reset password error:", error.message);
    } finally {
      setLoading(false);
    }
  };


  // Firebase auth state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('CurrentUser -->', currentUser?.email);

      if (currentUser?.email) {
        setUser(currentUser);

        // ✅ Get JWT token from server
        try {
          await axios.post(
            'https://gadgetzworld-server.vercel.app/jwt',
            { email: currentUser.email },
            { withCredentials: true }
          );
        } catch (error) {
          console.error('JWT error:', error.message);
        }
      } else {
        setUser(null);

        // ✅ Remove token cookie
        try {
          await axios.get('https://gadgetzworld-server.vercel.app/logout', {
            withCredentials: true,
          });
        } catch (error) {
          console.error('Logout error:', error.message);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Context value
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    setLoading,
    setUser,
    resetPassword
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
