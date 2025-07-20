'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser, faAddressCard, faEnvelope, faSquareCaretRight, faAnglesRight,
  faAnglesLeft, faCalendar, faMoneyCheckDollar, faDownload, faTrash
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'


const ICONAarrowRight = <FontAwesomeIcon className="text-neutral-300 me-2" icon={faAnglesRight} />
const ICONAarrowLeft = <FontAwesomeIcon className="text-red-500 ms-2" icon={faAnglesLeft} />


const ICONdownload = <FontAwesomeIcon icon={faDownload} className="me-1 text-neutral-100"/>
const ICONcestino = <FontAwesomeIcon icon={faTrash} className="me-1 text-red-500"/>

export default function CardContrattoListRow({ contratto }) {
  
  const {
    cliente,
    veicolo,
    dataUscita,
    dataEntrata,
    tariffaGiornaliera
  } = contratto

  const {
    nome = '', cognome = '', email = '', telefono = '', scadenzaPatente = ''
  } = cliente || {}

  const {
    targa = '', marca = '', modello = '', anno = '', colore = ''
  } = veicolo || {}

  return (
    <>
    <tr className="h-10">
      <td className="px-6 py-1 whitespace-nowrap text-xs text-neutral-100 bg-brand-500 uppercase font-bold">{nome} {cognome}</td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-neutral-100 bg-brand-500/50 uppercase font-bold">{targa} {marca} {modello} {anno} / {colore}</td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-center text-neutral-400">
       <span className="flex items-center">{ICONAarrowRight} {dataUscita}</span>
      </td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-center text-neutral-400">
        <span className="flex items-center">{dataEntrata} {ICONAarrowLeft}</span>
      </td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-center text-neutral-100 bg-brand-500/50 uppercase font-bold h-10">€ 300</td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-center text-neutral-400"><Link href={`#`}>{ICONdownload}</Link></td>
      <td className="px-6 py-1 whitespace-nowrap text-xs text-center text-neutral-400"><Link href={`#`}>{ICONcestino}</Link></td>
    </tr>
        </>
  )
}
