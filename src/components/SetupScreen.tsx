import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  HStack,
  Text,
  IconButton,
  Badge,
  Checkbox,
  Portal,
  Image,
  Card,
  Dialog,
  SimpleGrid,
  CloseButton,
  Icon,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuUtensils,
  LuCat,
  LuTrophy,
  LuFilm,
  LuGlobe,
  LuLaptop,
  LuMusic,
  LuBriefcase,
  LuBuilding,
  LuShuffle,
} from 'react-icons/lu';
import type { Category, Player, WordEntry } from '../types/game';
import { categories } from '../types/game';

interface SetupScreenProps {
  onStartGame: (players: Player[], category: string, word: string) => void;
}

const MotionBox = motion.create(Box);

const categoryIcons: Record<string, React.ElementType> = {
  random: LuShuffle,
  food: LuUtensils,
  animals: LuCat,
  sports: LuTrophy,
  movies: LuFilm,
  countries: LuGlobe,
  technology: LuLaptop,
  music: LuMusic,
  jobs: LuBriefcase,
  cities: LuBuilding,
};

const categoryDescriptions: Record<string, string> = {
  random: '¡Sorpresa! Palabras de todo tipo.',
  food: 'Platos y antojos para abrir el apetito.',
  animals: 'Criaturas grandes, pequeñas y salvajes.',
  sports: 'Acción, equipo y competencia.',
  movies: 'Historias, géneros y clásicos del cine.',
  countries: 'Destinos y culturas alrededor del mundo.',
  technology: 'Gadgets, innovaciones y mundo digital.',
  music: 'Ritmos, géneros y escenas sonoras.',
  jobs: 'Oficios y profesiones del día a día.',
  cities: 'Metrópolis icónicas y sus vibes.',
};

