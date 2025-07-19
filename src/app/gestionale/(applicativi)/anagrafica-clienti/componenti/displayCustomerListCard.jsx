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
    <>
    <tr className="h-10">
      <td className="px-6 py-1 whitespace-nowrap text-xs text-neutral-100 bg-brand-500 uppercase font-bold">{nome}</td>
      <td className="px-6 py-1 whitespace-nowrap text-sm text-neutral-400">{cognome}</td>
      <td className="px-6 py-1 whitespace-nowrap text-sm text-neutral-400">{email}</td>
      <td className="px-6 py-1 whitespace-nowrap text-sm text-neutral-400">{telefono}</td>
      <td className="px-6 py-1 whitespace-nowrap text-sm text-neutral-400">{scadenzaPatente}</td>
    </tr>
    </>


    //       {/* ETICHETTE */}
    //       <div className="flex flex-wrap gap-1 justify-start 2xl:justify-end w-full">
    //         {/* Stato noleggio / manutenzione
    //         {(() => {
    //           if (disponibileNoleggio === "true" && manutezione === "false") {
    //             return (
    //               <div className="w-[15px] h-[15px] bg-green-600 rounded-full">
    //                 <span className="text-owerflow"></span>
    //               </div>
    //             )
    //           } else if (manutezione === "true") {
    //             return (
    //               <div className="h-[15px] bg-yellow-500 rounded-full text-[0.5rem] font-extrabold text-neutral-950 px-2">
    //                 IN MANUTENZIONE
    //               </div>
    //             )
    //           } else {
    //             return (
    //               <div className="h-[15px] bg-red-600 rounded-full text-[0.5rem] font-extrabold text-neutral-950 px-2 max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
    //                 <span className="text-owerflow">NON DISPONIBILE</span>
    //               </div>
    //             )
    //           }
    //         })()} */}
    //       </div>
    //     </div>

    //     
    //   </div>
    // </div>
  )
}
