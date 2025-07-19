'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide, faCirclePlus, faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '@/lib/supabaseClient'
import comuni from '@/app/gestionale/components/comuni.json'

export default function UploadClienti(props) {

    const iconaAuto = <FontAwesomeIcon className="me-2 text-brand-500" icon={faCarSide} />
    const iconaPlus = <FontAwesomeIcon icon={faCirclePlus} />
    const ICONarrowRight = <FontAwesomeIcon icon={faArrowRight} />
    const ICONuser = <FontAwesomeIcon icon={faUser} className='text-brand-500'/>

    const onDisplayUploadCustomer = props.onDisplayUploadCustomer

     const [cliente, setCliente] = useState({
      nome: '',
      cognome: '',
      luogoDiNascita: '',
      provinciaDiNascita: '',
      dataDiNascita: '',
      codiceFiscale: '',
      via: '',
      civico: '',
      cap: '',
      citta: '',
      provincia: '',
      cartaIdentita: '',
      scadenzaCi: '',
      numeroPatente: '',
      scadenzaPatente: '',
      entePatente: '',
      telefono: '',
      email: '',
    })

    const [loading, setLoading] = useState(false)

    // Stati per CAP, città e provincia
    const [provSelection, setProvSelection] = useState('')
    const [cityOptions, setCityOptions] = useState([])
    const [citySelection, setCitySelection] = useState([])
    const [capOptions, setCapOptions] = useState([])
    const [provNascitaSelection, setProvNascitaSelection] = useState('');
    const [cittaNascitaOptions, setCittaNascitaOptions] = useState([]);
    const elencoComuni = comuni;
    
    // console.log(`provSelection: ${provSelection}, cityOptions: ${cityOptions}, capOptions: ${capOptions}`)

  useEffect(() => {
    if (provSelection) {
      const cityData = elencoComuni.filter(item => item.provincia.nome === provSelection);
      setCityOptions(cityData.map(comune => comune.nome));
      setCitySelection(''); // reset città
      setCapOptions([]); // reset CAP
    }
  }, [provSelection]);

  useEffect(() => {
    if (citySelection) {
      const capData = elencoComuni.filter(item => item.nome === citySelection);
      setCapOptions(capData.map(comune => comune.cap));
    }
  }, [citySelection]);

  useEffect(() => {
    if (provNascitaSelection) {
      const comuniNascita = elencoComuni.filter(item => item.provincia.nome === provNascitaSelection);
      setCittaNascitaOptions([...new Set(comuniNascita.map(item => item.nome))]);
      setCliente(prev => ({ ...prev, luogoDiNascita: '' })); // resetta città nascita
    }
  }, [provNascitaSelection]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    setCliente(prev => {
      let updated = { ...prev, [name]: val };

      if (name === 'provincia') {
        setProvSelection(val);
        setCitySelection('');
        setCapOptions([]);
        updated.citta = '';
        updated.cap = '';
      }

      if (name === 'citta') {
        setCitySelection(val);
        updated.cap = '';
      }

      if (name === 'provinciaDiNascita') {
        setProvNascitaSelection(val);
      }

      // if (name === 'luogoDiNascita') {
      // }

      return updated;
    });
  };

  

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.from('anagraficaClienti').insert([cliente])
      if (error) throw error

      alert('cliente inserito con successo!')

      setCliente({
        UUID: '',
        nome: '',
        cognome: '',
        luogoDiNascita: '',
        provinciaDiNascita: '',
        dataDiNascita: '',
        codiceFiscale: '',
        via: '',
        civico: '',
        cap: '',
        citta: '',
        provincia: '',
        cartaIdentita: '',
        scadenzaCI: '',
        numeroPatente: '',
        scadenzaPatente: '',
        entePatente: '',
        telefono: '',
        email: '',
      })
    } catch (err) {
      alert('Errore: ' + err.message)
    }

    setLoading(false)
  }

  return (
    <div className={`w-full h-[70vh] overflow-auto ${onDisplayUploadCustomer == "on" ? "" : "hidden"}`}>
    <form onSubmit={handleSubmit} className="ps-2 pe-8 py-4 space-y-6 ">
      <header className="flex items-center justify-between">
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-start gap-2">
          {ICONuser} AGGIUNGI CLIENTE
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
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONarrowRight} DATI ANAGRAFICI</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <InputText label="NOME" name="nome" value={cliente.nome} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="COGNOME" name="cognome" value={cliente.cognome} onChange={handleChange} colSpan="lg:col-span-1" />
            <SelectField
              label="PROVINCIA DI NASCITA"
              name="provinciaDiNascita"
              value={provNascitaSelection}
              onChange={handleChange}
              options={[...new Set(elencoComuni.map(p => p.provincia.nome))].sort()}
              colSpan="lg:col-span-1"
            />
            <SelectField
              label="LUOGO DI NASCITA"
              name="luogoDiNascita"
              value={cliente.luogoDiNascita}
              onChange={handleChange}
              options={cittaNascitaOptions}
              colSpan="lg:col-span-2"
            />
            <DateField label="DATA DI NASCITA" name="dataDiNascita" value={cliente.dataDiNascita} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="CODICE FISCALE" name="codiceFiscale" value={cliente.codiceFiscale} onChange={handleChange} colSpan="lg:col-span-2" />
        </div>
        <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONarrowRight} RESIDENZA</h2>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
            <InputText label="VIA" name="via" value={cliente.via} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="CIVICO" name="civico" value={cliente.civico} onChange={handleChange} colSpan="lg:col-span-1" />   
           <SelectField
              label="PROVINCIA"
              name="provincia"
              value={provSelection}
              onChange={handleChange}
              options={[...new Set(elencoComuni.map(p => p.provincia.nome))].sort()}
              colSpan="lg:col-span-2"
            />

            <SelectField
              label="CITTÀ"
              name="citta"
              value={citySelection}
              onChange={handleChange}
              options={cityOptions}
              colSpan="lg:col-span-2"
            />

            <SelectField
              label="CAP"
              name="cap"
              value={cliente.cap}
              onChange={handleChange}
              options={capOptions}
              colSpan="lg:col-span-2"
            />
        </div>
        <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONarrowRight} DOCUMENTI</h2>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <InputText label="CARTA DI IDENTITà" name="cartaIdentita" value={cliente.cartaIdentita} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="SCADENZA CARTA DI IDENTITà" name="scadenzaCi" value={cliente.scadenzaCi} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="NUMERO PATENTE" name="numeroPatente" value={cliente.numeroPatente} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <DateField label="SCADENZA PATENTE" name="scadenzaPatente" value={cliente.scadenzaPatente} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="ENTE PATENTE" name="entePatente" value={cliente.entePatente} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
        </div>
        <hr className="border-brand-500" />
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-center rounded-xl gap-2 bg-brand-500 px-4 py-1 w-fit">{ICONarrowRight} RECAPITI</h2>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <InputText label="TELEFONO" name="telefono" value={cliente.telefono} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
          <InputText label="EMAIL" name="email" value={cliente.email} onChange={handleChange} colSpan="lg:col-span-1 uppercase" />
        </div>
    </form>
    </div>
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
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt || '-- Seleziona --'}
          </option>
        ))}
      </select>
    </div>
  )
}
