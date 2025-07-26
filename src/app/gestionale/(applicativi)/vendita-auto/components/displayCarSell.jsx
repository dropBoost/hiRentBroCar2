import CarListCard from "./displayCarListCard"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DisplayCarSell () {

    const [veicoli, setVeicoli] = useState([])
    const [loading, setLoading] = useState(true)

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

      setLoading(false)
    }

    fetchVeicoli()
    }, [])

  if (loading) return <p>Caricamento...</p>

    return (
        <>
        {veicoli.map((veicolo, index) => (
            <CarListCard key={index}
            imgLink={veicolo.immagine}
            marca={veicolo.marca}
            modello={veicolo.modello}
            anno={veicolo.anno}
            targa={veicolo.targa}
            colore={veicolo.colore}
            carburante={veicolo.carburante}
            noleggio={veicolo.disponibileNoleggio}
            web={veicolo.disponibileWeb}
            manutenzione={veicolo.inManutenzione}
        />
        ))}
        </>
    )
}