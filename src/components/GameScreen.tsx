import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Badge,
  HStack,
  Portal,
  Dialog,
  CloseButton,
  Image,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  LuFolder,
  LuEye,
  LuMousePointerClick,
  LuMessageCircle,
  LuRotateCcw,
  LuMegaphone,
} from 'react-icons/lu';
import type { Player } from '../types/game';
import { PlayerCard } from './PlayerCard';

interface GameScreenProps {
  players: Player[];
  category: string;
  onPlayerSeen: (playerId: string) => void;
  onStartDebate: () => void;
  onRestart: () => void;
}

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

export function GameScreen({ 
  players, 
  category, 
  onPlayerSeen, 
  onStartDebate,
  onRestart 
}: GameScreenProps) {
  const [showDebateModal, setShowDebateModal] = useState(false);
  const [starterName, setStarterName] = useState('');

  const seenCount = players.filter((p) => p.hasSeen).length;
  const allSeen = seenCount === players.length;

  const handleStartDebate = () => {
    if (!players.length) return;
    // Seleccionar jugador aleatorio para empezar
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    setStarterName(randomPlayer.name);
    setShowDebateModal(true);
    onStartDebate();
  };

  return (
    <Container 
      maxW="5xl" 
      w="full"
      mx="auto"
      py={{ base: 4, md: 8 }} 
      px={{ base: 4, md: 8 }}
    >
      <VStack gap={6} align="stretch">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack gap={3}>
            <HStack gap={3}>
              <Image src="/logo.png" alt="Logo" boxSize="32px" filter="brightness(0) invert(1)" />
              <Heading 
                size="lg" 
                textAlign="center"
                color="white"
                fontWeight="bold"
              >
                El Impostor
              </Heading>
            </HStack>
            <HStack gap={3} justify="center" flexWrap="wrap">
              <Badge 
                bg="whiteAlpha.200" 
                color="white" 
                size="md" 
                px={3} 
                py={1} 
                borderRadius="full"
                fontWeight="medium"
                border="1px solid"
                borderColor="whiteAlpha.300"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon as={LuFolder} /> {category}
              </Badge>
              <Badge 
                bg={allSeen ? "perry.orange" : "whiteAlpha.200"} 
                color="white"
                size="md" 
                px={3} 
                py={1}
                borderRadius="full"
                fontWeight="medium"
                border="1px solid"
                borderColor={allSeen ? "perry.orange" : "whiteAlpha.300"}
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Icon as={LuEye} /> {seenCount}/{players.length} vistos
              </Badge>
            </HStack>
          </VStack>
        </MotionBox>

        {/* Instrucciones */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          bg="white"
          p={3}
          borderRadius="lg"
          textAlign="center"
          boxShadow="sm"
          mx="auto"
          maxW="sm"
          width="full"
        >
          <Text color="perry.teal" fontWeight="bold" fontSize="sm" display="flex" alignItems="center" justifyContent="center" gap={2}>
            <Icon as={LuMousePointerClick} /> Toca tu carta para ver tu palabra secreta
          </Text>
        </MotionBox>

        {/* Grid de Cartas */}
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4 }} gap={4} justifyItems="center">
          {players.map((player, index) => (
            <MotionBox
              key={player.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              width="full"
              maxW="200px"
            >
              <PlayerCard player={player} onSeen={onPlayerSeen} />
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Botón de Debate */}
        {allSeen && (
          <MotionBox
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              type: 'spring',
              stiffness: 200,
            }}
            position="sticky"
            bottom={4}
            zIndex={10}
          >
            <MotionButton
              onClick={handleStartDebate}
              bg="perry.orange"
              color="white"
              _hover={{ bg: "orange.500", transform: "scale(1.02)" }}
              size="xl"
              width="full"
              height="60px"
              fontSize="lg"
              fontWeight="bold"
              whileTap={{ scale: 0.98 }}
              boxShadow="lg"
              borderRadius="xl"
            >
              <Icon as={LuMessageCircle} mr={2} /> Comenzar Debate
            </MotionButton>
          </MotionBox>
        )}

        {/* Botón de Reiniciar */}
        <Button
          onClick={onRestart}
          variant="ghost"
          color="whiteAlpha.800"
          _hover={{ bg: "whiteAlpha.200", color: "white" }}
          size="sm"
          mx="auto"
        >
          <Icon as={LuRotateCcw} mr={2} /> Nueva Partida
        </Button>
      </VStack>

      {/* Modal de Debate */}
      <Dialog.Root 
        open={showDebateModal} 
        onOpenChange={(e) => setShowDebateModal(e.open)}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl" boxShadow="2xl" bg="white" maxW="sm" mx={4}>
              <Dialog.Header borderBottomWidth="1px" borderColor="gray.100" pb={4}>
                <Dialog.Title 
                  textAlign="center" 
                  fontSize="xl" 
                  color="perry.teal" 
                  fontWeight="bold"
                  width="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  <Icon as={LuMegaphone} /> ¡Comienza el Debate!
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body py={8}>
                <VStack gap={6} textAlign="center">
                  <MotionBox
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      type: 'spring',
                      stiffness: 200,
                      delay: 0.1,
                    }}
                  >
                    <Box
                      bg="perry.teal"
                      p={8}
                      borderRadius="2xl"
                      color="white"
                      boxShadow="xl"
                      position="relative"
                      overflow="hidden"
                    >
                      <Box 
                        position="absolute" 
                        top="-20px" 
                        right="-20px" 
                        boxSize="100px" 
                        bg="whiteAlpha.200" 
                        borderRadius="full" 
                      />
                      <Text fontSize="sm" mb={2} fontWeight="medium" opacity={0.9}>Empieza hablando:</Text>
                      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight">
                        {starterName}
                      </Text>
                    </Box>
                  </MotionBox>
                  <Text color="gray.600" fontSize="md" px={4}>
                    Cada jugador debe describir su palabra sin decirla explícitamente. 
                    <br />
                    <strong>¡Encuentren al impostor!</strong>
                  </Text>
                </VStack>
              </Dialog.Body>
              <Dialog.Footer justifyContent="center" pt={2} pb={6}>
                <Dialog.ActionTrigger asChild>
                  <Button 
                    bg="perry.orange" 
                    color="white" 
                    size="lg" 
                    px={8}
                    borderRadius="xl"
                    _hover={{ bg: "orange.500", transform: "translateY(-1px)" }}
                    fontWeight="bold"
                  >
                    ¡Entendido!
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" color="gray.400" top={4} right={4} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Container>
  );
}
