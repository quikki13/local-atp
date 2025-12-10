import postgres from "postgres";

import { ISeason } from "./types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const getSeasons = async () => {
  let data: ISeason[] = [];
  try {
    data = await sql`SELECT * FROM seasons;`;
  } catch (err) {
    console.error(err);
  }

  return { seasons: data };
};
