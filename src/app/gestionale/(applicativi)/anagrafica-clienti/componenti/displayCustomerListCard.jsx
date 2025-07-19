import Image from "next/image"
import Link from "next/link";
import { whatsAppContactLink } from "@/app/cosetting";
import { emailContact } from "@/app/cosetting";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEnvelope, faMobile  } from '@fortawesome/free-solid-svg-icons';

const ICONmodifica = <FontAwesomeIcon icon={faPencil}/>
const ICONemail= <FontAwesomeIcon icon={faEnvelope} className="me-1 text-brand-500"/>
const ICONmobile = <FontAwesomeIcon icon={faMobile} className="me-1 text-brand-500"/>

export default function CustomerListCard(props) {
  const {
    nome,
    cognome,
    telefono,
    email,
    scadenzaPatente,
  } = props

  return (
    <div className="flex xl:flex-row flex-col border border-neutral-800 rounded-xl p-2">
      {/* DETTAGLI */}
      <div className="flex flex-col justify-center xl:px-4 px-2 text-xs w-full text-neutral-400">
        <div className="flex flex-col gap-2 2xl:flex-row 2xl:items-center 2xl:justify-between justify-start mb-2 ">
          {/* NOME */}
          <div className="border border-brand-500 rounded-md text-neutral-300 w-fit px-3 py-1">
            <h2 className="font-extrabold text-base">{nome} {cognome}</h2>
          </div>

          {/* ETICHETTE */}
          <div className="flex flex-wrap gap-1 justify-start 2xl:justify-end w-full">
            {/* Stato noleggio / manutenzione
            {(() => {
              if (disponibileNoleggio === "true" && manutezione === "false") {
                return (
                  <div className="w-[15px] h-[15px] bg-green-600 rounded-full">
                    <span className="text-owerflow"></span>
                  </div>
                )
              } else if (manutezione === "true") {
                return (
                  <div className="h-[15px] bg-yellow-500 rounded-full text-[0.5rem] font-extrabold text-neutral-950 px-2">
                    IN MANUTENZIONE
                  </div>
                )
              } else {
                return (
                  <div className="h-[15px] bg-red-600 rounded-full text-[0.5rem] font-extrabold text-neutral-950 px-2 max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
                    <span className="text-owerflow">NON DISPONIBILE</span>
                  </div>
                )
              }
            })()} */}
          </div>
        </div>

        {/* INFO */}
        <div className="mb-2 flex flex-col">
        <Link href={whatsAppContactLink} className="hover:border hover:border-brand-500 w-fit hover:px-2 hover:py-1 rounded-lg"><span>{ICONmobile}{telefono}</span></Link> 
        <Link href={`mailto:${emailContact}`} className="hover:border hover:border-brand-500 w-fit hover:px-2 hover:py-1 rounded-lg "><span>{ICONemail}{email}</span></Link>
        </div>
        <div className="flex xl:justify-end justify-start items-center">
          <button className="bg-brand-500 hover:bg-neutral-100 hover:text-brand-500 p-2 flex justify-center items-center rounded-full w-5 h-5 text-[0.6rem] ">{ICONmodifica}</button>
        </div>
      </div>
    </div>
  )
}
