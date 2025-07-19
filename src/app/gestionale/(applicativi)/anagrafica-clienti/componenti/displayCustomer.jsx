import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import CustomerListCard from './displayCustomerListCard'

export default function DisplayCustomer (props) {

    const onDisplayCustomer = props.onDisplayCustomer

    const [clienti, setClienti] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState ('')

  const handleSearchCustomer = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setSearch(val)
  };

    useEffect(() => {
    const fetchVeicoli = async () => {
      const { data, error } = await supabase
        .from('anagraficaClienti')
        .select('*')
        .or(`nome.ilike.%${search}%,cognome.ilike.%${search}%,codiceFiscale.ilike.%${search}%,telefono.ilike.%${search}%`)

      if (error) {
        console.error('Errore nel recupero dei veicoli:', error)
      } else {
        setClienti(data)
      }

      setLoading(false)
    }

    fetchVeicoli()
    }, [search])

  if (loading) return <p>Caricamento...</p>

    return (
        <>
        <div className={`${onDisplayCustomer === "on" ? "" : "hidden"}`}>
          <div className='flex flex-col justify-start items-center gap-2 w-full h-[70vh] overflow-auto'>
            <div className='w-full pe-4'>
                <input onChange={handleSearchCustomer} placeholder='cerca...' type="text" className='w-full h-8 rounded-lg bg-neutral-950 border border-brand-500 text-neutral-400 p-2 placeholder:text-xs'></input>
            </div>
            <div className={`w-full grid grid-cols-1 xl:grid-cols-2 h-[70vh] rounded-lg gap-5 pe-4 overflow-auto `}>

              {clienti.map((cliente, index) => (
                  <CustomerListCard key={index}
                  nome={cliente.nome}
                  cognome={cliente.cognome}
                  email={cliente.email}
                  telefono={cliente.telefono}
                  scadenzaPatente={cliente.scadenzaPatente}
              />
              ))}
            </div>
          </div>
        </div>
        </>
    )
}