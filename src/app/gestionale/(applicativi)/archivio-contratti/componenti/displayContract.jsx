'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import CardContrattoList from './cardContractList'

export default function DisplayContract(props) {

  const [contract, setContract] = useState([])
  const [loading, setLoading] = useState(true)
  const [clienti, setClienti] = useState([])
  const [veicoli, setVeicoli] = useState([])
  const [search, setSearch] = useState('')

  const onDisplayContract = props.onDisplayContract

  const handleSearchCustomer = (e) => {
    setSearch(e.target.value.toLowerCase())
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
      <div className={`${onDisplayContract === 'on' ? '' : 'hidden'}`}>
        <div className='flex flex-col justify-start items-center gap-2 w-full h-[70vh] overflow-auto'>
          <div className='w-full'>
            <input
              onChange={handleSearchCustomer}
              placeholder='Cerca cliente...'
              type="text"
              className='w-full h-8 rounded-lg bg-neutral-950 border border-brand-500 text-neutral-400 p-2 placeholder:text-xs'
            />
          </div>
          {contrattiCompletati.map((contratto) => (
            <CardContrattoList key={contratto.UUID} contratto={contratto} />
          ))}
        </div>
      </div>
    </>
  )
}
