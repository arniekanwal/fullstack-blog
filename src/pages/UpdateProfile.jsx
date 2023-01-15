import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; 


export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updateUserEmail, updateUserPassword } = useAuth();
    const [error, setError] = useState(''); 
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    function handleUpdate(e) {
        e.preventDefault()

        if (passwordRef.current.value !==
        passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = []
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateUserEmail(currentUser, emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updateUserPassword(currentUser, passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            history('/');
        }).catch(() => {
            setError('Failed to update account');
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <>
        <Container className="d-flex align-items-center justify-content-center"
            style= {{ minHeight: "100vh"}}>
            <div className="w-100" style={{ maxWidth: '400px'}}>
            
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-2">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleUpdate}>
                        <Form.Group id="email">
                            <Form.Label className='mt-2'>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required
                            defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label className='mt-2'>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required
                            placeholder='Leave blank to keep the same' />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label className='mt-2'>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required 
                            placeholder='Leave blank to keep the same'/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 text-center mt-3" type="submit">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
            </div>
        </Container>
        </>
    )
}