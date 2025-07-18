import MenuSidebar from "../components/menuSidebar";
import Image from "next/image";
import { logoExtendedFullLight, companyName } from "@/app/cosetting";


export default function LayoutApplicativi({ children }) {

  const dataOggi = new Date()

  return (
        <>
        <div className="grid grid-cols-12 grid-rows-12 h-screen w-screen p-5 justify-center items-center">
          <div className="col-span-12 row-span-1 col-start-1 row-start-1 h-[100%] bg-brand-500 p-5 flex lg:items-center lg:justify-between md:items-start md:justify-between items-center justify-between">
            <div><Image src={logoExtendedFullLight} width={100} height={100} quality={20} alt={`logo ${companyName}`}/></div>
            <div><span className="text-neutral-100 text-xs font-extrabold">{dataOggi.toLocaleDateString()}</span></div>
          </div>
          <div className="md:col-span-1 col-span-12 md:row-span-11 row-span-1 col-start-1 row-start-2 h-full bg-neutral-800 p-5 flex lg:items-end lg:justify-end md:items-start md:justify-center items-center justify-center"><MenuSidebar/></div>
          <div className="md:col-span-11 col-span-12 md:row-span-11 row-span-10 md:col-start-2 col-start-1 md:row-start-2 row-start-3 h-full bg-neutral-900">{children}</div>
        </div>
        </>
  );
}