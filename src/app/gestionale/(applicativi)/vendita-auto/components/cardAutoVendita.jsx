import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil  } from '@fortawesome/free-solid-svg-icons';

const iconMODIFICA = <FontAwesomeIcon icon={faPencil}/>

export default function CarCardSell(props) {
  const {
    imgLink,
    marca,
    modello,
    anno,
    targa,
    colore,
    carburante,
    web: disponibileWeb,
  } = props

  return (


  <div className="flex flex-col lg:flex-row border border-neutral-300 bg-white shadow-md rounded-xl overflow-hidden w-full h-fit p-4">
    
    {/* IMMAGINE */}
    <div className="relative w-full lg:w-[100px] h-[150px] lg:h-auto rounded-md overflow-hidden mb-3 lg:mb-0 lg:mr-4 shrink-0">
      <Image
        src={imgLink}
        alt="Veicolo"
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 100px"
        quality={100}
      />
    </div>

    {/* CONTENUTO */}
    <div className="flex flex-col justify-between flex-1 text-sm text-neutral-700 gap-2">
      
      {/* INTESTAZIONE */}
      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center">
        
        {/* TARGA */}
        <div className="bg-brand-500 text-white rounded-md px-3 py-1 font-semibold text-sm w-fit">
          {targa}
        </div>

        {/* ETICHETTA */}
        {disponibileWeb === "true" ? (
          <span className="text-green-600 border border-green-600 rounded-full px-2 py-[2px] text-[10px] font-medium">
            ONLINE
          </span>
        ) : (
          <span className="text-red-500 border border-red-500 rounded-full px-2 py-[2px] text-[10px] font-medium">
            OFFLINE
          </span>
        )}
      </div>

      {/* INFO VEICOLO */}
      <div className="text-xs text-neutral-500">
        <p><font className="font-bold uppercase">{marca} {modello}</font>  - {colore}</p>
        <p>{anno} - {carburante}</p>
      </div>

      {/* BOTTONE */}
      <div className="flex justify-end">
        <button className="bg-brand-500 hover:bg-white hover:text-brand-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full transition-colors border border-brand-500">
          {iconMODIFICA}
        </button>
      </div>
    </div>
  </div>


  )
}
