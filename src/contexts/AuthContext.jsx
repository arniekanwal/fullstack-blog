import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // signup function
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    // login function
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    // logout (end session)
    function logout() {
        return auth.signOut();
    }

    // manage reseting user password
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    // update user email
    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    // update user password
    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
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
        updateEmail,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
      );
}
