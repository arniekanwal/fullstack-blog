import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { auth } from "../firebase";
import { Link, useNavigate } from 'react-router-dom'; 


export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !==
        passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        
        try {
            setError('');
            setLoading(true);
            await signup(auth, emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch {
            setError("Failed to create an account");
        }
        setLoading(false);
    }

    return (
        <>
        <Container className="d-flex align-items-center justify-content-center"
            style= {{ minHeight: "100vh"}}>
            <div className="w-100" style={{ maxWidth: '400px'}}>
            
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-2">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label className='mt-2'>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label className='mt-2'>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label className='mt-2'>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 text-center mt-2" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/login">Log In. </Link>
                Return <Link to="/">Home.</Link>
            </div>
            </div>
        </Container>
        </>
    )
}