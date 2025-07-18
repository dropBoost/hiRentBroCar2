'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide, faCirclePlus, faArrowRight, faUser, faIdCard, faDollar } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '@/lib/supabaseClient'
import comuni from '@/app/gestionale/components/comuni.json'

export default function WriteContract() {

    const ICONauto = <FontAwesomeIcon icon={faCarSide} className="text-neutral-100" />
    const iconaPlus = <FontAwesomeIcon icon={faCirclePlus} />
    const ICONarrowRight = <FontAwesomeIcon icon={faArrowRight} />
    const ICONuser = <FontAwesomeIcon icon={faUser} className='text-neutral-100'/>
    const ICONdriver = <FontAwesomeIcon icon={faIdCard} className='text-brand-500'/>
    const ICONdollar = <FontAwesomeIcon icon={faDollar} className="text-neutral-100"/>

     const [contratto, setContratto] = useState({
      tariffaGiornaliera: '',
      sconto: '',
      completato: '',
      veicolo: '',
      tariffaMensile: '',
      dataUscita: '',
      dataEntrata: '',
      orarioUscita: '',
      orarioEntrata: '',
      provinciaDiConsegna: '',
      provinciaDiRientro: '',
      comuneDiConsegna: '',
      comuneDiRientro: '',
      clientePrimoConducente: '',
      secondoConducente: '',
      franchigia: '',
      casco: '',
      completato: 'false',
    })

    const [loading, setLoading] = useState(false)

    // Stati per CAP, città e provincia
    const [provSelection, setProvSelection] = useState('')
    const elencoComuni = comuni;
    // stati cliente
    const [listaClienti, setListaClienti] = useState([])
    const [UUIDcliente, setUUIDcliente] = useState([])
    const [UUIDsecondoConducente, setUUIDsecondoConducente] = useState([])
    const [clienteContratto, setClienteContratto] = useState([])
    // stati veicoli
    const [listaVeicoli, setListaVeicoli] = useState([])
    const [UUIDveicolo, setUUIDveicolo] = useState([])
    const [veicoloContratto, setVeicoloContratto] = useState([])
    // stati luoghi
    const [listaProvincie, setListaProvincie] = useState('')
    const [listaComuniDiConsegna, SetListaComuniDiConsegna] = useState('')
    const [listaProvincieDiRientro, SetListaProvincieDiRientro] = useState('')
    const [listaComuniDiRientro, SetComuneDiRientro] = useState('')

  useEffect(() => {
    if (provSelection) {
      const cityData = elencoComuni.filter(item => item.provincia.nome === provSelection);
      setCityOptions(cityData.map(comune => comune.nome));
      setCitySelection(''); // reset città
      setCapOptions([]); // reset CAP
    }
  }, [provSelection]);



  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setContratto(prev => {
      let updated = { ...prev, [name]: val };
      return updated;
    });
  };

  const handleSubmit = async e => {
  e.preventDefault()
  setLoading(true)

  try {
    const { data, error } = await supabase.from('contrattiNoleggio').insert([contratto])
    if (error) throw error

    alert('contratto inserito con successo!')

    setContratto({
      tariffaGiornaliera: '',
      sconto: '',
      completato: '',
      veicolo: '',
      tariffaMensile: '',
      dataUscita: '',
      dataEntrata: '',
      orarioUscita: '',
      orarioEntrata: '',
      provinciaDiConsegna: '',
      provinciaDiRientro: '',
      comuneDiConsegna: '',
      comuneDiRientro: '',
      clientePrimoConducente: '',
      secondoConducente: '',
      franchigia: '',
      casco: '',
      completato: 'false',
    })
  } catch (err) {
    alert('Errore: ' + err.message)
  }
  }

  //FETCH DALLA QUALE RECUPERO TUTTI I CLIENTI
  useEffect(() => {
    const fetchClienti = async () => {
      const { data, error } = await supabase
        .from('anagraficaClienti')
        .select('*')

      if (error) {
        console.error('Errore nel recupero dei clienti:', error)
      } else {
        setListaClienti(data)
      }

      setLoading(false)
    }

    fetchClienti()

  }, [])

  //HANDLECHANGE CAMPO CLIENTE DAL QUALE RECUPERO UUID
  const handleChangeCliente = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setUUIDcliente(val);
    setContratto(prev => {
      let updated = { ...prev, [name]: val };
      return updated;
    });
  }
  //HANDLECHANGE CAMPO CLIENTE DAL QUALE RECUPERO UUID PER SECONDO CONDUCENTE
  const handleChangeSecondoConducente = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setUUIDsecondoConducente(val);
    setContratto(prev => {
      let updated = { ...prev, [name]: val };
      return updated;
    });
    
  }
  //FETCH DALLA QUALE RECUPERO IL CLIENTE ATTRAVERSO LO UUID
  useEffect(() => {
    const fetchClienti = async () => {
      const { data, error } = await supabase
        .from('anagraficaClienti')
        .select('*')
        .eq('UUID', `${UUIDcliente}`)
      if (error) {
        console.error('Errore nel recupero dei clienti:', error)
      } else {
        setClienteContratto(data)
      }

      setLoading(false)
    }

    fetchClienti()

  }, [UUIDcliente])

  //FETCH DALLA QUALE RECUPERO TUTTE LE AUTO
  useEffect(() => {
    const fetchClienti = async () => {
      const { data, error } = await supabase
        .from('veicoli')
        .select('*')

      if (error) {
        console.error('Errore nel recupero dei clienti:', error)
      } else {
        //il metching con le date devo farlo in questa sezione
        setListaVeicoli(data)
      }

      setLoading(false)
    }

    fetchClienti()

  }, [])

  //HANDLECHANGE CAMPO CLIENTE DAL QUALE RECUPERO UUID
  const handleChangeVeicolo = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    if (name === 'veicolo') {
        setUUIDveicolo(val);
        setContratto(prev => {
          let updated = { ...prev, [name]: val };
          return updated;
        });
      }
  }
  //FETCH DALLA QUALE RECUPERO IL VEICOLO ATTRAVERSO LO UUID
  useEffect(() => {
    const fetchClienti = async () => {
      const { data, error } = await supabase
        .from('veicoli')
        .select('*')
        .eq('UUID', `${UUIDveicolo}`)
      if (error) {
        console.error('Errore nel recupero dei clienti:', error)
      } else {
        setVeicoloContratto(data)
      }

      setLoading(false)
    }

    fetchClienti()

  }, [UUIDveicolo])

  //HANDLECHANGE CAMPO LUOGO DI CONSEGNA DAL QUALE RECUPERO LA PROVINCIA
  const handleChangeLuoghi = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    if (name === 'provinciaDiConsegna') {
    setListaProvincie(val);
            setContratto(prev => {
          let updated = { ...prev, [name]: val };
          return updated;
        });
      }
    if (name === 'comuneDiConsegna') {
    SetListaComuniDiConsegna(val);
            setContratto(prev => {
          let updated = { ...prev, [name]: val };
          return updated;
        });
    }
    if (name === 'provinciaDiRientro') {
    SetListaProvincieDiRientro(val);
            setContratto(prev => {
          let updated = { ...prev, [name]: val };
          return updated;
        });
    }
    if (name === 'comuneDiRientro') {
    SetComuneDiRientro(val);
            setContratto(prev => {
          let updated = { ...prev, [name]: val };
          return updated;
        });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="ps-2 pe-8 py-4 space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-start gap-2">
          {ICONdriver} COMPILA CONTRATTO
        </h2>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1 text-white bg-brand-500 px-3 py-1 rounded hover:bg-brand-600 transition text-xs font-bold disabled:opacity-50"
        >
          {iconaPlus} AGGIUNGI
        </button>
      </header>
      <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONarrowRight} DATE CONTRATTO</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <DateField label="DATA USCITA VEICOLO" name="dataUscita" value={contratto.dataUscita} onChange={handleChange} colSpan="lg:col-span-1" />
            <DateField label="DATA ENTRATA VEICOLO" name="dataEntrata" value={contratto.dataEntrata} onChange={handleChange} colSpan="lg:col-span-1" />
            <TimeField label="ORARIO USCITA VEICOLO" name="orarioUscita" value={contratto.orarioUscita} onChange={handleChange} colSpan="lg:col-span-1" />
            <TimeField label="ORARIO ENTRATA VEICOLO" name="orarioEntrata" value={contratto.orarioEntrata} onChange={handleChange} colSpan="lg:col-span-1" />
        </div>
      <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONarrowRight} LUOGHI DI CONSEGNA</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <SelectField
          label="PROVINCIA DI CONSEGNA"
          name="provinciaDiConsegna"
          value={listaProvincie}
          onChange={handleChangeLuoghi}
          options={
            [...new Set(elencoComuni.map(p => p.provincia.nome))]
              .sort()
              .map(prov => ({ label: prov, value: prov }))
          }
          colSpan="lg:col-span-1"
        />
        <SelectField
          label="COMUNE DI CONSEGNA"
          name="comuneDiConsegna"
          value={listaComuniDiConsegna}
          onChange={handleChangeLuoghi}
          options={
            elencoComuni
              .filter(c => c.provincia.nome === listaProvincie)  // 👈 'c' è il comune corrente
              .map(c => c.nome)
              .sort()
              .map(nome => ({ label: nome, value: nome }))
          }
          colSpan="lg:col-span-1"
        />
        <SelectField
          label="PROVINCIA DI RIENTRO"
          name="provinciaDiRientro"
          value={listaProvincieDiRientro}
          onChange={handleChangeLuoghi}
          options={
            [...new Set(elencoComuni.map(p => p.provincia.nome))]
              .sort()
              .map(prov => ({ label: prov, value: prov }))
          }
          colSpan="lg:col-span-1"
        />
        <SelectField
          label="COMUNE DI RIENTRO"
          name="comuneDiRientro"
          value={listaComuniDiRientro}
          onChange={handleChangeLuoghi}
          options={
            elencoComuni
              .filter(c => c.provincia.nome === listaProvincieDiRientro)  // 👈 'c' è il comune corrente
              .map(c => c.nome)
              .sort()
              .map(nome => ({ label: nome, value: nome }))
          }
          colSpan="lg:col-span-1"
        />
      </div>  
      <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONuser} CLIENTE</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <SelectField
              label="INTESTATARIO CONTRATTO - PRIMO CONDUCENTE"
              name="clientePrimoConducente"
              value={clienteContratto.clientePrimoConducente}
              onChange={handleChangeCliente}
              options={listaClienti
                .map(p => ({
                  label: `${p.cognome} ${p.nome} - ${p.telefono}`,
                  value: p.UUID
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
              }
              colSpan="lg:col-span-4"
            />
            <SelectField
              label="SECONDO CONDUCENTE"
              name="secondoConducente"
              value={clienteContratto.secondoConducente}
              onChange={handleChangeSecondoConducente}
              options={listaClienti
                .map(p => ({
                  label: `${p.cognome} ${p.nome} - ${p.telefono}`,
                  value: p.UUID
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
              }
              colSpan="lg:col-span-4"
            />
            <InputText label="NOME" name="nome" value={clienteContratto[0]?.nome || undefined} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="COGNOME" name="cognome" value={clienteContratto[0]?.cognome || undefined} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="PROVINCIA DI NASCITA" name="provinciaDiNascita" value={clienteContratto[0]?.provinciaDiNascita || undefined} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="LUOGO DI NASCITA" name="luogoDiNascita" value={clienteContratto[0]?.luogoDiNascita || undefined} onChange={handleChange} colSpan="lg:col-span-1" />
            <DateField label="DATA DI NASCITA" name="dataDiNascita" value={clienteContratto[0]?.dataDiNascita || undefined} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="CODICE FISCALE" name="codiceFiscale" value={clienteContratto[0]?.codiceFiscale || undefined} onChange={handleChange} colSpan="lg:col-span-2" />
        </div>
        <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONarrowRight} RESIDENZA</h2>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
            <InputText label="VIA" name="via" value={clienteContratto[0]?.via || undefined} onChange={handleChange} colSpan="lg:col-span-2" />
            <InputText label="CIVICO" name="civico" value={clienteContratto[0]?.civico || undefined} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="CAP" name="CAP" value={clienteContratto[0]?.cap || undefined} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="CITTA" name="citta" value={clienteContratto[0]?.citta || undefined} onChange={handleChange} colSpan="lg:col-span-3" />  
            <InputText label="PROVINCIA" name="provincia" value={clienteContratto[0]?.provincia || undefined} onChange={handleChange} colSpan="lg:col-span-1" />    
        </div>
        <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONarrowRight} DOCUMENTI</h2>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <InputText label="CARTA DI IDENTITà" name="cartaIdentita" value={clienteContratto[0]?.cartaIdentita || undefined} onChange={handleChange} colSpan="lg:col-span-2 uppercase" />
          <InputText label="SCADENZA CARTA DI IDENTITà" name="scadenzaCi" value={clienteContratto[0]?.scadenzaCi || undefined} onChange={handleChange} colSpan="lg:col-span-2 uppercase" />
          <InputText label="NUMERO PATENTE" name="numeroPatente" value={clienteContratto[0]?.numeroPatente || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <DateField label="SCADENZA PATENTE" name="scadenzaPatente" value={clienteContratto[0]?.scadenzaPatente || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="ENTE PATENTE" name="entePatente" value={clienteContratto[0]?.entePatente || undefined} colSpan="lg:col-span-1 uppercase" />
        </div>
        <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONarrowRight} RECAPITI</h2>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <InputText label="TELEFONO" name="telefono" value={clienteContratto[0]?.telefono || undefined} onChange={handleChange} colSpan="lg:col-span-2 uppercase" />
          <InputText label="EMAIL" name="email" value={clienteContratto[0]?.email || undefined} onChange={handleChange} colSpan="lg:col-span-4 uppercase" />
          <InputText label="UUID" name="uuidCliente" value={clienteContratto[0]?.UUID || undefined} onChange={handleChange} colSpan="lg:col-span-4 uppercase hidden" />
        </div>
        <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-neutral-900 border border-brand-500 px-4 py-1 w-fit">{ICONauto} VEICOLO</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <SelectField
              label="VEICOLO"
              name="veicolo"
              value={clienteContratto.veicolo}
              onChange={handleChangeVeicolo}
              options={listaVeicoli
                .map(v => ({
                  label: `${v.marca} ${v.modello} - ${v.targa}`,
                  value: v.UUID
                }))
                .sort((a, b) => a.label.localeCompare(b.label))
              }
              colSpan="lg:col-span-4"
            />
          <InputText label="MARCA" name="marca" value={veicoloContratto[0]?.marca || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="MODELLO" name="modello" value={veicoloContratto[0]?.modello || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="TARGA" name="targa" value={veicoloContratto[0]?.targa || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="ANNO" name="anno" value={veicoloContratto[0]?.targa || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="COLORE" name="colore" value={veicoloContratto[0]?.colore || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="CAMBIO" name="cambio" value={veicoloContratto[0]?.cambio || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="CARBURANTE" name="carburante" value={veicoloContratto[0]?.carburante || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="CILINDRATA" name="cilindrata" value={veicoloContratto[0]?.cilindrata || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="CAVALLI" name="cavalli" value={veicoloContratto[0]?.cavalli || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="PORTE" name="porte" value={veicoloContratto[0]?.porte || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="ALLESTIMENTO" name="allestimento" value={veicoloContratto[0]?.allestimento || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="UUID" name="uuidVeicolo" value={veicoloContratto[0]?.UUID || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase hidden" />
        </div>
        <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-neutral-900 border border-brand-500 px-4 py-1 w-fit">{ICONdollar}TARIFFE</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <InputText label="TARIFFA GIORNALIERA" name="tariffaGiornaliera" value={contratto.tariffaGiornaliera || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="TARIFFA MENSILE" name="tariffaMensile" value={contratto.tariffaMensile || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" /> 
          <InputText label="FRANCHIGIA" name="franchigia" value={contratto.franchigia || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="CASCO" name="casco" value={contratto.casco || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" /> 
          <InputText label="SCONTO" name="sconto" value={contratto.sconto || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
        </div>  
        <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-neutral-900 border border-brand-500 px-4 py-1 w-fit">{ICONdollar}RIEPILOGO</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <InputText label="Totale" name="totale" value={contratto.totale || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="Giorni Noleggio" name="giorniNoleggio" value={contratto.totale || undefined} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
        </div>
    </form>
  )
}

function InputText({ label, name, value, onChange, colSpan }) {
  return (
    <div className={colSpan}>
      <label htmlFor={name} className="block text-xs font-extrabold text-neutral-400 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={label}
        className="block w-full rounded-lg p-2 text-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:lowercase"
        autoComplete="off"
      />
    </div>
  )
}

function DateField({ label, name, value, onChange, colSpan }) {
  return (
    <div className={colSpan}>
      <label htmlFor={name} className="block text-xs font-extrabold text-neutral-400 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        placeholder={label}
        className="block w-full rounded-lg p-2 text-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:lowercase"
        autoComplete="off"
      />
    </div>
  )
}

function TimeField({ label, name, value, onChange, colSpan }) {
  return (
    <div className={colSpan}>
      <label htmlFor={name} className="block text-xs font-extrabold text-neutral-400 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="time"
        value={value}
        onChange={onChange}
        placeholder={label}
        className="block w-full rounded-lg p-2 text-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:lowercase"
        autoComplete="off"
      />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options, colSpan }) {
  return (
    <div className={colSpan}>
      <label htmlFor={name} className="block text-xs font-extrabold text-neutral-400 mb-2">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 sm:text-sm"
      >
        <option value="">-- seleziona --</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}