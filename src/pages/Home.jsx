import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom"; 

function Home() {
    const [error, setError] = useState();
    const { currentUser, logout } = useAuth();
    const history = useNavigate();

    async function handleLogout() {
        setError('');

        try {
            await logout();
            history('/login');
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <>
            <div className='w-100 text-center mt-2'>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <strong>Email: </strong> {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                
                <div className="w-100 text-center mt-2">
                    <Button variant='link' onClick={handleLogout}>Log Out</Button>
                </div>
            </div>

            <div className='mainpage'>
                <div className='titlebar'> 
                    <div className='leftbar'>
                        {/* <h1>{date}</h1> */}
                    </div>

                    <div className='title'>
                        <h1>The Anonymous American</h1>
                    </div>

                    <div className='rightbar'>
                        {/* TODO */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;