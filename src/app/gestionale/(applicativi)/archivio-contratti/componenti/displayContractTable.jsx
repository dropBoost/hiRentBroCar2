'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import CardContrattoListRow from './tableContractList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser, faAddressCard, faEnvelope, faSquareCaretRight, faAnglesRight,
  faAnglesLeft, faCalendar, faMoneyCheckDollar, faDownload, faTrash, faCar, faSackDollar
} from '@fortawesome/free-solid-svg-icons'

const ICONAuser = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faUser} />
const ICONAcar = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faCar} />
const ICONAcalendar = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faCalendar} />
const ICONAmoney = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faSackDollar} />

export default function DisplayContractTable(props) {

  const [contract, setContract] = useState([])
  const [loading, setLoading] = useState(true)
  const [clienti, setClienti] = useState([])
  const [veicoli, setVeicoli] = useState([])
  const [search, setSearch] = useState('')

  const onDisplayContractTable = props.onDisplayContractTable

  const handleSearchCustomer = (e) => {
    setSearch(e.target.value.trim().toLowerCase())
  }

  //FETCH CONTRATTI
  useEffect(() => {
    const fetchContratti = async () => {
      const { data, error } = await supabase
        .from('contrattiNoleggio')
        .select('*')

      if (error) {
        console.error('Errore nel recupero dei contratti:', error)
      } else {
        setContract(data)
      }

      setLoading(false)
    }

    fetchContratti()
  }, [])

  //FETCH CLIENTI
  useEffect(() => {
    const fetchClienti = async () => {
      const { data, error } = await supabase
        .from('anagraficaClienti')
        .select('*')

      if (error) {
        console.error('Errore nel recupero dei clienti:', error)
      } else {
        setClienti(data)
      }
    }

    fetchClienti()
  }, [])

  //FETCH VEICOLI
  useEffect(() => {
    const fetchVeicoli = async () => {
      const { data, error } = await supabase
        .from('veicoli')
        .select('*')

      if (error) {
        console.error('Errore nel recupero dei veicoli:', error)
      } else {
        setVeicoli(data)
      }
    }

    fetchVeicoli()
  }, [])

  //LOADER
  if (loading || clienti.length === 0) return <p>Caricamento...</p>

  //OGGETTO CON I DATI COMPLETI E FILTRO PER LA RICERCA
  const contrattiCompletati = contract
    .map((contratto) => {
      const cliente = clienti.find(c => c.UUID === contratto.clientePrimoConducente)
      const secondoConducente = clienti.find(c => c.UUID === contratto.secondoConducente)
      const veicolo = veicoli.find(v => v.UUID === contratto.veicolo)

      return {
        ...contratto,
        cliente,
        secondoConducente,
        veicolo
      }
    })
    .filter((contratto) => {
      if (!search) return true
      const nome = contratto.cliente?.nome?.toLowerCase() || ''
      const cognome = contratto.cliente?.cognome?.toLowerCase() || ''
      const targa = contratto.veicolo?.targa?.toLowerCase() || ''
      return nome.includes(search) || cognome.includes(search) || targa.includes(search)
    })

  return (
    <>
      <div className={`${onDisplayContractTable === 'on' ? '' : 'hidden'}`}>
        <div className='flex flex-col justify-start items-center gap-2 w-full h-[70vh] overflow-auto'>
          <div className='w-full'>
            <input
              onChange={handleSearchCustomer}
              value={search}
              placeholder='Cerca cliente...'
              type="text"
              className='w-full h-8 rounded-lg bg-neutral-950 border border-neutral-400 text-neutral-400 p-2 placeholder:text-xs focus:outline-none focus:border-brand-500'
            />
          </div>
          <div className={`w-full h-full gap-5 border border-neutral-800 rounded-lg overflow-auto`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-neutral-950">
            <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-neutral-500 uppercase tracking-wider truncate">
                {ICONAuser} Nominativo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-neutral-500 uppercase tracking-wider truncate">
                {ICONAcar} Veicolo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-neutral-500 uppercase tracking-wider truncate">
                {ICONAcalendar} Data Uscita
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-neutral-500 uppercase tracking-wider truncate">
                {ICONAcalendar} Data Entrata
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-extrabold text-neutral-500 uppercase tracking-wider truncate">
                {ICONAmoney} Valore
                </th>                 
                <th scope="col" className="px-6 py-3 text-center text-xs font-extrabold text-neutral-500 uppercase tracking-wider truncate">
                DOWNLOAD
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-extrabold text-neutral-500 uppercase tracking-wider truncate">
                ELIMINA
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
            {contrattiCompletati.map((contratto) => (
              <CardContrattoListRow key={contratto.UUID} contratto={contratto} />
            ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </>
  )
}
