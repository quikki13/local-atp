"use client";

import { useState, useEffect } from "react";
import { Button, Table, Dialog } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { DialogContent } from './dialog';

import { tableHead, tableBody, skeletonBody } from "./helpers";

import { URLS } from "../consts/common";

import { ITour } from "./types";

export default function Page() {
  const [tours, setTours] = useState<ITour[]>([]);

  const getData = () =>
    fetch(`${URLS.tours}${URLS.api}`).then(async (response) => {
      // Проверяем успешность ответа

      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
      }
      const data = await response.json();
      setTours(data);
    });

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className='flex min-h-screen flex-col'>
      <Dialog.Root>
        <div className='flex flex-col gap-y-2 items-start shrink-0 mt-4'>
          <Dialog.Trigger>
            <Button variant='surface' className='cursor-pointer'>
              <PlusCircledIcon /> Add new Tour
            </Button>
          </Dialog.Trigger>

          <Table.Root variant='surface' className='w-full'>
            {tableHead(!tours.length)}
            <Table.Body>{!tours.length ? skeletonBody() : tableBody(tours)}</Table.Body>
          </Table.Root>
        </div>
        <DialogContent />
      </Dialog.Root>
    </main>
  );
}
