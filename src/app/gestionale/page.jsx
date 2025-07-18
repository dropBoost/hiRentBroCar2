import HomeGestionale from "./homeGestionale"
import { logoExtendedLight, companyName, logoExtendedFullLight } from "../cosetting"
import Image from "next/image"

export default function Gestionale () {
    return (
        <>
        <div className="grid grid-cols-12 grid-rows-12 h-screen w-screen p-5 justify-center items-center">
            <div className="col-span-12 row-span-1 col-start-1 row-start-1 h-[100%] bg-brand-500 p-5 flex lg:items-center lg:justify-start md:items-center md:justify-center items-center justify-center">
            <Image src={logoExtendedFullLight} width={150} height={150} alt={`logo-${companyName}`}/>
            </div>
          <div className="md:col-span-1 col-span-12 md:row-span-11 row-span-1 col-start-1 row-start-2 h-full bg-neutral-800 p-5 flex lg:items-end lg:justify-end md:items-start md:justify-center items-center justify-center">LEFT SIDEBAR</div>
          <div className="md:col-span-11 col-span-12 md:row-span-11 row-span-10 md:col-start-2 col-start-1 md:row-start-2 row-start-3 h-full bg-neutral-900"><HomeGestionale/></div>
        </div>
        </>
    )
}