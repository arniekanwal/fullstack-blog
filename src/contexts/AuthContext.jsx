import React, { useContext, useState, useEffect } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    updatePassword,
    updateEmail
} from "firebase/auth";
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // signup function
    function signup(auth, email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login function
    function login(auth, email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout (end session)
    function logout(auth) {
        return signOut(auth);
    }

    // manage reseting user password
    function resetPassword(auth, email) {
        return sendPasswordResetEmail(auth, email);
    }

    // update user email
    function updateUserEmail(user, email) {
        return updateEmail(user, email);
    }

    // update user password
    function updateUserPassword(user, password) {
        return updatePassword(user, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        login,
        logout,
        resetPassword,
        signup,
        updateUserEmail,
        updateUserPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
      );
}
