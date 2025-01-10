import { useState, useEffect } from 'react';
import { Modal, Button, ProgressBar } from 'react-bootstrap';

// Takes in props for controlling the battle modal and dog data
function PoochBattles({ show, onHide, playerDog, enemyDog, onBattleEnd }) {

  // Init battle state with useState hook
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
    const move = moves[moveType];

    // Set the player's attack animation
    setCurrentAnimation({
      player: move.animation,
      enemy: 'Standing'
    });

    // Process the attack after a 1 second delay
    setTimeout(() => {
      // Update battle state with new enemy health and battle log
      setBattleState(prev => ({
        ...prev,
        enemyHealth: Math.max(0, prev.enemyHealth - move.damage), // Prevent negative health
        battleLog: [...prev.battleLog, `${playerDog.name} used ${moveType}!`],
        currentTurn: 'enemy'
      }));

      // Reset the animations back to standing
      setCurrentAnimation({
        player: 'Standing',
        enemy: 'Standing'
      });

      // If enemy is still alive, let them take their turn
      if (battleState.enemyHealth > 0) {
        enemyTurn();
      }
    }, 1000);
  };

  // Function to handle enemy's turn
  const enemyTurn = () => {
    // Get array of possible moves
    const moveTypes = Object.keys(moves);
    // Select random move
    const randomMove = moveTypes[Math.floor(Math.random() * moveTypes.length)];
    const move = moves[randomMove];

    // Add delay before enemy attack
    setTimeout(() => {
      // Set enemy attack animation
      setCurrentAnimation({
        player: 'Standing',
        enemy: move.animation
      });

      // Process enemy attack after animation
      setTimeout(() => {
        // Update battle state with new player health and battle log
        setBattleState(prev => ({
          ...prev,
          playerHealth: Math.max(0, prev.playerHealth - move.damage),
          battleLog: [...prev.battleLog, `${enemyDog.name} used ${randomMove}!`],
          currentTurn: 'player'
        }));

        // Reset animations
        setCurrentAnimation({
          player: 'Standing',
          enemy: 'Standing'
        });
      }, 1000);
    }, 1000);
  };

  // Effect hook to check for battle end conditions
  useEffect(() => {
    // Check if either dog's health is at 0
    if (battleState.playerHealth <= 0 || battleState.enemyHealth <= 0) {
      // Set battle as inactive
      setBattleState(prev => ({ ...prev, isActive: false }));

      // Trigger battle and callback after delay
      setTimeout(() => {
        onBattleEnd({
          winner: battleState.playerHealth > 0 ? 'player' : 'enemy',
          playerHealthRemaining: battleState.playerHealth
        });
      }, 2000);
    }
  }, [battleState.playerHealth, battleState.enemyHealth]);  // Only run when health values change

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