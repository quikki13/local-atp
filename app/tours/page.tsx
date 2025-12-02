"use client";

import { useState, useEffect } from "react";
import { Button, Table, Dialog } from "@radix-ui/themes";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { DialogContent } from "./dialog";

import { tableHead, tableBody, skeletonBody } from "./helpers";

import { URLS } from "@/consts/common";

import { ITourWithSeason } from "./types";

export default function Page() {
  const initdata = { tours: [], seasons: [] };
  const [data, setData] = useState<ITourWithSeason>(initdata);

  const getData = () =>
    fetch(`${URLS.tours}${URLS.api}`).then(async (response) => {
      // Проверяем успешность ответа

      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
      }
      const data: ITourWithSeason = await response.json();
      setData(data);
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
            {tableHead(!data.tours.length)}
            <Table.Body>
              {!data.tours.length ? skeletonBody() : tableBody(data.tours, setData)}
            </Table.Body>
          </Table.Root>
        </div>
        <DialogContent seasons={data.seasons} setToursData={setData} />
      </Dialog.Root>
    </main>
  );
}
