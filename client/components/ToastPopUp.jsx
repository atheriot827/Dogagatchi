import React from 'react';
import {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';

export default function ToastPopUp({message}) {
    const [showToast, setShowToast] = useState(true);
    const toggleShowToast = () => setShowToast(!showToast);


    return (<>


        <Row>
            <Col md={6} className='mb-2'>
                <Button onClick={toggleShowToast} className='mb-2'>
                    Toggle Toast
                </Button>

                <Toast show={showToast} onClose={toggleShowToast}>
                    <Toast.Header>
                        <img src='' className='rounded me-2'
                             alt=''/>
                        <strong className='me-auto'>Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast>
            </Col>
        </Row>


    </>)
}