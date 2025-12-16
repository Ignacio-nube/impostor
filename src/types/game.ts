export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
  word: string;
  hasSeen: boolean;
  hint?: string;
}

export interface WordEntry {
  word: string;
  hint: string;
}

export interface Category {
  id: string;
  name: string;
  words: WordEntry[];
}

export type GamePhase = 'setup' | 'playing' | 'debate';

export interface GameState {
  phase: GamePhase;
  players: Player[];
  selectedCategory: string;
  currentWord: string;
}

export const categories: Category[] = [
  {
    id: 'random',
    name: 'Aleatorio',
    words: [
      { word: 'Unicornio', hint: 'cuerno' },
      { word: 'Ovni', hint: 'espacio' },
      { word: 'Fantasma', hint: 'sábana' },
      { word: 'Dinosaurio', hint: 'extinto' },
      { word: 'Zombie', hint: 'cerebro' },
      { word: 'Robot', hint: 'metal' },
      { word: 'Ninja', hint: 'sigilo' },
      { word: 'Pirata', hint: 'barco' },
      { word: 'Vampiro', hint: 'sangre' },
      { word: 'Superhéroe', hint: 'capa' },
    ],
  },
  {
    id: 'food',
    name: 'Comida',
    words: [
      { word: 'Pizza', hint: 'queso' },
      { word: 'Hamburguesa', hint: 'pan' },
      { word: 'Sushi', hint: 'arroz' },
      { word: 'Tacos', hint: 'maíz' },
      { word: 'Paella', hint: 'mariscos' },
      { word: 'Pasta', hint: 'italia' },
      { word: 'Ensalada', hint: 'verde' },
      { word: 'Helado', hint: 'frío' },
      { word: 'Chocolate', hint: 'cacao' },
      { word: 'Empanada', hint: 'relleno' },
    ],
  },
  {
    id: 'animals',
    name: 'Animales',
    words: [
      { word: 'Perro', hint: 'ladrido' },
      { word: 'Gato', hint: 'bigotes' },
      { word: 'Elefante', hint: 'trompa' },
      { word: 'León', hint: 'melena' },
      { word: 'Delfín', hint: 'océano' },
      { word: 'Águila', hint: 'alas' },
      { word: 'Serpiente', hint: 'escamas' },
      { word: 'Oso', hint: 'hiberna' },
      { word: 'Jirafa', hint: 'cuello' },
      { word: 'Pingüino', hint: 'hielo' },
    ],
  },
  {
    id: 'sports',
    name: 'Deportes',
    words: [
      { word: 'Fútbol', hint: 'balón' },
      { word: 'Baloncesto', hint: 'aro' },
      { word: 'Tenis', hint: 'raqueta' },
      { word: 'Natación', hint: 'piscina' },
      { word: 'Ciclismo', hint: 'pedales' },
      { word: 'Boxeo', hint: 'guantes' },
      { word: 'Golf', hint: 'hoyo' },
      { word: 'Surf', hint: 'ola' },
      { word: 'Esquí', hint: 'nieve' },
      { word: 'Rugby', hint: 'ovalado' },
    ],
  },
  {
    id: 'movies',
    name: 'Películas',
    words: [
      { word: 'Titanic', hint: 'barco' },
      { word: 'Matrix', hint: 'pastilla' },
      { word: 'Avatar', hint: 'azul' },
      { word: 'Inception', hint: 'sueños' },
      { word: 'Gladiator', hint: 'coliseo' },
      { word: 'Joker', hint: 'payaso' },
      { word: 'Frozen', hint: 'hielo' },
      { word: 'Coco', hint: 'mariachi' },
      { word: 'Shrek', hint: 'pantano' },
      { word: 'Batman', hint: 'murciélago' },
    ],
  },
  {
    id: 'countries',
    name: 'Países',
    words: [
      { word: 'España', hint: 'paella' },
      { word: 'México', hint: 'tacos' },
      { word: 'Argentina', hint: 'mate' },
      { word: 'Japón', hint: 'sakura' },
      { word: 'Francia', hint: 'torre' },
      { word: 'Italia', hint: 'pizza' },
      { word: 'Brasil', hint: 'samba' },
      { word: 'Canadá', hint: 'arce' },
      { word: 'Australia', hint: 'canguro' },
      { word: 'Egipto', hint: 'pirámide' },
    ],
  },
  {
    id: 'technology',
    name: 'Tecnología',
    words: [
      { word: 'Internet', hint: 'red' },
      { word: 'Smartphone', hint: 'pantalla' },
      { word: 'Dron', hint: 'hélices' },
      { word: 'Robot', hint: 'automático' },
      { word: 'Laptop', hint: 'teclado' },
      { word: 'Satélite', hint: 'órbita' },
      { word: 'Impresora', hint: 'tinta' },
      { word: 'Bluetooth', hint: 'inalámbrico' },
      { word: 'Batería', hint: 'carga' },
      { word: 'WiFi', hint: 'señal' },
    ],
  },
  {
    id: 'music',
    name: 'Música',
    words: [
      { word: 'Guitarra', hint: 'cuerdas' },
      { word: 'Batería', hint: 'tambores' },
      { word: 'Micrófono', hint: 'voz' },
      { word: 'Concierto', hint: 'escenario' },
      { word: 'Pop', hint: 'charts' },
      { word: 'Rock', hint: 'distorsión' },
      { word: 'Jazz', hint: 'impro' },
      { word: 'Ópera', hint: 'tenor' },
      { word: 'Reggaetón', hint: 'perreo' },
      { word: 'DJ', hint: 'mezcla' },
    ],
  },
  {
    id: 'jobs',
    name: 'Profesiones',
    words: [
      { word: 'Doctor', hint: 'bata' },
      { word: 'Ingeniero', hint: 'planos' },
      { word: 'Chef', hint: 'cocina' },
      { word: 'Profesor', hint: 'pizarra' },
      { word: 'Piloto', hint: 'cabina' },
      { word: 'Abogado', hint: 'ley' },
      { word: 'Arquitecto', hint: 'maqueta' },
      { word: 'Enfermero', hint: 'inyección' },
      { word: 'Carpintero', hint: 'madera' },
      { word: 'Mecánico', hint: 'taller' },
    ],
  },
  {
    id: 'cities',
    name: 'Ciudades',
    words: [
      { word: 'Madrid', hint: 'oso' },
      { word: 'Buenos Aires', hint: 'obelisco' },
      { word: 'Tokio', hint: 'shibuya' },
      { word: 'Nueva York', hint: 'manhattan' },
      { word: 'París', hint: 'louvre' },
      { word: 'Londres', hint: 'big ben' },
      { word: 'Sídney', hint: 'ópera' },
      { word: 'Ciudad de México', hint: 'zocalo' },
      { word: 'Roma', hint: 'coliseo' },
      { word: 'Berlín', hint: 'muro' },
    ],
  },
];
