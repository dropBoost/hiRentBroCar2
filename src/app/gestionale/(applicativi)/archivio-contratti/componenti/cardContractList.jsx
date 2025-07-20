'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser, faAddressCard, faEnvelope, faSquareCaretRight, faAnglesRight,
  faAnglesLeft, faCalendar, faMoneyCheckDollar
} from '@fortawesome/free-solid-svg-icons'

const ICONAuser = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faUser} />
const ICONAarrowRight = <FontAwesomeIcon className="text-brand-500 mx-1" icon={faAnglesRight} />
const ICONAarrowLeft = <FontAwesomeIcon className="text-brand-500 mx-1" icon={faAnglesLeft} />
const ICONAcalendar = <FontAwesomeIcon className="text-brand-500 mx-2 bg-neutral-100 p-1 rounded" icon={faCalendar} />
const ICONAmoney = <FontAwesomeIcon className="text-brand-500 mx-2 bg-neutral-100 p-1 rounded" icon={faMoneyCheckDollar} />

export default function CardContrattoList({ contratto }) {
  
  const {
    cliente,
    veicolo,
    dataUscita,
    dataEntrata,
    tariffaGiornaliera
  } = contratto

  const {
    nome = '', cognome = ''
  } = cliente || {}

  const {
    targa = '', marca = '', modello = '', anno = '', colore = ''
  } = veicolo || {}

  return (
    <div className="flex flex-col p-5 h-fit w-full border border-neutral-800 bg-neutral-950 overflow-hidden rounded-xl">
      <div className="flex flex-col justify-center text-xs w-full text-neutral-400">
        <div className="flex flex-col gap-2">
          <div className="border flex items-center justify-center border-brand-500 rounded-md text-neutral-300 px-3 py-1 w-fit">
            <span className="text-sm uppercase flex items-center justify-center">{ICONAuser}{nome} {cognome}</span>
          </div>
          <div className="text-neutral-300 lg:w-fit flex justify-start items-center mt-1">
            <h2 className="text-xs flex justify-center items-center">
              {ICONAarrowRight} OUT: {dataUscita} {ICONAcalendar} IN: {dataEntrata} {ICONAarrowLeft}
            </h2>
          </div>
          <hr className="border border-neutral-800 my-2" />
          <div className="text-neutral-300 flex flex-row justify-between sm:justify-start items-center gap-2">
            <h2 className="text-xs flex items-center">{ICONAmoney}</h2>
            <h2 className="text-xs flex items-center border border-brand-500 py-1 px-3 rounded">€{tariffaGiornaliera}</h2>
            <h2 className="text-xs flex items-center border border-brand-500 py-1 px-3 rounded">6/gg</h2>
            <h2 className="text-xs flex items-center border border-brand-500 py-1 px-3 rounded">50%</h2>
            <h2 className="text-xs flex items-center bg-brand-500 py-1 px-3 rounded">€ 300</h2>
          </div>
          <div className="border border-brand-500 p-2 rounded-lg mt-2">
            <div className="text-neutral-300 lg:w-fit">
              <h2 className="text-xs"> {targa}</h2>
            </div>
            <div className="text-neutral-300 lg:w-fit">
              <h2 className="text-xs">{marca} {modello} {anno} - {colore}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
