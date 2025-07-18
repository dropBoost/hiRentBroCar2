import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import CustomerListCard from './displayCustomerListCard'

export default function DisplayCustomer () {

    const [clienti, setClienti] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const fetchVeicoli = async () => {
      const { data, error } = await supabase
        .from('anagraficaClienti')
        .select('*')

      if (error) {
        console.error('Errore nel recupero dei veicoli:', error)
      } else {
        setClienti(data)
      }

      setLoading(false)
    }

    fetchVeicoli()
    }, [])

  if (loading) return <p>Caricamento...</p>

    return (
        <>
        {clienti.map((cliente, index) => (
            <CustomerListCard key={index}
            nome={cliente.nome}
            cognome={cliente.cognome}
            email={cliente.email}
            telefono={cliente.telefono}
            scadenzaPatente={cliente.scadenzaPatente}
        />
        ))}
        </>
    )
}