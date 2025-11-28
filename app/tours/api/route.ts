import postgres from "postgres";

import { ITourApi, ITour, ISeasonMap } from "../types";
import { ISeason } from "@/app/seasons/types";

const sql = postgres(process.env.NEXT_PUBLIC_POSTGRES_URL!, { ssl: "require" });

const getTours = async () => {
  const result: ITour[] = [];
  const toursTable: ITourApi[] = await sql`SELECT * FROM tours;`;

  if (toursTable.length !== 0) {
    const seasonsTable: Omit<ISeason, 'year'>[] = await sql`SELECT id, name FROM seasons;`;
    const seasonsMap: ISeasonMap = {};

    if (seasonsTable.length) {
      await seasonsTable.forEach((season) => {
        seasonsMap[season.id] = season.name;
      });
    }

    toursTable.forEach((tour) => result.push({ ...tour, season: seasonsMap[tour.season_id] }));
  }

  return result;
};

export async function GET() {
  try {
    const headers = new Headers({ "content-type": "application/json" });
    const response = await getTours();

    return Response.json(response, { headers });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
