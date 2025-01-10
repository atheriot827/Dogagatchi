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




  // Handler function for when player selects a move




  // Function to handle enemy's turn




  // Effect hook to check for battle end conditions




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