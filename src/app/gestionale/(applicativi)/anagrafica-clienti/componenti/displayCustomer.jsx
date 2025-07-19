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
            <div className='w-full '>
                <input onChange={handleSearchCustomer} placeholder='cerca...' type="text" className='w-full h-8 rounded-lg bg-neutral-950 border border-brand-500 text-neutral-400 p-2 placeholder:text-xs'></input>
            </div>
            <div className={`w-full h-full gap-5 border border-neutral-800 rounded-lg overflow-auto`}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-neutral-950">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
                      Cognome
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
                      Telefono
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
                      SCADENZA PATENTE
                    </th>                    
                    <th scope="col" className="px-6 py-3 text-center text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
                      SC
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-extrabold text-neutral-500 uppercase tracking-wider">
                      ELIMINA
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-700">
                  {clienti.map((cliente, index) => (
                      <CustomerListCard key={index}
                      nome={cliente.nome}
                      cognome={cliente.cognome}
                      email={cliente.email}
                      telefono={cliente.telefono}
                      scadenzaPatente={cliente.scadenzaPatente}
                  />
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
        </>
    )
}