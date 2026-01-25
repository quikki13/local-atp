const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
];

const players = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Maksim Bukovskii",
    email: "",
    image_url: "/players/no-avatar.png",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Dmitriy Semikov",
    email: "",
    image_url: "/players/no-avatar.png",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Artem Afanasev",
    email: "",
    image_url: "/players/no-avatar.png",
  },
];

const games = [
  {
    id: "85002605-1c19-4ebc-8977-d9336c498dba",
    season_id: "7049439c-2d1d-4663-8c20-8f3eee319283",
    tour_id: "69ba133d-753b-4019-ab0e-eccfe1972435",
    time: "2025-11-15T12:00:00Z",
    date: "2025-11-15",

    player1: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    player2: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    player1_score: 3,
    player2_score: 0,

    winner: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    winner_points: 3,
  },
];

const tours = [
  {
    id: "69ba133d-753b-4019-ab0e-eccfe1972435",
    season_id: "7049439c-2d1d-4663-8c20-8f3eee319283",
    name: '15 ноября 2025',
    date: "2025-11-15",
  },
];

const tours_table = [
  {
    tour_id: "69ba133d-753b-4019-ab0e-eccfe1972435",
    season_id: "7049439c-2d1d-4663-8c20-8f3eee319283",
    player_id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    score: 0,
  },
  {
    tour_id: "69ba133d-753b-4019-ab0e-eccfe1972435",
    season_id: "7049439c-2d1d-4663-8c20-8f3eee319283",
    player_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    score: 0,
  },
  {
    tour_id: "69ba133d-753b-4019-ab0e-eccfe1972435",
    season_id: "7049439c-2d1d-4663-8c20-8f3eee319283",
    player_id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    score: 0,
  },
];

const seasons = [{ id: "7049439c-2d1d-4663-8c20-8f3eee319283", year: 2025, name: "Season 2025" }];

const seasons_table = [
  {
    season_id: "7049439c-2d1d-4663-8c20-8f3eee319283",
    player_id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    score: 0,
  },
  {
    season_id: "7049439c-2d1d-4663-8c20-8f3eee319283",
    player_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    score: 0,
  },
  {
    season_id: "7049439c-2d1d-4663-8c20-8f3eee319283",
    player_id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    score: 0,
  },
];

export { users, players, games, tours, seasons, seasons_table, tours_table };
