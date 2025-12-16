import { useState } from 'react';
import { Box, Text, Button, VStack, Image, Badge } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { Player } from '../types/game';

interface PlayerCardProps {
  player: Player;
  onSeen: (playerId: string) => void;
}

const MotionBox = motion.create(Box);

export function PlayerCard({ player, onSeen }: PlayerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!player.hasSeen && !isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleHide = () => {
    setIsFlipped(false);
    onSeen(player.id);
  };

  const isImpostor = player.isImpostor;

  return (
    <Box
      position="relative"
      width="100%"
      height="220px"
      style={{ perspective: '1000px' }}
      cursor={player.hasSeen ? 'not-allowed' : 'pointer'}
      onClick={handleFlip}
    >
      <MotionBox
        position="absolute"
        width="100%"
        height="100%"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Dorso de la carta (Front) */}
        <MotionBox
          position="absolute"
          width="100%"
          height="100%"
          style={{ backfaceVisibility: 'hidden' }}
          bg={player.hasSeen ? 'gray.100' : 'perry.teal'}
          borderRadius="2xl"
          boxShadow={player.hasSeen ? 'none' : 'lg'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={4}
          border="1px solid"
          borderColor={player.hasSeen ? 'gray.200' : 'whiteAlpha.300'}
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={player.hasSeen ? 'gray.400' : 'white'}
            textAlign="center"
            mb={2}
          >
            {player.name}
          </Text>
          {player.hasSeen ? (
            <Text color="gray.400" fontSize="sm">
              ✓ Listo
            </Text>
          ) : (
            <Box 
              bg="whiteAlpha.200" 
              px={3} 
              py={1} 
              borderRadius="full"
            >
              <Text color="white" fontSize="xs" fontWeight="medium">
                Toca para ver
              </Text>
            </Box>
          )}
        </MotionBox>

        {/* Frente de la carta (Back - contenido) */}
        <MotionBox
          position="absolute"
          width="100%"
          height="100%"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          bg="white"
          borderRadius="2xl"
          boxShadow="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={4}
          border="1px solid"
          borderColor="gray.100"
          onClick={(e) => e.stopPropagation()}
        >
          <VStack gap={4} width="100%">
            <Image
              src={isImpostor ? '/logo.png' : '/civil.png'}
              alt={isImpostor ? 'Impostor' : 'Civil'}
              boxSize="64px"
              objectFit="contain"
              mx="auto"
            />

            <Box textAlign="center">
              <Text fontSize="sm" color="gray.500" mb={1} textTransform="uppercase" letterSpacing="wide">
                Tu palabra es
              </Text>
              <Text 
                fontSize={isImpostor ? "lg" : "2xl"} 
                fontWeight="bold" 
                color={isImpostor ? "red.500" : "perry.teal"}
                lineHeight="shorter"
              >
                {isImpostor ? 'Eres el impostor' : player.word}
              </Text>
            </Box>

            {isImpostor && player.hint && (
              <Box
                w="full"
                bg="perry.50"
                borderRadius="lg"
                border="1px solid"
                borderColor="perry.teal"
                p={3}
                textAlign="center"
              >
                <Badge colorPalette="orange" borderRadius="full" mb={1}>
                  Pista
                </Badge>
                <Text fontSize="sm" color="gray.700" fontWeight="semibold">
                  {player.hint}
                </Text>
              </Box>
            )}
            
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleHide();
              }}
              bg="perry.orange"
              color="white"
              _hover={{ bg: "orange.500" }}
              width="full"
              borderRadius="lg"
              fontWeight="bold"
            >
              Ocultar
            </Button>
          </VStack>
        </MotionBox>
      </MotionBox>
    </Box>
  );
}
