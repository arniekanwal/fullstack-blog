import React, { useState } from 'react';

function Home() {
    // variable for admin form
    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    };

    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details); 
    }

    const Logout = () => {
        console.log("Logout");
    }

    return (
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
    );
}

export default Home;