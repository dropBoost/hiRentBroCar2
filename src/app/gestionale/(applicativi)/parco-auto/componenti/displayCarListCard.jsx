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
    <div className="2xl:h-[140px] xl:h-[160px] sm:h-[220px] h-[230px] flex xl:flex-row flex-col w-full border border-neutral-800 overflow-hidden rounded-xl p-2">
      {/* IMMAGINE */}
      <div className="relative xl:w-[100px] w-full xl:h-full h-[60px] shrink-0 rounded-lg overflow-hidden mb-2 xl:mb-0">
        <Image
          src={imgLink}
          alt="Veicolo"
          fill
          className="object-cover object-center"
          sizes="100px"
          quality={100}
        />
      </div>

      {/* DETTAGLI */}
      <div className="flex flex-col justify-center xl:px-4 px-2 text-xs w-full text-neutral-400">
        <div className="flex flex-col gap-2 2xl:flex-row 2xl:items-center 2xl:justify-between justify-start mb-2 ">


          {/* TARGA */}
          <div className="border border-brand-500 rounded-md text-neutral-300 lg:w-fit px-3 py-1">
            <h2 className="font-extrabold text-base">{targa}</h2>
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

        {/* INFO */}
        <div className="mb-2">
        <h3>{marca} {modello} - {colore}</h3>
        <h3>{anno} - {carburante}</h3>
        </div>
        <div className="flex xl:justify-end justify-start items-center">
          <button className="bg-brand-500 hover:bg-neutral-100 hover:text-brand-500 p-2 flex justify-center items-center rounded-full w-5 h-5 text-[0.6rem] ">{iconMODIFICA}</button>
        </div>
      </div>
    </div>
  )
}
