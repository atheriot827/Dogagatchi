import { useState, useEffect } from 'react';
import { Modal, Button, ProgressBar } from 'react-bootstrap';

// Takes in props for controlling the battle modal and dog data
function PoochBattles({ show, onHide, playerDog, enemyDog, onBattleEnd }) {

  //Init battle state with useState hook
  const [battleState, setBattleState] = useState({
    playerHealth: 100,          // Players dog starting health
    enemyHealth: 100,           // Enemy dog starting health
    currentTurn: 'player',      // Who's turn it is
    battleLog: [],              // Array to store battle actions
    isActive: true              // Whether the battle is ongoing
  });

  // State to manage the current animation being shown for each dog
  const [currentAnimation, setCurrentAnimation] = useState({
    player: 'Standing',         // Default animation for player's dog
    enemy: 'Standing'           // Default animation for enemy dog
  });

  // Define available moves and their props
  const moves = {
    bite: { damage: 20, animation: 'Bite' },          // Strong attack
    headbutt: { damage: 15, animation: 'Headbutt' },  // Medium attack
    bark: { damage: 10, animation: 'Barking' }        // Light attack
  };

  // Handler function for when player selects a move
  const handleMove = (moveType) => {
    // If battle is not active, don't process the move
    if (!battleState.isActive) return;

    // Get the selected move's props

    // Set the player's attack animation

    

    // Process the attack after a 1 second delay

    // Update battle state with new enemy health and battle log



    // Reset the animations back to standing


    // If enemy is still alive, let them take their turn



  };

  // Function to handle enemy's turn

      // Get array of possible moves

      // Select random move


      // Add delay before enemy attack

          // Set enemy attack animation


          // Process enemy attack after animation


            // Update battle state with new player health and battle log



            // Reset animations



  // Effect hook to check for battle end conditions

      // Check if either dog's health is at 0

          // Set battle as inactive


          // Trigger battle and callback after delay




  // Render the battle modal
  return (
    <Modal>

    {/* Title* /}

    {/* Battle Arena with both dogs */}

    {/* Player's dog section */}




    {/* Enemy's dog section */}





    {/* Battle controls (move buttons) */}



    {/* Battle log showing last 3 actions */}




    </Modal>
  );
}

export default PoochBattles;