export function SetupScreen({ onStartGame }: SetupScreenProps) {
  const [playerNames, setPlayerNames] = useState<string[]>(['', '', '']);
  const [selectedCategory, setSelectedCategory] = useState<string>('random');
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
  const [error, setError] = useState<string>('');
  const [assistImpostor, setAssistImpostor] = useState<boolean>(false);

  const addPlayer = () => {
    setPlayerNames([...playerNames, '']);
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 3) {
      const newNames = playerNames.filter((_, i) => i !== index);
      setPlayerNames(newNames);
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
    setError('');
  };

  const handleStartGame = () => {
    // Validaciones
    const validNames = playerNames.filter((name) => name.trim() !== '');
    
    if (validNames.length < 3) {
      setError('Se necesitan al menos 3 jugadores');
      return;
    }

    const uniqueNames = new Set(validNames.map((n) => n.toLowerCase().trim()));
    if (uniqueNames.size !== validNames.length) {
      setError('Los nombres deben ser únicos');
      return;
    }

    // Seleccionar palabra aleatoria de la categoría con fallback seguro
    const category = (categories.find((c) => c.id === selectedCategory) ?? categories[0]) as Category;
    const selectedWord: WordEntry = category.words[Math.floor(Math.random() * category.words.length)];
    const randomWord = selectedWord.word;

    // Seleccionar impostor al azar
    const impostorIndex = Math.floor(Math.random() * validNames.length);

    // Crear jugadores
    const players: Player[] = validNames.map((name, index) => ({
      id: `player-${index}`,
      name: name.trim(),
      isImpostor: index === impostorIndex,
      word: index === impostorIndex ? '🕵️ ERES EL IMPOSTOR 🕵️' : randomWord,
      hint: index === impostorIndex && assistImpostor ? selectedWord.hint : undefined,
      hasSeen: false,
    }));

    // Mezclar jugadores para que no sea predecible
    const shuffledPlayers = players.sort(() => Math.random() - 0.5);

    onStartGame(shuffledPlayers, category.id, randomWord);
  };

  const currentCategoryName = categories.find(c => c.id === selectedCategory)?.name;

  return (
    <Container 
      maxW={{ base: 'lg', md: '2xl' }}
      w="full"
      mx="auto"
      pt={{ base: 2, md: 6 }}
      pb={{ base: 6, md: 10 }}
      px={{ base: 4, md: 6 }}
    >
      <VStack gap={6} align="stretch">
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
        >
          <VStack gap={2}>
            <Image 
              src="/logo.png" 
              alt="El Impostor Logo" 
              maxW="100px" 
              mx="auto"
              filter="drop-shadow(0px 4px 6px rgba(0,0,0,0.1))"
            />
            <Heading 
              size="xl" 
              color="white"
              fontWeight="bold"
              letterSpacing="tight"
            >
              El Impostor
            </Heading>
          </VStack>
        </MotionBox>

        <Card.Root 
          bg="white" 
          borderRadius="2xl" 
          boxShadow="xl" 
          border="none"
          overflow="hidden"
          w="full"
          maxW="lg"
          mx="auto"
        >
          <Box h="6px" bg="perry.orange" width="100%" />
          <Card.Body gap={5} p={6}>
            {/* Selector de Categoría (Botón Interactivo) */}
            <MotionBox
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <VStack align="stretch" gap={2}>
                <Text fontWeight="bold" fontSize="sm" color="gray.600" textTransform="uppercase" letterSpacing="wider">
                  Categoría
                </Text>
                <Button
                  onClick={() => setCategoryModalOpen(true)}
                  variant="outline"
                  height="auto"
                  py={3}
                  px={4}
                  justifyContent="space-between"
                  bg="gray.50"
                  borderColor="gray.200"
                  _hover={{ borderColor: "perry.teal", bg: "perry.50" }}
                  borderRadius="xl"
                  width="full"
                >
                  <HStack gap={3}>
                    <Box
                      boxSize="40px"
                      borderRadius="full"
                      bg="perry.teal"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                      fontSize="xl"
                    >
                      <Icon as={categoryIcons[selectedCategory]} boxSize={6} />
                    </Box>
                    <VStack align="start" gap={0}>
                      <Text color="gray.800" fontWeight="bold" fontSize="md">
                        {currentCategoryName}
                      </Text>
                      <Text color="gray.500" fontSize="xs" fontWeight="medium">
                        Toca para cambiar
                      </Text>
                    </VStack>
                  </HStack>
                  <Text color="perry.teal" fontSize="lg">›</Text>
                </Button>

                <Checkbox.Root
                  colorPalette="teal"
                  checked={assistImpostor}
                  onCheckedChange={(details) => setAssistImpostor(Boolean(details.checked))}
                  size="sm"
                  color="gray.700"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                >
                  <Checkbox.Control />
                  <Checkbox.Label>Agregar ayuda al impostor</Checkbox.Label>
                  <Checkbox.HiddenInput />
                </Checkbox.Root>
              </VStack>
            </MotionBox>

            {/* Lista de Jugadores */}
            <MotionBox
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <HStack justify="space-between" mb={3}>
                <Text fontWeight="bold" fontSize="sm" color="gray.600" textTransform="uppercase" letterSpacing="wider">
                  Jugadores
                </Text>
                <Badge bg="perry.teal" color="white" size="sm" borderRadius="full" px={2}>
                  {playerNames.filter((n) => n.trim()).length}
                </Badge>
              </HStack>

              <VStack gap={3} align="stretch">
                <AnimatePresence>
                  {playerNames.map((name, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HStack gap={2}>
                        <Input
                          placeholder={`Nombre ${index + 1}`}
                          value={name}
                          onChange={(e) => updatePlayerName(index, e.target.value)}
                          size="md"
                          variant="subtle"
                          flex={1}
                          bg="gray.50"
                          _focus={{ bg: "white", ring: "2px solid", ringColor: "perry.teal" }}
                          borderRadius="lg"
                          color="gray.800"
                        />
                        {playerNames.length > 3 && (
                          <IconButton
                            aria-label="Eliminar"
                            onClick={() => removePlayer(index)}
                            colorPalette="red"
                            variant="ghost"
                            size="sm"
                            borderRadius="lg"
                          >
                            ✕
                          </IconButton>
                        )}
                      </HStack>
                    </MotionBox>
                  ))}
                </AnimatePresence>
              </VStack>

              <Button
                onClick={addPlayer}
                variant="ghost"
                color="perry.teal"
                _hover={{ bg: "perry.50" }}
                width="full"
                mt={3}
                size="sm"
                borderRadius="lg"
                fontWeight="medium"
              >
                + Agregar otro jugador
              </Button>
            </MotionBox>
          </Card.Body>
        </Card.Root>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <MotionBox
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Text color="white" bg="red.500" textAlign="center" fontWeight="medium" py={2} px={4} borderRadius="lg" fontSize="sm" boxShadow="md">
                {error}
              </Text>
            </MotionBox>
          )}
        </AnimatePresence>

        {/* Botón de Inicio */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            onClick={handleStartGame}
            bg="perry.orange"
            color="white"
            _hover={{ bg: "orange.500", transform: "translateY(-1px)", boxShadow: "lg" }}
            _active={{ transform: "translateY(0)" }}
            size="xl"
            width="full"
            fontSize="lg"
            fontWeight="bold"
            borderRadius="xl"
            boxShadow="md"
            transition="all 0.2s"
          >
            Comenzar Partida
          </Button>
        </MotionBox>
      </VStack>

      {/* Modal de Selección de Categoría */}
      <Dialog.Root 
        open={isCategoryModalOpen} 
        onOpenChange={(e) => setCategoryModalOpen(e.open)}
        placement="center"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
          <Dialog.Positioner>
            <Dialog.Content 
              borderRadius="2xl" 
              bg="white" 
              mx={{ base: 4, md: 6 }}
              maxW={{ base: 'md', md: '2xl', lg: '4xl' }} 
              w="full" 
              boxShadow="2xl" 
              overflow="hidden"
              maxH="82vh"
            >
              <Dialog.Header borderBottomWidth="1px" borderColor="gray.100" pb={3} pt={3} px={4}>
                <Dialog.Title fontSize="lg" fontWeight="bold" color="perry.teal" textAlign="center" w="full">
                  Selecciona una Categoría
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body py={{ base: 4, md: 5 }} px={{ base: 4, md: 6 }}>
                <Box maxH={{ base: '60vh', md: '65vh' }} overflowY="auto" pr={{ base: 1, md: 2 }}>
                  <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={{ base: 3, md: 4 }}>
                  {categories.map((cat) => {
                    const selected = selectedCategory === cat.id;
                    return (
                      <Button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setCategoryModalOpen(false);
                        }}
                        variant="outline"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        height="auto"
                        p={{ base: 3, md: 4 }}
                        borderRadius="xl"
                        borderColor={selected ? 'perry.teal' : 'gray.200'}
                        bg={selected ? 'perry.50' : 'white'}
                        _hover={{ borderColor: 'perry.teal', bg: 'perry.50' }}
                        gap={3}
                        boxShadow={selected ? 'md' : 'sm'}
                        transition="all 0.15s ease"
                        flexDirection="column"
                        width="100%"
                        textAlign="left"
                        whiteSpace="normal"
                        wordBreak="normal"
                        minH={{ base: '90px', md: '110px' }}
                      >
                        <HStack justify="space-between" w="full" align="flex-start">
                          <HStack gap={3} align="center" flex={1} minW={0}>
                            <Box
                              boxSize="40px"
                              borderRadius="full"
                              bg={selected ? 'perry.teal' : 'gray.100'}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              color={selected ? 'white' : 'gray.700'}
                              fontSize="lg"
                            >
                              <Icon as={categoryIcons[cat.id]} boxSize={5} />
                            </Box>
                            <VStack align="start" gap={0} flex={1} minW={0}>
                              <Text fontWeight="bold" color="gray.800" lineClamp={1}>
                                {cat.name}
                              </Text>
                              <Text fontSize="xs" color="gray.500" lineClamp={2} lineHeight="short">
                                {categoryDescriptions[cat.id]}
                              </Text>
                            </VStack>
                          </HStack>
                          <Badge 
                            size="sm" 
                            borderRadius="full" 
                            bg={selected ? 'perry.orange' : 'gray.100'} 
                            color={selected ? 'white' : 'gray.600'}
                            px={2}
                            flexShrink={0}
                          >
                            {cat.words.length} palabras
                          </Badge>
                        </HStack>
                      </Button>
                    );
                  })}
                  </SimpleGrid>
                </Box>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" color="gray.400" top={3} right={3} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Container>
  );
}
