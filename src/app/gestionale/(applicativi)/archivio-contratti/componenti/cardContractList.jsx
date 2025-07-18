// import ButtonWhatsAppCliente from "./cardClienteBottoneWhatsApp"
'use client'

import ContractExportPDF from "./printContract";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faAddressCard, faLocationPin, faEnvelope, faSquareCaretRight, faCaretRight, faArrowAltCircleDown, faAnglesRight, faAnglesLeft, faCalendar, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';


const iconCodiceFiscale = <FontAwesomeIcon className="me-2 text-fuchsia-500" icon={faAddressCard} />
const iconEmail = <FontAwesomeIcon className="me-2 text-fuchsia-500" icon={faEnvelope} />
const iconCaretRight = <FontAwesomeIcon className="me-2 text-fuchsia-500" icon={faSquareCaretRight} />
const ICONAarrowRight = <FontAwesomeIcon className="text-brand-500 mx-1" icon={faAnglesRight} />
const ICONAarrowLeft = <FontAwesomeIcon className="text-brand-500 mx-1" icon={faAnglesLeft} />
const ICONAcalendar = <FontAwesomeIcon className="text-brand-500 mx-2 bg-neutral-100 p-1 rounded" icon={faCalendar} />
const ICONAmoney = <FontAwesomeIcon className="text-brand-500 mx-2 bg-neutral-100 p-1 rounded" icon={faMoneyCheckDollar} />
const ICONAuser = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faUser} />

export default function CardContrattoList (props) {

    const {
        citta,
        index,
        uuid,
        casco,
        clientePrimoConducente,
        completato,
        comuneDiConsegna,
        comuneDiRientro,
        dataEntrata,
        dataUscita,
        orarioUscita,
        orarioEntrata,
        provinciaDiConsegna, 
        provinciaDiRientro, 
        sconto,
        secondoConducente,
        tariffaGiornaliera,
        tariffaMensile,
        veicolo,
        timestamp,
        franchigia,

        marca,
        modello,
        targa,
        anno,
        colore,

        nome,
        cognome,
        luogoDiNascita,
        dataDiNascita,
        cittaResidenza,
        viaResidenza,
        civicoResidenza,
        numeroCartaIdentita,
        scadenzaCartaIdentita,
        numeroPatente,
        scadenzaPatente,
        enteRilascioPatente,
        codiceFiscale,

        nomeSecondoConducente,
        cognomeSecondoConducente,
        luogoDiNascitaSecondoConducente,
        dataDiNascitaSecondoConducente,
        cittaResidenzaSecondoConducente,
        viaResidenzaSecondoConducente,
        civicoResidenzaSecondoConducente,
        numeroCartaIdentitaSecondoConducente,
        scadenzaCartaIdentitaSecondoConducente,
        numeroPatenteSecondoConducente,
        scadenzaPatenteSecondoConducente,
        enteRilascioPatenteSecondoConducente,
        codiceFiscaleSecondoConducente,
    } = props


    return (
        <>
        <div className="flex flex-col p-5 h-fit w-full border border-neutral-800 bg-neutral-950 overflow-hidden rounded-xl">
            {/* DETTAGLI */}
            <div className="flex flex-col justify-center text-xs w-full text-neutral-400">
                <div className="flex flex-col gap-2">
                    {/* TARGA */}
                    <div className="border flex items-center justify-center border-brand-500 rounded-md text-neutral-300 px-3 py-1 w-fit">
                        <span className="text-sm uppercase flex items-center justify-center">{ICONAuser}{nome} {cognome}</span>
                    </div>
                    <div className="text-neutral-300 lg:w-fit flex justify-start items-center mt-1">
                        <h2 className="text-xs flex justify-center items-center">{ICONAarrowRight} OUT: {dataUscita} {ICONAcalendar} IN: {dataEntrata} {ICONAarrowLeft}</h2>
                    </div>
                    <hr className="border-[]0.5rem border-neutral-800 my-2" ></hr>
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
                    {/* ETICHETTE */}
                    <div className="flex flex-wrap gap-1 justify-start 2xl:justify-end w-full">
            
                        {/* Stato noleggio / manutenzione */}
                        {/* {(() => {
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
            
                        {/* Disponibilità Web */}
                        {/* {disponibileWeb === "true" ? (
                        <div className="h-[15px] px-2 border border-green-600 rounded-full text-[0.5rem] flex items-center justify-center text-green-500">
                            <span className="text-owerflow">ONLINE</span>
                        </div>
                        ) : (
                        <div className="h-[15px] px-2 border border-red-600 rounded-full text-[0.5rem] flex items-center justify-center text-red-400">
                            <span className="text-owerflow">OFFLINE</span>
                        </div>
                        )} */}
                    </div>        
                </div>            
            </div>
        </div>
        </>
    )
}    
