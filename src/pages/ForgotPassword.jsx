import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { auth } from "../firebase";
import { Link } from 'react-router-dom';


export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState(''); 
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    async function handleSubmit(e) {
        e.preventDefault()
        
        try {
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(auth, emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            setError("Failed to reset password");
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
                    <h2 className="text-center mb-2">Forgot Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variante="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label className='mt-2'>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 text-center mt-2" type="submit">
                            Reset Password
                        </Button>
                    </Form>

                    <div className='w-100 text-center mt-3'>
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up. </Link>
                Return <Link to="/">Home.</Link>
            </div>
            </div>
        </Container>
        </>
    )
}