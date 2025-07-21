import Image from "next/image"
import Link from "next/link";
import { whatsAppContactLink } from "@/app/cosetting";
import { emailContact } from "@/app/cosetting";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEnvelope, faMobile, faDownload, faTrash  } from '@fortawesome/free-solid-svg-icons';

const ICONmodifica = <FontAwesomeIcon icon={faPencil}/>
const ICONemail= <FontAwesomeIcon icon={faEnvelope} className="me-1 text-brand-500"/>
const ICONmobile = <FontAwesomeIcon icon={faMobile} className="me-1 text-brand-500"/>
const ICONdownload = <FontAwesomeIcon icon={faDownload} className="me-1 text-neutral-100"/>
const ICONcestino = <FontAwesomeIcon icon={faTrash} className="me-1 text-red-500"/>

export default function CustomerListCard(props) {

  const {
    nome,
    cognome,
    telefono,
    email,
    scadenzaPatente,
  } = props

  const oggi = new Date().toISOString().split('T')[0];

  console.log(oggi)

  return (
    <>
    <tr className="h-10">
      <td className="px-6 py-1 whitespace-nowrap text-xs text-neutral-100 bg-brand-500 uppercase font-bold">{nome}</td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-neutral-100 bg-brand-500/50 uppercase font-bold">{cognome}</td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-neutral-400"><Link href={`mailto:${email}`}>{email}</Link></td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-neutral-400"><Link href={`https://wa.me/39${telefono}`}>{telefono}</Link></td>
      {scadenzaPatente >= oggi ? <td className="px-6 py-1 whitespace-nowrap text-xs text-neutral-400">{scadenzaPatente}</td> : <td className="px-6 py-1 whitespace-nowrap text-xs bg-red-600 text-neutral-400">{scadenzaPatente}</td> }
      <td className="px-6 py-1 whitespace-nowrap text-xs text-center text-neutral-400"><Link href={`#`}>{ICONdownload}</Link></td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-center text-neutral-400"><Link href={`#`}>{ICONcestino}</Link></td>
    </tr>
    </>
  )
}
