import tennisIcon from "@/public/tennis-logo1.png";
import { lusitana } from "@/app/ui/fonts";

import Image from "next/image";

export function AtpLogo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
      <Image
        src={tennisIcon}
        alt='tennis atp'
        className='h-12 w-12 mr-1'
        width={50}
        height={50}
      />
      <p className='text-[44px] text-gray-800'>Local ATP</p>
    </div>
  );
}
