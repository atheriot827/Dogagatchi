import React from 'react';
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {ProgressBar} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import Toast from 'react-bootstrap/Toast';
import ToastPopUp from './ToastPopUp.jsx';

export default function VoiceTraining({dogStateParent, setDogParent}) {


    // Modal pop up
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Voice input
    const [voiceInput, setVoiceInput] = useState(false);
    const [error, setError] = useState();

    // Dog stats
    const [attackDmg, setAttackDmg] = useState();
    const [health, setHealth] = useState();


    useEffect(() => {
        if (show && dogStateParent) {
            setHealth(dogStateParent.health);
            setAttackDmg(dogStateParent.attackDmg);
        }
    }, [show, dogStateParent]);


    // AXIOS REQUESTS
    const healDog = () => {
        if (dogStateParent.health >= 100) return setError('maxed out already bruh');
        axios.put(`/dog/stats/${dogStateParent._id}`, {
            status: {
                increaseHealth: 25,
            }
        }).then((dog) => {
            setHealth(dog.data.health);
            setDogParent(dog.data); // update state for parent component
        }).catch((err) => {
            console.error('Error increasing dogs health', err);
        });
    };

    const yellAtDog = () => {
        if (dogStateParent.health <= 25) return setError(`take a chill pill man he's stressed`);
        axios.put(`/dog/stats/${dogStateParent._id}`, {
            status: {
                decreaseHealth: 25,
            }
        }).then((dog) => {
            setHealth(dog.data.health);
            setDogParent(dog.data); // update state for parent component
            console.log('dog health: ', dog.data.health);
            console.log('dog has been updated in db');
        }).catch((err) => {
            console.log('error updating health value in db', err);
        });
    };

    const powerUpDog = () => {
        if (dogStateParent.attackDmg >= 100) return setError('this dog already so strong bruh');
        axios.put(`/dog/stats/${dogStateParent._id}`, {
            status: {
                increaseAttackDmg: 5,
            }
        }).then((dog) => {
            setAttackDmg(dog.data.attackDmg);
            setDogParent(dog.data); // update state for parent component
        }).catch((err) => {
            console.log('error updating attack value in db', err);
        });
    };

    const baller = () => {
        axios.put(`/dog/stats/${dogStateParent._id}`, {
            status: {
                maxStats: 100,
            }
        }).then((dog) => {
            setAttackDmg(dog.data.attackDmg);
            setHealth(dog.data.health);
            setDogParent(dog.data); // update state for parent component
        }).catch((err) => {
            console.error('error updating health and attack stats #motherlode', err);
        });
    };

    // Calculate progress bar variants
    const getProgressBarVariant = (healthState) => {
        if (healthState >= 75) return 'success';
        if (healthState < 75 && healthState > 25) return 'warning';
        if (healthState <= 25) return 'danger';
    };

    /** Very unlikely this webspeech setup will need to be edited ever */
    const speechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition; // Speech recognition constructor (standard and webkit version for Safari compatability)
    let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList; // Grammar list constructor - used to define words/phrases to recognize
    let commands = ['healing magic drop the beat fix this dog from head to feet', 'power surging through this pup strength and speed now level up', 'stupid dog', 'baller',]; // Commands we want the Grammar List to recognize
    // JSGF - Java Speech Grammar Format: Essentially, we're telling the webspeech engine to 'listen' for any one of our commands in the variable above
    let grammar = '#JSGF V1.0; grammar commands; public <commands> = ' + commands.join(' | ') + ';';
    const recognition = new speechRecognition();  // Create instance for speech recognition object
    const recognitionList = new SpeechGrammarList(); // Create instance for grammar list
    recognitionList.addFromString(grammar, 1); // Add grammar string to recognitionList with weight of 1
    recognition.grammars = recognitionList; // Assign grammar list to recognition instance
    recognition.lang = 'en-US'; // Set language
    recognition.continuous = false; // Set webspeech api to stop listening when user inputs one of the commands
    recognition.interimResults = false; // Only return fully recognized commands - not partial recognitions
    recognition.maxAlternatives = 1; // Only return one output


    const renderSpeech = () => {
        recognition.start();
        setVoiceInput(true);
        recognition.onresult = (event) => {
            setVoiceInput(false);
            let word = event.results[0][0].transcript;
            console.log('This is what webspeech api thinks you said: ', word);
            switch (word) {
                case 'healing magic drop the beat fix this dog from head to feet':
                    // invoke heal function
                    console.log('WE GONNA HEAL THAT DOG FASHO!');
                    healDog();
                    break;
                case 'power surging through this pup strength and speed now level up':
                    // invoke power up function
                    console.log('WE GONNA GIVE THAT DOG SOME POWERS MAN!');
                    powerUpDog();
                    break;
                case 'stupid dog':
                    // transfer dog to another user in db
                    console.log('You have lost ownership of your Dog. Be better next time.');
                    yellAtDog();
                    break;
                case 'baller':
                    console.log('LET IT RAIN!!');
                    baller();
                    break;
                default:
                    setError(`Last I checked, ${word} isn't a command.`);
                    break;
            }
        };
    };

    return (<>
        <Button variant='primary' onClick={handleShow}>
            Launch modal
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chat with your stinky dog</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {error ? <ToastPopUp message={error}/> : ''}


                <h4>Commands</h4>
                <p> Heal Command: healing magic drop the beat fix this dog from head to feet</p>
                <p> Power Up Command: power surging through this pup strength and speed now level up</p>
                <p> bad dog: stupid dog</p>
                <p> Health: {health} </p>
                <p> Attack Dmg: {attackDmg}</p>
                <div>
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant='success'>
                                Click To Train
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href='#/action-1' onClick={healDog}>Heal</Dropdown.Item>
                                <Dropdown.Item href='#/action-2' onClick={powerUpDog}>Power Up</Dropdown.Item>
                                <Dropdown.Item href='#/action-3' onClick={yellAtDog}>Yell
                                    at {dogStateParent.name}</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <ProgressBar
                        animated={true}
                        striped
                        now={health}
                        variant={getProgressBarVariant(health)}
                        label='HEALTH'
                        style={{height: '35px'}}
                    />
                </div>
                <div>
                    <ProgressBar
                        animated={true}
                        striped
                        now={attackDmg}
                        variant={getProgressBarVariant(attackDmg)}
                        label='ATTACK DAMAGE'
                        style={{height: '35px'}}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close Modal
                </Button>
                <Button variant='primary' onClick={renderSpeech}>
                    {voiceInput ? 'LISTENING' : 'Speak To Train'}
                </Button>
                <p> {error ? `${[error]}` : ''}</p>
            </Modal.Footer>
        </Modal>
    </>);
}

