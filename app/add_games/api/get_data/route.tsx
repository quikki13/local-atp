"use server";

import postgres from "postgres";

import { ISeason } from "@/app/seasons/types";
import { IPlayer } from "@/app/players/types";
import { ITour } from "@/app/tours/types";

import { IResponseData } from '../../types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const getData = async () => {
  const result: IResponseData = { seasons: [], players: [], tours: {} };
  const seasons: ISeason[] = await sql`SELECT * FROM seasons;`;
  const tours: ITour[] = await sql`SELECT * FROM tours;`;
  const players: IPlayer[] = await sql`SELECT * FROM players;`;

  await Promise.all([seasons, players, tours]).then((res) => {
    result.seasons = res[0];
    result.players = res[1];

    seasons.forEach(season => {
      result.tours[season.id] = tours.filter(tour => tour.season_id === season.id);
    })
  });

  return result;
};

export async function GET() {
  try {
    const headers = new Headers({ "content-type": "application/json" });
    const response = await getData();

    return Response.json(response, { headers, status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
