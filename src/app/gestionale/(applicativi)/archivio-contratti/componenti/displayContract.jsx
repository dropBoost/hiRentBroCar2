import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import CardContrattoList from './cardContractList'


export default function DisplayContract() {
  const [contract, setContract] = useState([])
  const [loading, setLoading] = useState(true)
  const [clienti, setClienti] = useState([])
  const [veicoli, setVeicoli] = useState([])

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

      if (error) {
        console.error('Errore nel recupero dei clienti:', error)
      } else {
        setClienti(data)
      }
    }

    fetchClienti()
  }, [])

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
    })  
    </>
    )}