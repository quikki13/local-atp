"use server";

import { v4 as uuidv4 } from "uuid";
import postgres from "postgres";

import { revalidatePath } from "next/cache";

import { URLS } from "@/app/consts/common";

import { ITour } from "@/app/tours/types";
import { ISeason } from "@/app/seasons/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const createTour = async (data: ITour) => {
  const { year, month, day, season_id } = data;
  const path = URLS.tours;
  try {
    await sql`
    INSERT INTO tours (id, season_id, year, month, day)
    VALUES (${uuidv4()}, ${season_id}, ${year}, ${month}, ${day})
  `;
  } catch (err) {
    console.error(err);
  }
  revalidatePath(path);
};

export const removeTour = async (id: string) => {
  const path = URLS.tours;
  await sql`DELETE FROM tours WHERE id = ${id}`;
  revalidatePath(path);
};

export const createSeason = async (data: { year: string }) => {
  const { year } = data;
  const path = URLS.seasons;
  try {
    await sql`
    INSERT INTO seasons (id, year, name)
    VALUES (${uuidv4()}, ${Number(year)}, ${`Season ${year}`})
  `;
  } catch (err) {
    console.error(err);
  }
  revalidatePath(path);
};

export const createPlayer = async (data: { name: string, email?: string }) => {
  const { name, email } = data;
  const path = URLS.players;
  try {
    await sql`
    INSERT INTO players (id, name, email, image_url)
    VALUES (${uuidv4()}, ${name}, ${email || ''}, ${'/players/no-avatar.png'})
  `;
  } catch (err) {
    console.error(err);
  }
  revalidatePath(path);
};

// const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// export async function updateInvoice(id: string, formData: FormData) {
//   const { customerId, amount, status } = UpdateInvoice.parse({
//     customerId: formData.get("customerId"),
//     amount: formData.get("amount"),
//     status: formData.get("status"),
//   });

//   const amountInCents = amount * 100;

//   try {
//     await sql`
//     UPDATE invoices
//     SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//     WHERE id = ${id}
//   `;
//   } catch (err) {
//     console.log(err);
//   }
//     revalidatePath("/dashboard/invoices");
//     redirect("/dashboard/invoices");
// }

// export async function deleteInvoice(id: string) {
//   throw new Error('Failed to Delete Invoice');
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath("/dashboard/invoices");

// }
