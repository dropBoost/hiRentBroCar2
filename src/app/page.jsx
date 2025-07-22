import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { socialLink, logoExtendedDark } from "./cosetting"

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
    </>
  );
}
