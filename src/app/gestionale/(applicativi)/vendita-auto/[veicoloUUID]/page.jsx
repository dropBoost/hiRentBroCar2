'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide, faCirclePlus, faImage } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import elencoMarchiAuto from '@/components/elencoMarchiAuto.json'

export default function PAGEveicolo ({params}){

    const veicoloUUID = params['veicoloUUID']

    const iconaAuto = <FontAwesomeIcon className="me-2 text-brand-500" icon={faCarSide} />
    const iconaPlus = <FontAwesomeIcon icon={faCirclePlus} />

    const [veicoloSelezionato, setVeicoloSelezionato] = useState([])

    useEffect(() => {
        const fetchVeicoli = async () => {
        const { data, error } = await supabase
            .from('veicoliVendita')
            .select('*')
            .eq('UUID', veicoloUUID)

        if (error) {
            console.error('Errore nel recupero dei veicoli:', error)
        } else {
            setVeicoloSelezionato(data)
            if (data?.length > 0) {
                setVeicolo({
                    ...data[0],
                    disponibileWeb: data[0].disponibileWeb === "true",
                    promo: data[0].promo === "true",
                    special: data[0].special === "true",
                })
            }
        }

        setLoading(false)
        }

        fetchVeicoli()
    }, [veicoloUUID])

    const [veicolo, setVeicolo] = useState({
        UUID: '',
        marca: '',
        modello: '',
        colore: '',
        anno: '',
        cambio: '',
        cilindrata: '',
        cavalli: '',
        allestimento: '',
        km:'',
        copertina: '',
        annuncio:'',
        prezzo:'',
        carburante: '',
        interni:'',
        pneumatici:'',
        porte: '',
        proprietari:'',
        carrozzeria: '',
        provenienza:'',
        garanzia:'',
        special:'',
        optional:'',
        promo:'',
        posti: '',
        targa: '',
        trazione:'',
        titoloAnnuncio: '',
        classificazioneAuto:'',
        classeEmissioni:'',
        disponibileWeb: false,
    })

    //LOADER
    const [loading, setLoading] = useState(false)

    const handleChange = e => {
        const { name, type, value, checked } = e.target
        setVeicolo(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {

            const veicoloToInsert = {
                ...veicolo,
                disponibileWeb: veicolo.disponibileWeb ? "true" : "false",
                promo: veicolo.promo ? "true" : "false",
                special: veicolo.special ? "true" : "false",
            }

        const { data, error } = await supabase
        .from('veicoliVendita')
        .update(veicoloToInsert)
        .eq('UUID', veicoloUUID)

        if (error) throw error

        alert('Veicolo modificato con successo!')

        setVeicolo({
            marca: '',
            modello: '',
            colore: '',
            anno: '',
            cambio: '',
            cilindrata: '',
            cavalli: '',
            allestimento: '',
            km:'',
            copertina: '',
            annuncio:'',
            prezzo:'',
            carburante: '',
            interni:'',
            pneumatici:'',
            porte: '',
            proprietari:'',
            carrozzeria: '',
            provenienza:'',
            garanzia:'',
            special:'',
            optional:'',
            promo:'',
            posti: '',
            targa: '',
            classificazioneAuto:'',
            titoloAnnuncio: '',
            classeEmissioni:'',
            disponibileWeb: false,
            trazione:'',
        })
        } catch (err) {
        alert('Errore: ' + err.message)
        }
        setLoading(false)
    }

    return(
        <>
        <div className='h-[80vh] overflow-auto p-5'>
        <form onSubmit={handleSubmit} className="ps-2 pe-8 py-4 space-y-6 ">
            <header className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-start gap-2">
                {iconaAuto} MODIFICA VEICOLO VENDITA
            </h2>
            <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-1 text-white bg-brand-500 px-3 py-1 rounded hover:bg-brand-600 transition text-xs font-bold disabled:opacity-50"
            >
                {iconaPlus} MODIFICA
            </button>
            </header>
            <hr className="border-brand-500" />
    
            {/* Checkboxes */}
            <div className="flex gap-2">
                <CheckboxField
                    name="disponibileWeb"
                    label="SITO"
                    checked={veicolo.disponibileWeb}
                    onChange={handleChange}
                />
                <CheckboxField
                    name="promo"
                    label="PROMO"
                    checked={veicolo.promo}
                    onChange={handleChange}
                />
                <CheckboxField
                    name="special"
                    label="SPECIAL"
                    checked={veicolo.special}
                    onChange={handleChange}
                />
            </div>
            <hr className="border-brand-500" />
            <div>
                <span className="text-neutral-100 text-xs border border-brand-500 px-3 py-2 rounded-xl">CODICE VEICOLO: {veicoloUUID}</span>
            </div>    
            {/* Inputs grid */}
            <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
            <InputText label="TARGA" name="targa" value={veicolo.targa} placeholder="targa" onChange={handleChange} colSpan="lg:col-span-1" />
            <SelectField
                label="MARCA"
                name="marca"
                value={veicolo.marca}
                onChange={handleChange}
                options={elencoMarchiAuto.map(marchio => (`${marchio.name}`))}
                colSpan="lg:col-span-1"
            />
            <InputText label="MODELLO" name="modello" value={veicolo.modello} placeholder={veicoloSelezionato[0]?.modello} onChange={handleChange} colSpan="lg:col-span-2" />
            <InputText label="ANNO" name="anno" value={veicolo.anno} placeholder={veicoloSelezionato[0]?.anno} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="COLORE" name="colore" value={veicolo.colore} placeholder={veicoloSelezionato[0]?.colore} onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="ALLESTIMENTO" name="allestimento" value={veicolo.allestimento} placeholder={veicoloSelezionato[0]?.allestimento} onChange={handleChange} colSpan="lg:col-span-2" />
            <SelectField
                label="CLASSIFICAZIONE AUTO"
                name="classificazioneAuto"
                value={veicolo.classificazioneAuto}
                onChange={handleChange}
                options={['Usato', 'Nuovo']}
                colSpan="lg:col-span-1"
            />
            <InputText label="KM" name="km" value={veicolo.km} placeholder={veicoloSelezionato[0]?.km} onChange={handleChange} colSpan="lg:col-span-1" />
            <SelectField
                label="TRAZIONE"
                name="trazione"
                value={veicolo.trazione}
                onChange={handleChange}
                options={['FWD - Anteriore', 'RWD - Posteriore', 'AWD - Integrale']}
                colSpan="lg:col-span-1"
            />
            <InputText label="INTERNI" name="interni" value={veicolo.interni} placeholder="interni" onChange={handleChange} colSpan="lg:col-span-2" />
            <InputText label="PNEUMATICI" name="pneumatici" value={veicolo.pneumatici} placeholder="pneumatici" onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="CILINDRATA" name="cilindrata" value={veicolo.cilindrata} placeholder="cilindrata" onChange={handleChange} colSpan="lg:col-span-1" />
            <InputText label="CAVALLI" name="cavalli" value={veicolo.cavalli} placeholder="cavalli" onChange={handleChange} colSpan="lg:col-span-1" />
            <SelectField
                label="PROVENIENZA"
                name="provenienza"
                value={veicolo.provenienza}
                onChange={handleChange}
                options={['Italia', 'Europa']}
                colSpan="lg:col-span-1"
            />
            <SelectField
                label="PROPRIETARI"
                name="proprietari"
                value={veicolo.proprietari}
                onChange={handleChange}
                options={['1', '2', '3', '4', 'altro']}
                colSpan="lg:col-span-1"
            />
            <SelectField
                label="CAMBIO"
                name="cambio"
                value={veicolo.cambio}
                onChange={handleChange}
                options={['Automatico', 'Manuale', 'Sequenziale']}
                colSpan="lg:col-span-1"
            />
            <SelectField
                label="CLASSE EMISSIONI"
                name="classeEmissioni"
                value={veicolo.classeEmissioni}
                onChange={handleChange}
                options={['EURO 3', 'EURO 4', 'EURO 5', 'EURO 6', 'altro']}
                colSpan="lg:col-span-1"
            />
            <SelectField
                label="CARROZZERIA"
                name="carrozzeria"
                value={veicolo.carrozzeria}
                onChange={handleChange}
                options={['Berlina', 'Coupè', 'SUV', 'Monovolume', 'Station Wagon', 'Furgone', 'Van']}
                colSpan="lg:col-span-1"
            />
            <SelectField
                label="CARBURANTE"
                name="carburante"
                value={veicolo.carburante}
                onChange={handleChange}
                options={['Benzina', 'GPL', 'Diesel', 'Metano', 'Hybrid', 'Elettrica']}
                colSpan="lg:col-span-1"
            />
            <SelectField
                label="POSTI"
                name="posti"
                value={veicolo.posti}
                onChange={handleChange}
                options={['2', '4', '5', '6', '7', '9', 'altro']}
                colSpan="lg:col-span-1"
            />
            <SelectField
                label="PORTE"
                name="porte"
                value={veicolo.porte}
                onChange={handleChange}
                options={['2', '3', '5', '7', 'altro']}
                colSpan="lg:col-span-1"
            />
            <SelectField
                label="GARANZIA"
                name="garanzia"
                value={veicolo.garanzia}
                onChange={handleChange}
                options={['12 mesi', '18 mesi', '24 mesi', 'no garanzia']}
                colSpan="lg:col-span-1"
            />
            </div>
    
            <hr className="border-brand-500" />  
    
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <InputText label="TITOLO ANNUNCIO" name="titoloAnnuncio" value={veicolo.titoloAnnuncio} placeholder="Titolo Annuncio" onChange={handleChange} colSpan="lg:col-span-4" />
            <Textarea label="OPTIONAL" name="optional" value={veicolo.optional} placeholder="Optional" onChange={handleChange} colSpan="lg:col-span-2" />
            <Textarea label="ANNUNCIO" name="annuncio" value={veicolo.annuncio} placeholder="Annuncio" onChange={handleChange} colSpan="lg:col-span-2" />
            </div>
    
            <hr className="border-brand-500" />
    
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <InputText label="PREZZO" name="prezzo" value={veicolo.prezzo} placeholder="prezzo"  onChange={handleChange} colSpan="lg:col-span-2" />
            <InputText label="PREZZO DI CONFRONTO" name="prezzoConfronto" value={veicolo.prezzoConfronto} placeholder="Prezzo di Confronto" onChange={handleChange} colSpan="lg:col-span-2" />
            </div>
        </form>
        </div>
        </>
    )
}


function InputText({ label, name, value, onChange, colSpan, placeholder }) {
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
        placeholder={placeholder}
        className="block w-full rounded-lg p-2 text-gray-600 placeholder-gray-400 placeholder:text-xs text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        autoComplete="off"
        required
      />
    </div>
  )
}

function Textarea({ label, name, value, onChange, colSpan }) {
  return (
    <div className={colSpan}>
      <label htmlFor={name} className="block text-xs font-extrabold text-neutral-400 mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={label}
        className="block w-full rounded-lg p-2 text-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
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
        className="block w-full rounded-lg p-2 text-gray-600 focus:outline-none text-sm focus:ring-2 focus:ring-brand-500 sm:text-sm"
        required
      >
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt || '-- Seleziona --'}
          </option>
        ))}
      </select>
    </div>
  )
}

function CheckboxField({ name, label, checked, onChange }) {
  return (
    <label
      className="flex items-center gap-2 border border-brand-500 px-2 py-2 rounded-xl text-[0.6rem] text-neutral-400 font-extrabold cursor-pointer"
    >
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-3 h-3 text-brand-500"
      />
      {label}
    </label>
  )
}