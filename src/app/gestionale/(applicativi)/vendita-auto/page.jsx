'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRotateRight, faToggleOn, faToggleOff  } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UploadSellCar from './components/uploadSellCars';
import DisplayCarSell from './components/displayCarSell';

const iconaRicarica = <FontAwesomeIcon icon={faArrowRotateRight}/>
const ICONToggleOn = <FontAwesomeIcon icon={faToggleOn}/>
const ICONToggleOff = <FontAwesomeIcon icon={faToggleOff}/>

export default function GESTIONALEVenditaAuto () {

  const [onDisplayCar, SetOnDisplayCar] = useState("off")
  const [onDisplayUploadCar, SetOnDisplayUploadCar] = useState("on")

  function DisplayManagement () {

    if (onDisplayCar == "on") {
      SetOnDisplayCar("off")
      SetOnDisplayUploadCar("on")
    } else {
      SetOnDisplayCar("on")
      SetOnDisplayUploadCar("off")
    }
  }

    return (
        <>
        
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full md:gap-4 gap-1  justify-center items-center">
          <div className="lg:col-span-9 col-span-12 col-start-1 lg:row-span-1 row-span-1 row-start-1 h-full rounded-2xl flex lg:p-5 items-center justify-start">
            <button
            onClick={() => DisplayManagement()}
            className="flex items-center justify-center text-2xl ms-2"
            >
            {onDisplayUploadCar === "off" ?
            <span className='text-brand-500 flex items-center border rounded-2xl border-brand-500 px-3 py-1'>{ICONToggleOn} <font className="text-sm ms-2 font-bold" >Carica Veicoli Vendita</font></span> :
            <span className='text-neutral-100 flex items-center border rounded-2xl border-brand-500 px-3 py-1'>{ICONToggleOff} <font className="text-sm ms-2 font-bold" >Parco Veicoli Vendita</font></span>}
            </button>
          </div>
          <div className="lg:p-5 p-4 pe-5 justify-center lg:col-span-12 col-span-12 col-start-1 lg:row-span-11 row-span-11 row-start-2 h-full bg-neutral-800/50 rounded-2xl">
            <div className={`w-full lg:h-[70vh] md:h-[65vh] h-[60vh] overflow-auto ${onDisplayUploadCar ==="off" ? "" : "hidden"}`}>
              <UploadSellCar/>
            </div>
            <div className={`${onDisplayCar ==="off" ? "" : "hidden"}`}>
              <DisplayCarSell/>
            </div>
          </div>
        </div>
        </>
    )
}