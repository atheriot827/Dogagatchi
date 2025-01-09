import React from 'react';
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {ProgressBar} from 'react-bootstrap';

export default function VoiceTraining({dogObj, setDog}) {


    // Modal pop up functionality
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [voiceInput, setVoiceInput] = useState(false);
    const [attackDmg, setAttackDmg] = useState();
    const [health, setHealth] = useState();


    useEffect(() => {
        if (show && dogObj) {
            setHealth(dogObj.health);
            setAttackDmg(dogObj.attackDmg);
        }
    }, [show, dogObj]);


    // AXIOS REQEUSTS
    const healDog = () => {
        axios.put(`/dog/yell/${dogObj._id}`, {
            status: {
                increaseHealth: 25,
            }
        }).then((dog) => {
            setHealth(dog.data.health);
            setDog(dog.data); // update state for parent component
        }).catch((err) => {
            console.error('Error increasing dogs health', err);
        });
    };

    const yellAtDog = () => {
        axios.put(`/dog/yell/${dogObj._id}`, {
            status: {
                decreaseHealth: 25,
            }
        }).then((dog) => {
            setHealth(dog.data.health);
            setDog(dog.data); // update state for parent component
            console.log('dog health: ', dog.data.health);
            console.log('dog has been updated in db');
        }).catch((err) => {
            console.log('error updating health value in db', err);
        });
    };

    const powerUpDog = () => {
        axios.put(`/dog/yell/${dogObj._id}`, {
            status: {
                increaseAttackDmg: 5,
            }
        }).then((dog) => {
            setAttackDmg(dog.data.attackDmg);
            setDog(dog.data); // update state for parent component
        }).catch((err) => {
            console.log('error updating attack value in db', err);
        });
    };

    const baller = () => {
        axios.put(`/dog/yell/${dogObj._id}`, {
            status: {
                maxStats: 100,
            }
        }).then((dog) => {
            setAttackDmg(dog.data.attackDmg);
            setHealth(dog.data.health);
            setDog(dog.data); // update state for parent component
        }).catch((err) => {
            console.error('error updating health and attack stats #motherlode', err);
        });
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
                <h4>Commands</h4>
                <p> Heal Command: healing magic drop the beat fix this dog from head to feet</p>
                <p> Power Up Command: power surging through this pup strength and speed now level up</p>
                <p> bad dog: stupid dog</p>
                <p> Health: {health} </p>
                <p> Attack Dmg: {attackDmg}</p>
                <div>
                    <ProgressBar
                        animated={true}
                        striped
                        now={health}
                        variant={health}
                        label='HEALTH'
                        style={{height: '35px'}}
                    />
                </div>
                <div>
                    <ProgressBar
                        animated={true}
                        striped
                        now={attackDmg}
                        variant={attackDmg}
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
                    {voiceInput ? 'LISTENING' : 'SPEAK TO THE DOGS'}
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

