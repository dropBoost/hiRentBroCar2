import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil  } from '@fortawesome/free-solid-svg-icons';

const iconMODIFICA = <FontAwesomeIcon icon={faPencil}/>

export default function CarListCard(props) {
  const {
    imgLink,
    marca,
    modello,
    anno,
    targa,
    colore,
    carburante,
    noleggio: disponibileNoleggio,
    web: disponibileWeb,
    manutenzione: manutezione,
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

          {/* ETICHETTE */}
          <div className="flex flex-wrap gap-1 justify-start 2xl:justify-end w-full">

            {/* Stato noleggio / manutenzione */}
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
            })()}

            {/* Disponibilità Web */}
            {disponibileWeb === "true" ? (
              <div className="h-[15px] px-2 border border-green-600 rounded-full text-[0.5rem] flex items-center justify-center text-green-500">
                <span className="text-owerflow">ONLINE</span>
              </div>
            ) : (
              <div className="h-[15px] px-2 border border-red-600 rounded-full text-[0.5rem] flex items-center justify-center text-red-400">
                <span className="text-owerflow">OFFLINE</span>
              </div>
            )}


          </div>
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
