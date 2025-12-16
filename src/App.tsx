import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';
import type { Player, GamePhase } from './types/game';
import { categories } from './types/game';

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleStartGame = (newPlayers: Player[], category: string, _word?: string) => {
    setPlayers(newPlayers);
    setSelectedCategory(category);
    setGamePhase('playing');
  };

  const handlePlayerSeen = (playerId: string) => {
    setPlayers((prev) =>
      prev.map((player) =>
        player.id === playerId ? { ...player, hasSeen: true } : player
      )
    );
  };

  const handleStartDebate = () => {
    setGamePhase('debate');
  };

  const handleRestart = () => {
    setPlayers([]);
    setSelectedCategory('');
    setGamePhase('setup');
  };

  const getCategoryName = () => {
    const category = categories.find((c) => c.id === selectedCategory);
    return category?.name || selectedCategory;
  };

  return (
    <Box 
      minH="100vh" 
      bg="perry.teal" 
      color="perry.white"
      py={{ base: 4, md: 8 }}
      px={{ base: 4, md: 6 }}
      backgroundImage="radial-gradient(circle at 50% 50%, #00B8AD 0%, #00A89D 100%)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="full" maxW={{ base: '100%', md: '960px', lg: '1100px' }} mx="auto">
        {gamePhase === 'setup' && (
          <SetupScreen onStartGame={handleStartGame} />
        )}

        {(gamePhase === 'playing' || gamePhase === 'debate') && (
          <GameScreen
            players={players}
            category={getCategoryName()}
            onPlayerSeen={handlePlayerSeen}
            onStartDebate={handleStartDebate}
            onRestart={handleRestart}
          />
        )}
      </Box>
    </Box>
  );
}

export default App;
