// import bcrypt from "bcrypt";
// import postgres from "postgres";

// import {
//   users,
//   players,
//   games,
//   tours,
//   seasons,
//   tours_table,
//   seasons_table,
// } from "../lib/placeholder-data";

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// async function seedUsers() {
//   await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     }),
//   );

//   return insertedUsers;
// }

// async function seedPlayers() {
//   try {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await sql`
//     CREATE TABLE IF NOT EXISTS players (
//        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//        name VARCHAR(255) NOT NULL,
//        email VARCHAR(255) NOT NULL,
//        image_url VARCHAR(255) NOT NULL
//     );
//   `;

//     const insertedPlayers = await Promise.all(
//       players.map(
//         (player) => sql`
//         INSERT INTO players(id, name, email, image_url)
//         VALUES (${player.id}, ${player.name}, ${player.email}, ${player.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     return insertedPlayers;
//   } catch (err) {
//     console.log("players table err", { err });
//   }
// }

// async function seedGames() {
//   try {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await sql`CREATE TABLE IF NOT EXISTS games (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         season_id UUID NOT NULL,
//         tour_id UUID NOT NULL,
//         time TIMESTAMP NOT NULL,
//         year SMALLINT CHECK(year >= 1 AND year <= 9999),
//         month SMALLINT CHECK(month BETWEEN 1 AND 12),
//         day SMALLINT CHECK(day BETWEEN 1 AND 31),
//         player1 UUID NOT NULL,
//         player2 UUID NOT NULL,
//         player1_score INT NOT NULL,
//         player2_score INT NOT NULL,
//         winner UUID NOT NULL,
//         winner_points INT NOT NULL
//       );`;

//     const insertedGames = await Promise.all(
//       games.map(
//         ({
//           id,
//           season_id,
//           tour_id,
//           time,
//           year,
//           month,
//           day,
//           player1,
//           player1_score,
//           player2,
//           player2_score,
//           winner,
//           winner_points
//         }) => sql`
//           INSERT INTO games(id, season_id, tour_id, time, year, month, day, player1, player2, player1_score, player2_score, winner, winner_points)
//           VALUES (${id}, ${season_id}, ${tour_id}, ${time}, ${year}, ${month}, ${day}, ${player1}, ${player2}, ${player1_score}, ${player2_score}, ${winner}, ${winner_points})
//           ON CONFLICT (id) DO NOTHING;
//       `,
//       ),
//     );

//     return insertedGames;
//   } catch (err) {
//     console.log("games table err", { err });
//   }
// }

// async function seedTours() {
//   try {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await sql`
//     CREATE TABLE IF NOT EXISTS tours (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       season_id UUID NOT NULL,
//       year SMALLINT CHECK(year >= 1 AND year <= 9999),
//       month SMALLINT CHECK(month BETWEEN 1 AND 12),
//       day SMALLINT CHECK(day BETWEEN 1 AND 31)
//     );
//   `;

//     const insertedTours = await Promise.all(
//       tours.map(({ id, season_id, year, month, day }) => {
//         return sql`
//           INSERT INTO tours(id, season_id, year, month, day)
//           VALUES (${id}, ${season_id}, ${year}, ${month}, ${day})
//           ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     return insertedTours;
//   } catch (err) {
//     console.log("tours table err", err);
//   }
// }

// async function seedSeasons() {
//   try {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await sql`
//     CREATE TABLE IF NOT EXISTS seasons (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       year SMALLINT CHECK(year >= 1 AND year <= 9999),
//       name VARCHAR(100)
//     );
//   `;

//     const insertedSeasons = await Promise.all(
//       seasons.map(({ id, year, name }) => {
//         return sql`
//           INSERT INTO seasons(id, year, name)
//           VALUES (${id}, ${year}, ${name})
//           ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     return insertedSeasons;
//   } catch (err) {
//     console.log("seasons table err", err);
//   }
// }

// async function seedToursTable() {
//   try {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await sql`
//       CREATE TABLE IF NOT EXISTS tours_table (
//         tour_id UUID,
//         season_id UUID,
//         player_id UUID,
//         score INT
//       );
//   `;

//     const insertedToursTable = await Promise.all(
//       tours_table.map(({ tour_id, season_id, player_id, score }) => {
//         return sql`
//           INSERT INTO tours_table(tour_id, season_id, player_id, score)
//           VALUES (${tour_id}, ${season_id}, ${player_id}, ${score})
//       `;
//       }),
//     );

//     return insertedToursTable;
//   } catch (err) {
//     console.log("tours table err", err);
//   }
// }

// async function seedSeasonsTable() {
//   try {
//     await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     await sql`
//       CREATE TABLE IF NOT EXISTS seasons_table (
//         season_id UUID,
//         player_id UUID,
//         score INT
//       );
//   `;

//     const insertedToursScores = await Promise.all(
//       seasons_table.map(({ season_id, player_id, score }) => {
//         return sql`
//           INSERT INTO seasons_table(season_id, player_id, score)
//           VALUES (${season_id}, ${player_id}, ${score})
//       `;
//       }),
//     );

//     return insertedToursScores;
//   } catch (err) {
//     console.log("seasons table err", err);
//   }
// }

export async function GET() {
  // try {
  //   const result = await sql.begin((sql) => [
  //     seedUsers(),
  //     seedPlayers(),
  //     seedGames(),
  //     seedTours(),
  //     seedSeasons(),
  //     seedToursTable(),
  //     seedSeasonsTable(),
  //   ]);

  //   return Response.json({ message: "Database seeded successfully" });
  // } catch (error) {
  //   return Response.json({ error }, { status: 500 });
  // }
}
