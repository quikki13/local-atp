"use server";

import postgres from "postgres";

import { ITourApi, ISeasonMap, ITourWithSeason } from "../types";

const sql = postgres(
  process.env && process.env.POSTGRES_URL
    ? process.env.POSTGRES_URL!
    : "postgresql://neondb_owner:npg_VWmq7aQc3MAi@ep-sparkling-mud-a4k5fh2h-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"!,
  { ssl: "require" },
);

const getTours = async () => {
  const result: ITourWithSeason = { tours: [], seasons: [] };
  const toursTable: ITourApi[] = await sql`SELECT * FROM tours;`;

  if (toursTable.length !== 0) {
    const seasonsTable: ITourWithSeason['seasons'] = await sql`SELECT id, name FROM seasons;`;
    const seasonsMap: ISeasonMap = {};

    if (seasonsTable.length) {
      result.seasons = seasonsTable;
      await seasonsTable.forEach((season) => {
        seasonsMap[season.id] = season.name;
      });
    }

    toursTable.forEach((tour) => result.tours.push({ ...tour, season: seasonsMap[tour.season_id] }));
  }

  return result;
};

export async function GET() {
  try {
    const headers = new Headers({ "content-type": "application/json" });
    const response = await getTours();

    return Response.json(response, { headers, status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
