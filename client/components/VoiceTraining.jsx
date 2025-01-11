import React from 'react';
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import {ProgressBar} from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import ToastPopUp from './ToastPopUp.jsx';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';


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

    // Change command inputs
    const [editingActive, setEditingActive] = useState(false); // is in edit mode
    const [currentEdit, setCurrentEdit] = useState(false); // is currently editing
    const [editCommands, setEditCommands] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const newCommand = editCommands;

        if (currentEdit === 'heal') {
            changeHealCommand(newCommand);
        }

        if (currentEdit === 'incDmg') {
            console.log('Adding attack command');
            changeAttackCommand(newCommand);
        }
    };


    useEffect(() => {
        if (show && dogStateParent) {
            setHealth(dogStateParent.health);
            setAttackDmg(dogStateParent.attackDmg);
            console.log('THIS IS OUR DOG NOW:', dogStateParent);
            console.log('why is nothing here: ', dogStateParent.commands);
        }
    }, [show, dogStateParent]);


    const changeAttackCommand = (newCommand) => {
        axios.put(`/dog/commands/${dogStateParent._id}`, {
            status: {
                newCommand: newCommand, commandType: 'increaseAttack',
            }
        }).then((updatedDog) => {
            console.log('returning this from change: ', updatedDog.data);
            setEditingActive(false);
            setCurrentEdit(false);
            setEditCommands('');
            setDogParent(updatedDog.data);

        });
    };

    const changeHealCommand = (newCommand) => {
        axios.put(`/dog/commands/${dogStateParent._id}`, {
            status: {
                newCommand: newCommand, commandType: 'heal',
            }
        }).then((updatedDog) => {
            console.log('returning this from change: ', updatedDog.data);
            setEditingActive(false);
            setCurrentEdit(false);
            setEditCommands('');
            setDogParent(updatedDog.data);

        });
    };

    // AXIOS REQUESTS
    const healDog = () => {
        if (dogStateParent.health >= 100) return setError(`TOP SHAPE ALREADY, COUSIN, NOW LET'S GO BOWLING!`);
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
        if (dogStateParent.health <= 25) return setError(`BE KIND TO DOG, COUSIN, LIKE I AM TO MY BOWLING PINS!`);
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
        if (dogStateParent.attackDmg >= 100) return setError('IMPOSSIBLE TO IMPROVE, COUSIN, LIKE MY BOWLING SKILLS!');
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
        setError(`COUSIN, YOU MADE THIS DOG MORE PERFECT THAN MY BOWLING SCORES!`);
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
            switch (word) {
                case 'healing magic drop the beat fix this dog from head to feet':
                    healDog();
                    break;
                case 'power surging through this pup strength and speed now level up':
                    powerUpDog();
                    break;
                case 'stupid dog':
                    yellAtDog();
                    break;
                case 'baller':
                    baller();
                    break;
                default:
                    setError(`"${word.toUpperCase()}" MAKES NO SENSE, COUSIN, LIKE REFUSING TO GO BOWLING!`);
                    break;
            }
        };
    };

    return (<>
        <Button variant='primary' onClick={handleShow}>
            Train {dogStateParent.name}
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Training 101</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='position-absolute top-0 end-0 me-3 mb-3'>


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

                {error ? <ToastPopUp message={error}/> : ''}

                <div style={{minHeight: '150px'}}>

                    <div>
                        <h4>
                            <Badge className='mb-1'>
                                Heal
                            </Badge>
                        </h4>
                    </div>

                    <div id='heal'>

                        {editingActive && currentEdit === 'heal' ?


                            <Form
                                onSubmit={handleSubmit}
                            >
                                <Form.Group className='mb-3'>
                                    <Form.Label>Health Input Command:</Form.Label>
                                    <Form.Control
                                        value={editCommands}
                                        onChange={(e) => {
                                            setEditCommands(e.target.value);
                                        }}
                                        type='text' placeholder='input your own command'/>
                                    <Form.Text className='text-muted'>
                                        Here's some muted text idiot
                                    </Form.Text>
                                </Form.Group>

                                <Button variant='primary' type='submit'>
                                    Submit
                                </Button>

                            </Form> : <Card
                                onClick={(e) => {
                                setEditingActive(true);
                                setCurrentEdit(e.currentTarget.id);
                                console.log(e.currentTarget);
                                console.log(e.currentTarget.id);
                                console.log('double clicked!');
                                console.log('this is editingActive: ', editingActive);
                                console.log('this is currentEdit: ', currentEdit);
                            }}
                            id='heal' body style={{width: '400px'}}
                            className='mb-2'>
                                {dogStateParent.commands[0]}
                            </Card>}

                    </div>


                    <div>
                        <h4>
                            <Badge className='mb-1'>
                                Increase Attack Damage
                            </Badge>
                        </h4>
                    </div>


                    <div id='incDmg'>

                        {editingActive && currentEdit === 'incDmg' ?


                            <Form
                                onSubmit={handleSubmit}
                            >
                                <Form.Group className='mb-3'>
                                    <Form.Label>Increase Attack Damage Input Command:</Form.Label>
                                    <Form.Control
                                        value={editCommands}
                                        onChange={(e) => {
                                            setEditCommands(e.target.value);
                                        }}
                                        type='text' placeholder='input your own command'/>
                                    <Form.Text className='text-muted'>
                                        Here's some muted text idiot
                                    </Form.Text>
                                </Form.Group>

                                <Button variant='primary' type='submit'>
                                    Submit
                                </Button>

                            </Form>


                            :


                            <Card
                                onClick={(e) => {
                                    setEditingActive(true);
                                    setCurrentEdit(e.currentTarget.id);
                                    console.log(e.currentTarget);
                                    console.log(e.currentTarget.id);
                                    console.log('double clicked!');
                                    console.log('this is editingActive: ', editingActive);
                                    console.log('this is currentEdit: ', currentEdit);
                                }}
                                id='incDmg' body style={{width: '400px'}}
                                className='mb-2'>
                                {dogStateParent.commands[1]}
                            </Card>}
                    </div>

                </div>
                <div className='mt-2'>
                    <div>
                        <ProgressBar className='mb-2'
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


                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close Modal
                </Button>
                <Button variant='primary' onClick={renderSpeech}>
                    {voiceInput ? 'LISTENING' : 'Speak To Train'}
                </Button>
            </Modal.Footer>
        </Modal>
    </>);
}

