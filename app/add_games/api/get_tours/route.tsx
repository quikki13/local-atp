"use server";

import postgres from "postgres";

import { ITour } from "@/app/tours/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const getTours = async () => {
  const tours: ITour[] = await sql`SELECT * FROM tours;`;

  return tours;
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
