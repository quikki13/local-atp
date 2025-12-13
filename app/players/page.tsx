"use server";

import { Button, Table, Dialog } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { tableBody, skeletonBody, tableHead } from "./helpers";
import { getPlayers } from "./api";
import { DialogContent } from "./dialog";

export default async function Page() {
  const { players } = await getPlayers();

  return (
    <main className='flex min-h-screen flex-col'>
      <Dialog.Root>
        <div className='flex flex-col gap-y-2 items-start shrink-0 mt-4'>
          <Dialog.Trigger>
            <Button variant='surface' className='cursor-pointer'>
              <PlusCircledIcon /> Add new Player
            </Button>
          </Dialog.Trigger>

          <Table.Root variant='surface' className='w-full'>
            {tableHead(!players.length)}
            <Table.Body>{!players.length ? skeletonBody() : tableBody(players)}</Table.Body>
          </Table.Root>
        </div>
        <DialogContent />
      </Dialog.Root>
    </main>
  );
}