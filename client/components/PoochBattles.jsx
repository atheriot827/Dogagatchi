import { useState, useEffect } from 'react';
import { Modal, Button, ProgressBar } from 'react-bootstrap';
import '../styles/PoochBattles.css';

// Takes in props for controlling the battle modal and dog data
function PoochBattles({ show, onHide, playerDog, enemyDog, onBattleEnd }) {

  // Init battle state with useState hook
  const [battleState, setBattleState] = useState({
    playerHealth: playerDog.health || 100,          // Players dog starting health
    enemyHealth: enemyDog.health || 100,            // Enemy dog starting health
    currentTurn: 'player',                          // Who's turn it is
    battleLog: [],                                  // Array to store battle actions
    isActive: true                                  // Whether the battle is ongoing
  });

  // State to manage the current animation being shown for each dog
  const [currentAnimation, setCurrentAnimation] = useState({
    player: 'Standing',         // Default animation for player's dog
    enemy: 'Standing'           // Default animation for enemy dog
  });

  // Dynamic moves based on player dogs's stats
  const moves = {
    bite: {
      damage: Math.floor(20 * (playerDog.attackDmg / 100)),   // Strong attack
      animation: 'Bite'
    },
    headbutt: {
      damage: Math.floor(15 * (playerDog.attackDmg / 100)),   // Medium attack
      animation: 'Headbutt'
    },
    bark: {
      damage: Math.floor(10 * (playerDog.attackDmg / 100)),   // Light attack
      animation: 'Barking'
    }
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
    let availableMoves;

    // Check if enemy has special moves from backend
    if (enemyDog.specialMoves && enemyDog.specialMoves.length > 0) {
      availableMoves = enemyDog.specialMoves;
    } else {
      // Fallback to default moves
      availableMoves = [
        { name: 'attack', damage: enemyDog.baseAttack, animation: 'Attack' }
      ];
    }

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    // Add delay before enemy attack
    setTimeout(() => {
      // Set enemy attack animation
      setCurrentAnimation({
        player: 'Standing',
        enemy: randomMove.animation || 'Attack'
      });

      // Process enemy attack after animation
      setTimeout(() => {
        // Update battle state with new player health and battle log
        setBattleState(prev => ({
          ...prev,
          playerHealth: Math.max(0, prev.playerHealth - randomMove.damage),
          battleLog: [...prev.battleLog, `${enemyDog.name} used ${randomMove.name}!`],
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
        const result = {
          winner: battleState.playerHealth > 0 ? 'player' : 'enemy',
          playerHealthRemaining: battleState.playerHealth,
          // Include enemy rewards in battle results
          rewards: battleState.playerHealth > 0 ? enemyDog.rewards : null
        };

        onBattleEnd(result);
      }, 2000);
    }
  }, [battleState.playerHealth, battleState.enemyHealth]);  // Only run when health values change

  // Render the battle modal
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
      className="battle-modal"
    >
      <Modal.Header className="bg-dark text-light">
        <Modal.Title>Battle vs {enemyDog.name}!</Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-secondary">
      <div className="battle-arena d-flex justify-content-between align-items-center p-3">
        {/* Player Dog Side */}
        <div className="player-dog text-center">
        <img
            src={`/assets/gifs/${playerDog.breed}/${currentAnimation.player}.gif`}
            alt={playerDog.name}
            className="battle-sprite"
          />
          <ProgressBar
            now={battleState.playerHealth}
            variant={battleState.playerHealth > 50 ? "success" : "danger"}
            className="my-2"
            label={`${battleState.playerHealth}%`}
          />
          <h4 className="text-light">{playerDog.name}</h4>
          <small className="text-light">Level {playerDog.level || 1}</small>
        </div>

        {/* VS Symbol */}
        <div className="battle-vs">
          <h1 className="text-warning">VS</h1>
        </div>

        {/* Enemy Dog Side */}
        <div className="enemy-dog text-center">
          <img
            src={enemyDog.sprite}
            alt={enemyDog.name}
            className="battle-sprite"
          />
          <ProgressBar
            now={battleState.enemyHealth}
            variant={battleState.enemyHealth > 50 ? "success" : "danger"}
            className="my-2"
            label={`${battleState.enemyHealth}%`}
          />
          <h4 className="text-light">{enemyDog.name}</h4>
          <small className="text-light">
            {enemyDog.type?.split('_').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </small>
        </div>
      </div>

    {/* Battle controls */}
    <div className="battle-controls d-flex justify-content-center gap-3 my-3">
      {Object.keys(moves).map(move => (
        <Button
          key={move}
          onClick={() => handleMove(move)}
          disabled={!battleState.isActive || battleState.currentTurn !== 'player'}
          variant={battleState.currentTurn === 'player' ? "primary" : "secondary"}
          className="move-button text-capitalize"
        >
          {move}
          <small className="d-block text-warning">
            DMG: {moves[move].damage}
          </small>
        </Button>
      ))}
    </div>

    {/* Battle log showing last 3 actions */}
    <div className="battle-log bg-dark text-light p-3 rounded">
      {battleState.battleLog.slice(-3).map((log, index) => (
        <p
          key={index}
          className={`mb-1 ${log.includes(playerDog.name) ? 'text-primary' : 'text-danger'}`}
        >
          {log}
        </p>
      ))}
    </div>
  </Modal.Body>
</Modal>
);
}

export default PoochBattles;