import { TournirTable } from "@/components/tournirTable";
import { getSeasonsTable } from "@/app/(home)/api";

export default async function Home() {
  const { seasonstable } = await getSeasonsTable();

  return (
    <main className='flex min-h-screen flex-col mt-4'>
      <div className='flex flex-col gap-y-2 items-start shrink-0 bg-blue-50 rounded-lg p-4'>
        <h3 className='text-xl md:text-2xl'>
          Как работать с <span className='font-bold'>Local atp</span>
        </h3>

        <ul className='bg-blue-100 w-full rounded-lg p-2'>
          <li>1. Добавьте новый сезон/год, если стартовал новый сезон (season)</li>
          <li>2. Добавьте игровой день (tour)</li>
          <li>3. Добавьте новых игроков, если такие были (player)</li>
          <li>4. Добавьте матчи. Не забудьте указать игроков, сезон, тур и счет</li>
          <li>5. Enjoy</li>
        </ul>
      </div>

      <div className="flex justify-center w-1/2 mt-8 sm:mt-4">
        <TournirTable data={seasonstable} title="Season Table" loading={!seasonstable.length} />
      </div>
    </main>
  );
}
