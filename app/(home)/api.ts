import postgres from "postgres";

import { IPlayer } from "@/app/players/types";
import { IResultsTableData, IResultsTableApiData, IResult } from "./types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const getSeasonsTable = async () => {
  let data: IResultsTableApiData[] = [];
  let result: IResultsTableData[] = [];

  try {
    data = await sql`SELECT * FROM seasons_table;`;
    const players: IPlayer[] = await sql`SELECT * FROM players;`;
    const playersMap: IResult = {};

    players.forEach((player) => {
      playersMap[`${player.id}`] = player.name;
    });

    result = data.map((item) => {
      return { ...item, personName: playersMap[item.player_id] };
    });
  } catch (err) {
    console.error(err);
  }

  return { seasonstable: result };
};
