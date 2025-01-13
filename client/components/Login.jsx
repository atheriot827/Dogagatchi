import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { Button, Form, Row, Col, Container, Image } from 'react-bootstrap';
import { useAuth } from './Context';

function Login() {
    // const [userData, setUserData] = useState({username: ''})
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState([])
    const { setUserContext } = useAuth();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        // be warned this is bad and not good for security purposes i dont think
        // should have probably used cookies 0_o may change later tonight we will see
        // get user data from URL params added in /auth/google/callback
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get('user'); // extract user data from the url param

        if (userParam) {
            try {
                // convert userParam data to object
                const userData = JSON.parse(decodeURIComponent(userParam));
                // update state with userData
                setUserContext(userData);
                navigate('/home');
            } catch (err) {
                console.error('Error authenticating user data: ', err);
            }
        }
    }, [navigate, setUserContext]);


    const submit = (e) => {
        e.preventDefault()
        if (e.nativeEvent.submitter.name === 'Login') {
            axios.post('/auth/login', { username, password })
                .then((loginResponse) => {
                    if (loginResponse.data.message === 'success') {
                        setUserContext(loginResponse.data.user)
                        localStorage.setItem('isAuthenticated', JSON.stringify(true))
                        navigate('/home')
                    } else {
                        localStorage.setItem('isAuthenticated', JSON.stringify(false))
                        setError(loginResponse.data.message)
                        navigate({ pathname: '/' })
                    }
                })
                .catch((err) => {
                    console.error('Login failed', err)
                })
        } else {
            axios.post('/auth/register', { username, password })
                .then((loginResponse) => {
                    if (loginResponse.data.message === 'success') {
                        setUserContext(loginResponse.data.user)
                        localStorage.setItem('isAuthenticated', JSON.stringify(true))
                        navigate('/home')
                    } else {
                        localStorage.setItem('isAuthenticated', JSON.stringify(false))
                        setError(loginResponse.data.message)
                        navigate({ pathname: '/' })
                    }
                })
                .catch((err) => {
                    setError(err.response.data.message)
                    console.error('Login failed', err.response.data.message)
                })
        }
    }

    return (
        <Row style={{ height: '100vh', }} className=''>
            <Col xs={3} />
            <Col xs={6} className='d-flex flex-column justify-content-center'>
                <Image className='align-self-center m-5' src='https://i.ibb.co/B6bJ359/1699386580-trimmy-sweeticon-removebg-preview-1.png' />
                <Form onSubmit={submit} style={{ backgroundImage: 'linear-gradient(#182950, #274282)', }} className='d-flex flex-column align-self-center justify-content-center align-items-center p-2 border border-3 border-white rounded'>
                    <Form.Label style={{ color: 'white', fontSize: '25px', marginTop: '20px' }}>Woof woof woof!</Form.Label>
                    <div className='group-form'>
                        <input
                            className='m-3'
                            type='text'
                            name='username'
                            placeholder='Username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className='m-3'
                            type='password'
                            name='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='d-flex flex-row'>
                        <Button variant='outline-light' name='Login' type='submit'>Login</Button>
                        <Button variant='outline-light' name='Register' type='submit'>Register</Button>
                    </div>
                        <p style={{marginBottom: '0px', color: 'white'}}> OR </p>


                    <Button
                        className='mt-2'
                        onClick={() => window.location.href = '/auth/google'}
                    >
                        Sign in with Google
                    </Button>


                        {error && <p style={{ color: 'red' }}>{error}</p>}
                </Form>


            </Col>
            <Col xs={3} />
        </Row>
    )
}

export default Login