'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import CardContrattoListRow from './tableContractList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser, faCar, faCalendar, faSackDollar
} from '@fortawesome/free-solid-svg-icons'

const ICONAuser = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faUser} />
const ICONAcar = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faCar} />
const ICONAcalendar = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faCalendar} />
const ICONAmoney = <FontAwesomeIcon className="me-2 text-neutral-400" icon={faSackDollar} />

export default function DisplayContractTable(props) {
  const oggi = new Date().toISOString().split('T')[0]

  const [contract, setContract] = useState([])
  const [loading, setLoading] = useState(true)
  const [clienti, setClienti] = useState([])
  const [veicoli, setVeicoli] = useState([])
  const [search, setSearch] = useState('')
  const [attivi, setAttivi] = useState(false)
  const [completati, setCompletati] = useState(false)
  const [inEntrata, setInEntrata] = useState(false)
  const [inUscita, setInUscita] = useState(false)

  const onDisplayContractTable = props.onDisplayContractTable

  const handleSearchCustomer = (e) => {
    setSearch(e.target.value.trim().toLowerCase())
  }

  const fetchData = async () => {
    const [contrattiRes, clientiRes, veicoliRes] = await Promise.all([
      supabase.from('contrattiNoleggio').select('*'),
      supabase.from('anagraficaClienti').select('*'),
      supabase.from('veicoli').select('*')
    ])
    if (!contrattiRes.error) setContract(contrattiRes.data)
    if (!clientiRes.error) setClienti(clientiRes.data)
    if (!veicoliRes.error) setVeicoli(veicoliRes.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading || clienti.length === 0) return <p>Caricamento...</p>

  console.log("contratti",contract)

  const contrattiFiltrati = contract
    .map((contratto) => {
      const cliente = clienti.find(c => c.UUID === contratto.clientePrimoConducente)
      const secondoConducente = clienti.find(c => c.UUID === contratto.secondoConducente)
      const veicolo = veicoli.find(v => v.UUID === contratto.veicolo)
      return { ...contratto, cliente, secondoConducente, veicolo }
    })
    .filter((contratto) => {
      const nome = contratto.cliente?.nome?.toLowerCase() || ''
      const cognome = contratto.cliente?.cognome?.toLowerCase() || ''
      const targa = contratto.veicolo?.targa?.toLowerCase() || ''
      const matchSearch = nome.includes(search) || cognome.includes(search) || targa.includes(search)

      const dataUscita = contratto.dataUscita
      const dataEntrata = contratto.dataEntrata

      const isAttivo = dataUscita <= oggi && dataEntrata >= oggi
      const isCompletato = dataEntrata < oggi
      const isInEntrata = dataEntrata === oggi
      const isInUscita = dataUscita === oggi

      const matchCheckbox =
        (!attivi || isAttivo) &&
        (!completati || isCompletato) &&
        (!inEntrata || isInEntrata) &&
        (!inUscita || isInUscita)

      return matchSearch && matchCheckbox
    })

  return (
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

          <div className='w-full flex flex-row gap-2'>
            <Checkbox label="attivi" state={attivi} setState={setAttivi} color="text-green-600" accent={`accent-green-600`} />
            <Checkbox label="completati" state={completati} setState={setCompletati} color="text-red-600" accent={`accent-red-600`}/>
            <Checkbox label="in entrata" state={inEntrata} setState={setInEntrata} color="text-orange-400" accent={`accent-orange-400`}/>
            <Checkbox label="in uscita" state={inUscita} setState={setInUscita} color="text-neutral-400" accent={`accent-neutral-400`}/>
          </div>
        </div>

        <div className='w-full h-full gap-5 border border-neutral-800 rounded-lg overflow-auto'>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-neutral-950">
              <tr>
                <Th icon={ICONAuser} label="Nominativo" />
                <Th icon={ICONAcar} label="Veicolo" />
                <Th icon={ICONAcalendar} label="Data Uscita" />
                <Th icon={ICONAcalendar} label="Data Entrata" />
                <Th icon={ICONAmoney} label="Valore" center />
                <Th label="Download" center />
                <Th label="Elimina" center />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {contrattiFiltrati.map((contratto) => (
                <CardContrattoListRow key={contratto.UUID} contratto={contratto} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Checkbox({ label, state, setState, color, accent }) {
  return (
    <div className='flex items-center mt-2 border border-brand-500 py-1 px-2 w-fit rounded-lg'>
      <input
        type="checkbox"
        checked={state}
        onChange={() => setState(!state)}
        className={`w-3 h-3 me-2 text-brand-500 ${accent}`}
      />
      <label className={`font-bold uppercase text-[0.5rem] ${color}`}>
        {label}
      </label>
    </div>
  )
}

function Th({ icon, label, center = false }) {
  return (
    <th scope="col" className={`px-6 py-3 text-xs font-extrabold text-neutral-500 uppercase tracking-wider truncate ${center ? 'text-center' : 'text-left'}`}>
      {icon} {label}
    </th>
  )
}
