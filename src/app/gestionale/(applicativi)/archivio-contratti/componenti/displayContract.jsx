import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import CardContrattoList from './cardContractList'


export default function DisplayContract(props) {
  const [contract, setContract] = useState([])
  const [loading, setLoading] = useState(true)
  const [clienti, setClienti] = useState([])
  const [clientiFiltrati, setClientiFiltrati] = useState([])
  const [veicoli, setVeicoli] = useState([])
  const [search, setSearch] = useState ('')

  const handleSearchCustomer = (e) => {

    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    const fetchClienti = async () => {
      const { data, error } = await supabase
        .from('anagraficaClienti')
        .select('*')
        .or(`nome.ilike.%${val}%,cognome.ilike.%${val}%,codiceFiscale.ilike.%${val}%,telefono.ilike.%${val}%`)
      if (error) {
        console.error('Errore nel recupero dei clienti:', error)
      } else {
        setClientiFiltrati(data)
      }
    }

    fetchClienti()

    const fetchContratti = async () => {
      const { data, error } = await supabase
        .from('contrattiNoleggio')
        .select('*')
        .eq
      if (error) {
        console.error('Errore nel recupero dei contratti:', error)
      } else {
        setContract(data)
      }

      setLoading(false)
    }

    fetchContratti()

  };

  console.log(clientiFiltrati)


  const onDisplayContract = props.onDisplayContract

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

  useEffect(() => {
    const fetchClienti = async () => {
      const { data, error } = await supabase
        .from('anagraficaClienti')
        .select('*')
        // .or(`nome.ilike.%${search}%,cognome.ilike.%${search}%,codiceFiscale.ilike.%${search}%,telefono.ilike.%${search}%`)
      if (error) {
        console.error('Errore nel recupero dei clienti:', error)
      } else {
        setClienti(data)
      }
    }

    fetchClienti()
  }, [search])

  useEffect(() => {
    const fetchVeicoli = async () => {
      const { data, error } = await supabase
        .from('veicoli')
        .select('*')

      if (error) {
        console.error('Errore nel recupero dei clienti:', error)
      } else {
        setVeicoli(data)
      }
    }

    fetchVeicoli()
  }, [])


  if (loading || clienti.length === 0) return <p>Caricamento...</p>

  return (
    <>
    <div className={`${onDisplayContract === "on" ? "" : "hidden"}`}>
      <div className='flex flex-col justify-start items-center gap-2 w-full h-[70vh] overflow-auto'>
          <div className='w-full '>
            <input onChange={handleSearchCustomer} placeholder='cerca...' type="text" className='w-full h-8 rounded-lg bg-neutral-950 border border-brand-500 text-neutral-400 p-2 placeholder:text-xs'></input>
          </div>
        {contract.map((contract) => {

          const cliente = clienti.find(c => c.UUID === contract.clientePrimoConducente)
          const secondoConducente = clienti.find(c => c.UUID === contract.secondoConducente)
          const veicolo = veicoli.find(v => v.UUID === contract.veicolo)

          return (
            
            <CardContrattoList

              //DATI CONTRATTO
              key={contract.UUID}
              uuid={contract.UUID}
              casco={contract.casco}
              clientePrimoConducente={contract.clientePrimoConducente}
              completato={contract.completato}
              comuneDiConsegna={contract.comuneDiConsegna}
              comuneDiRientro={contract.comuneDiRientro}
              dataEntrata={contract.dataEntrata}
              dataUscita={contract.dataUscita}
              franchigia={contract.franchigia}
              orarioEntrata={contract.orarioEntrata}
              orarioUscita={contract.orarioUscita}
              provinciaDiConsegna={contract.provinciaDiConsegna}
              provinciaDiRientro={contract.provinciaDiRientro}
              sconto={contract.sconto}
              secondoConducente={contract.secondoConducente}
              tariffaGiornaliera={contract.tariffaGiornaliera}
              tariffaMensile={contract.tariffaMensile}
              timestamp={contract.timestamp}
              veicolo={contract.veicolo}

              //VEICOLO
              targa={veicolo?.targa}
              marca={veicolo?.marca}
              modello={veicolo?.modello}
              anno={veicolo?.anno}
              cilindrata={veicolo?.cilindrata}
              cavalli={veicolo?.cavalli}
              cambio={veicolo?.cambio}
              carrozzeria={veicolo?.carrozzeria}
              posti={veicolo?.posti}
              porte={veicolo?.porte}
              carburante={veicolo?.carburante}
              colore={veicolo?.colore}
              allestimento={veicolo?.allestimento}

              //CLIENTE PRIMO CONDUCENTE
              nome={cliente?.nome}
              cognome={cliente?.cognome}
              luogoDiNascita={cliente?.luogoDiNascita}
              provinciaDiNascita={cliente?.provinciaDiNascita}
              dataDiNascita={cliente?.dataDiNascita}
              codiceFiscale={cliente?.codiceFiscale}
              via={cliente?.via}
              civico={cliente?.civico}
              cap={cliente?.cap}
              citta={cliente?.citta}
              provincia={cliente?.provincia}
              cartaIdentita={cliente?.cartaIdentita}
              scadenzaCi={cliente?.scadenzaCi}
              numeroPatente={cliente?.numeroPatente}
              scadenzaPatente={cliente?.scadenzaPatente}
              entePatente={cliente?.entePatente}
              telefono={cliente?.telefono}
              email={cliente?.email}

              //SecondoConducente
              nomeSecondoConducente={secondoConducente?.nome}
              cognomeSecondoConducente={secondoConducente?.cognome}
              luogoDiNascitaSecondoConducente={secondoConducente?.luogoDiNascita}
              provinciaDiNascitaSecondoConducente={secondoConducente?.provinciaDiNascita}
              dataDiNascitaSecondoConducente={secondoConducente?.dataDiNascita}
              codiceFiscaleSecondoConducente={secondoConducente?.codiceFiscale}
              viaSecondoConducente={secondoConducente?.via}
              civicoSecondoConducente={secondoConducente?.civico}
              capSecondoConducente={secondoConducente?.cap}
              cittaSecondoConducente={secondoConducente?.citta}
              provinciaSecondoConducente={secondoConducente?.provincia}
              cartaIdentitaSecondoConducente={secondoConducente?.cartaIdentita}
              scadenzaCiSecondoConducente={secondoConducente?.scadenzaCi}
              numeroPatenteSecondoConducente={secondoConducente?.numeroPatente}
              scadenzaPatenteSecondoConducente={secondoConducente?.scadenzaPatente}
              entePatenteSecondoConducente={secondoConducente?.entePatente}
              telefonoSecondoConducente={secondoConducente?.telefono}
              emailSecondoConducente={secondoConducente?.email}
            />
          )
        })
        } 
      </div>  
    </div> 
    </>
    )}