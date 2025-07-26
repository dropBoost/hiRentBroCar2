import CarCardSell from './cardAutoVendita'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function DisplayCarSell () {

    const [veicoli, setVeicoli] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    const fetchVeicoli = async () => {
      const { data, error } = await supabase
        .from('veicoliVendita')
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
          <div className="flex w-full h-[70vh] overflow-y-auto p-2 gap-4">
            {veicoli.map((veicolo, index) => (
                <CarCardSell key={index}
                imgLink={veicolo.copertina}
                marca={veicolo.marca}
                modello={veicolo.modello}
                anno={veicolo.anno}
                targa={veicolo.targa}
                colore={veicolo.colore}
                carburante={veicolo.carburante}
                web={veicolo.disponibileWeb}
            />
            ))}
        </div>
        </>
    )
}