import postgres from "postgres";

import { IPlayer } from "./types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const getPlayers = async () => {
  let data: IPlayer[] = [];
  try {
    data = await sql`SELECT * FROM players;`;
  } catch (err) {
    console.error(err);
  }

  return { players: data };
};
