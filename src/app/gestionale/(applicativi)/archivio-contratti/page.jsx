'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight, faToggleOn, faToggleOff  } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import CardContratto from './componenti/cardContractList';
import DisplayContract from './componenti/displayContract';

const iconaRicarica = <FontAwesomeIcon icon={faArrowRotateRight}/>
const ICONToggleOn = <FontAwesomeIcon icon={faToggleOn}/>
const ICONToggleOff = <FontAwesomeIcon icon={faToggleOff}/>

export default function GESTIONALEarchivioContratti () {

  const [onDisplayContract, setOnDisplayContract] = useState("off")
  const [onDisplayUploadContract, setOnDisplayUploadContract] = useState("on")

  function DisplayManagement () {

    if (onDisplayContract == "on") {
      setOnDisplayContract("off")
      setOnDisplayContract("on")
    } else {
      setOnDisplayContract("on")
      setOnDisplayUploadContract("off")
    }
  }

  //MANCA Laltro componente per questo se clicchi non torna indietro

    return (
        <>
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full md:gap-4 gap-1  justify-center items-center">
          <div className="lg:col-span-9 col-span-12 col-start-1 lg:row-span-1 row-span-1 row-start-1 h-full rounded-2xl flex items-center justify-start">
            <button
            onClick={() => DisplayManagement()}
            className="flex items-center justify-center text-2xl ms-2"
            >
            {onDisplayUploadContract === "off" ? <span className='text-brand-500 flex items-center border rounded-2xl border-brand-500 px-3 py-1'>{ICONToggleOff} <font className="text-sm ms-2 font-bold" >Carica Veicoli</font></span> : <span className='text-neutral-100 flex items-center border rounded-2xl border-brand-500 px-3 py-1'>{ICONToggleOn} <font className="text-sm ms-2 font-bold" >Parco Veicoli</font></span>}
            </button>
          </div>
          <div className="lg:p-5 p-4 pe-5 justify-center lg:col-span-12 col-span-12 col-start-1 lg:row-span-11 row-span-11 row-start-2 h-full bg-neutral-800/50 rounded-2xl">
            <DisplayContract onDisplayContract={onDisplayContract}/>
          </div>
        </div>
        </>
    )
  }     