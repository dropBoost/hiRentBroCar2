import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { socialLink, logoExtendedDark, logoExtendedFullLight, logoLight, logoFullLight } from "./cosetting"

export default function Home() {
  return (
    <>
    <div className="flex flex-row items-center justify-center gap-5 bg-brand-500 h-10  py-6">
      {socialLink.filter(social => social.attivoWeb == "true").map((social, index) => (
        <Link key={index} href={social.link} className="text-md uppercase h-4 w-4" >
          <span className="text-neutral-100">{social.icon}</span>
        </Link>
      ))}
    </div>
    <div className="flex flex-row items-center justify-between gap-5 bg-neutral-50 h-12  py-12">
      <div className="px-5 py-2">
        <Image src={logoExtendedDark} height={200} width={200}></Image>
      </div>
      <div className="px-5 py-2">
        MENU
      </div>
    </div>
    <div className="flex flex-col justify-center items-center bg-[url(/herobanner.jpeg)] h-[700px] lg:h-[500px] w-full bg-cover bg-center">
      <div className="flex flex-col justify-start gap-5">
        <div className="flex flex-col justify-start">
          <h1 className="bg-neutral-100 text-xl px-5 py-4 font-bold text-center">NOLEGGIO E VENDITA AUTO</h1>
          <p className="bg-brand-500 px-5 py-4 text-neutral-100 text-center w-fit">Lorem ipsum dolor sit amet.</p>
        </div>
        <div className="flex flex-row justify-start">
          <button className="bg-brand-500/50 border px-4 py-2 font-bold text-neutral-100 hover:bg-brand-500" src="#">NOLEGGIO</button>
          <button className="bg-neutral-100/50 border px-4 py-2 font-bold text-brand-500 hover:bg-neutral-100" src="#">VENDITA</button>
        </div>
      </div>
    </div>
    <div className="bg-brand-500 px-20 py-20">
      <Image src={logoExtendedFullLight} width={150} height={50}/>
      <p className="text-neutral-100 my-5">
        Il gruppo nasce dalla grande passione automobilistica dei fratelli Buonincontri, storici nel settore automobilistico.
        Le ragioni del nostro successo vanno ricercate nella serietà e nella professionalità cercando di offrire sempre ai nostri clienti un accurato servizio di vendita e assistenza.
      </p>
    </div>
    <div className="flex justify-center items-center bg-neutral-900 h-20">
        <div className="w-[1400px] ps-5 lg:p-0">
          <h3 className="text-neutral-100 font-bold">I NOSTRI SERVIZI</h3>
        </div>
    </div>
    <div className="w-full">

    </div>
    </>
  );
}
