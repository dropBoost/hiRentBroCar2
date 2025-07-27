'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCaretRight, faGasPump, faGauge, faRoad  } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabaseClient'
import { socialLink, logoExtendedDark, logoExtendedFullLight, logoLight, logoFullLight } from "@/app/cosetting"

const ICONchilometri = <FontAwesomeIcon icon={faGauge} className="me-1 text-brand-500"/>
const ICONcalendario = <FontAwesomeIcon icon={faCalendar} className="me-1 text-brand-500"/>
const ICONcarburante = <FontAwesomeIcon icon={faGasPump} className="me-1 text-brand-500"/>
const ICONfrecciaDestra = <FontAwesomeIcon icon={faCaretRight} className="me-1 text-brand-500"/>

export default function PAGEhomepage () {

    const [veicoliVendita, setVeicoliVendita] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const fetchVeicoli = async () => {
        const { data, error } = await supabase
        .from('veicoliVendita')
        .select('*')

        if (error) {
        console.error('Errore nel recupero dei veicoli:', error)
        } else {
        setVeicoliVendita(data)
        }

        setLoading(false)
    }

    fetchVeicoli()
    }, [])

    if (loading) return <p>Caricamento...</p>
    console.log("test",veicoliVendita)


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
    <div className="w-full flex justify-center items-center">
      <div className="flex xl:flex-row flex-col justify-center items-center w-[1400px] xl:py-10 py-7 xl:px-0 px-7 h-fit gap-5">
        <div className="flex flex-col justify-start items-start border h-full p-10 gap-10" id="servizio1">
          <h1 className="bg-neutral-300 px-5 py-2 rounded-xl uppercase text-neutral-900 text-sm font-bold">Servizi di Vendita</h1>
          <p>Da anni ci occupiamo della vendita di auto, moto e scooter nuovo e usato. I nostri veicoli sono attentamente selezionati e coperti sempre da garanzia su meccanica ed elettronica.</p>
          <button className="bg-brand-500 text-sm px-4 py-2 text-neutral-100 hover:bg-neutral-100 hover:text-brand-500" href={'#'}>SCOPRI IL PARCO AUTO</button>
        </div>
        <div className="flex flex-col justify-start items-start border h-full p-10 gap-10" id="servizio1">
          <h1 className="bg-neutral-300 px-5 py-2 rounded-xl uppercase text-neutral-900 text-sm font-bold">Garanzia OPTEVEN</h1>
          <p>Le nostre auto sono tutte coperte dall’ Estensione di Garanzia OPTEVEN.
          L’Estensione di Garanzia consente di prolungare la garanzia fornita dalla casa costruttrice. Copre i costi di riparazione in caso di guasti meccanici, elettronici o elettrici per veicoli nuovi o usati.
          </p>
          <button className="bg-brand-500 text-sm px-4 py-2 text-neutral-100 hover:bg-neutral-100 hover:text-brand-500" href={'#'}>LEGGI I DETTAGLI DELLA POLIZZA</button>
        </div>
        <div className="flex flex-col justify-start items-start border h-full p-10 gap-10" id="servizio1">
          <h1 className="bg-neutral-300 px-5 py-2 rounded-xl uppercase text-neutral-900 text-sm font-bold">Finanziamenti in sede</h1>
          <p>Realizza ora il tuo sogno direttamente dalla nostra concessionaria. Finanzia la tua auto attraverso i nostri servizi di dilazione del pagamento.</p>
          <button className="bg-brand-500 text-sm px-4 py-2 text-neutral-100 hover:bg-neutral-100 hover:text-brand-500" href={'#'}>CLICCA QUI</button>
        </div>
      </div>
    </div>
    <div className="flex justify-center items-center bg-neutral-400 h-20">
        <div className="w-[1400px] ps-5 lg:p-0">
          <h3 className="text-neutral-100 font-bold">AUTO IN VENDITA</h3>
        </div>
    </div>
    <div className="w-full flex justify-center items-center bg-brand-500">
      <div className="grid lg:grid-cols-5 grid-cols-2 justify-center items-center w-[1400px] xl:py-5 xl:px-5 p-4 h-fit gap-5 bg-neutral-100">
        {veicoliVendita.map((veicoloVendita, index) => (
        <div className="w-full bg-neutral-200 h-full p-3 rounded-md flex flex-col justify-between" key={index}>
            <div>
                <Image src={veicoloVendita.copertina} width={500} height={100} quality={30} />
                <h3 className="uppercase text-sm text-neutral-600 font-bold mt-2">
                {veicoloVendita.titoloAnnuncio}
                </h3>
            </div>
            <div className="flex flex-col gap-y-2 mt-2">
                <hr className="border-brand-500" />
                <div className="flex flex-row gap-2">
                <span className="text-xs">{ICONfrecciaDestra} {veicoloVendita.cilindrata}cm³</span>
                <span className="text-xs">{ICONfrecciaDestra} {veicoloVendita.cavalli}cv</span>
                </div>
                <div className="flex xl:flex-row flex-col gap-2">
                <span className="text-xs">{ICONcarburante} {veicoloVendita.carburante}</span>
                <span className="text-xs">{ICONchilometri} {veicoloVendita.km}km</span>
                <span className="text-xs">{ICONcalendario} {veicoloVendita.anno}</span>
                </div>
                <div>
                <Link href={"#"} className="bg-brand-500 text-neutral-100 hover:bg-neutral-500 px-2 py-1 text-xs font-bold rounded-sm">
                    <span>SCOPRI DI PIÙ</span>
                </Link>
                </div>
            </div>
        </div>
        ))}
      </div>
    </div>
        </>
    )
}