"use server";

import { Button, Table, Dialog } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { tableBody, skeletonBody, tableHead } from "./helpers";
import { getSeasons } from "./api";
import { DialogContent } from "./dialog";

import { URLS } from "@/consts/common";

export default async function Page() {
  const { seasons } = await getSeasons();

  return (
    <main className='flex min-h-screen flex-col'>
      <Dialog.Root>
        <div className='flex flex-col gap-y-2 items-start shrink-0 mt-4'>
          <Dialog.Trigger>
            <Button variant='surface' className='cursor-pointer'>
              <PlusCircledIcon /> Add new Season
            </Button>
          </Dialog.Trigger>

          <Table.Root variant='surface' className='w-full'>
            {tableHead(!seasons.length)}
            <Table.Body>{!seasons.length ? skeletonBody() : tableBody(seasons)}</Table.Body>
          </Table.Root>
        </div>
        <DialogContent />
      </Dialog.Root>
    </main>
  );
}
