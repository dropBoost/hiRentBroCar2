'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide, faCirclePlus, faImage } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export default function UploadCar() {
  const iconaAuto = <FontAwesomeIcon className="me-2 text-brand-500" icon={faCarSide} />
  const iconaPlus = <FontAwesomeIcon icon={faCirclePlus} />
  const ICONimage = <FontAwesomeIcon icon={faImage} />

  const [veicolo, setVeicolo] = useState({
    UUID: '',
    targa: '',
    marca: '',
    modello: '',
    anno: '',
    cambio: '',
    allestimento: '',
    carrozzeria: '',
    cilindrata: '',
    cavalli: '',
    posti: '',
    porte: '',
    carburante: '',
    colore: '',
    immagine: '',
    disponibileWeb: false,
    disponibileNoleggio: false,
    inManutenzione: false,
  })

  const [fileImage, setFileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, type, value, checked } = e.target
    setVeicolo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (!file) return
    setFileImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = ''
      let newUuid = ''

      if (fileImage) {
        newUuid = uuidv4()
        const fileName = `${newUuid}-${veicolo.targa || 'unknown'}`

        const { error: uploadError } = await supabase.storage.from('veicoli').upload(fileName, fileImage)
        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('veicoli').getPublicUrl(fileName)
        imageUrl = data.publicUrl
      }

      const veicoloToInsert = {
        ...veicolo,
        immagine: imageUrl,
        UUID: newUuid || veicolo.UUID,
      }

      const { data, error } = await supabase.from('veicoli').insert([veicoloToInsert])
      if (error) throw error

      alert('Veicolo inserito con successo!')

      setVeicolo({
        UUID: '',
        targa: '',
        marca: '',
        modello: '',
        anno: '',
        cambio: '',
        allestimento: '',
        carrozzeria: '',
        cilindrata: '',
        cavalli: '',
        posti: '',
        porte: '',
        carburante: '',
        colore: '',
        immagine: '',
        disponibileWeb: false,
        disponibileNoleggio: false,
        inManutenzione: false,
      })
      setFileImage(null)
      setImagePreview(null)
    } catch (err) {
      alert('Errore: ' + err.message)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="ps-2 pe-8 py-4 space-y-6 ">
      <header className="flex items-center justify-between">
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-start gap-2">
          {iconaAuto} AGGIUNGI VEICOLO
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

      {/* Checkboxes */}
      <div className="flex gap-2">
        {['disponibileWeb', 'disponibileNoleggio', 'inManutenzione'].map(field => (
          <label
            key={field}
            className="flex items-center gap-2 border border-brand-500 px-2 py-2 rounded-xl text-[0.6rem] text-neutral-400 font-extrabold cursor-pointer"
          >
            <input
              type="checkbox"
              name={field}
              checked={veicolo[field]}
              onChange={handleChange}
              className="w-3 h-3 text-brand-500"
            />
            {field === 'disponibileWeb' && 'SITO'}
            {field === 'disponibileNoleggio' && 'NOLEGGIO'}
            {field === 'inManutenzione' && 'MANUTENZIONE'}
          </label>
        ))}
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <InputText label="TARGA" name="targa" value={veicolo.targa} onChange={handleChange} colSpan="lg:col-span-1" />
        <InputText label="MARCA" name="marca" value={veicolo.marca} onChange={handleChange} colSpan="lg:col-span-1" />
        <InputText label="MODELLO" name="modello" value={veicolo.modello} onChange={handleChange} colSpan="lg:col-span-2" />

        <InputText label="ANNO" name="anno" value={veicolo.anno} onChange={handleChange} colSpan="lg:col-span-1" />
        <InputText label="COLORE" name="colore" value={veicolo.colore} onChange={handleChange} colSpan="lg:col-span-1" />
        <InputText label="ALLESTIMENTO" name="allestimento" value={veicolo.allestimento} onChange={handleChange} colSpan="lg:col-span-2" />

        <SelectField
          label="CAMBIO"
          name="cambio"
          value={veicolo.cambio}
          onChange={handleChange}
          options={['', 'Automatico', 'Manuale', 'Sequenziale']}
          colSpan="lg:col-span-2"
        />
        <SelectField
          label="CARROZZERIA"
          name="carrozzeria"
          value={veicolo.carrozzeria}
          onChange={handleChange}
          options={['', 'Berlina', 'SUV', 'Monovolume', 'Station Wagon', 'Furgone', 'Van']}
          colSpan="lg:col-span-2"
        />

        <InputText label="CILINDRATA" name="cilindrata" value={veicolo.cilindrata} onChange={handleChange} colSpan="lg:col-span-1" />
        <InputText label="CAVALLI" name="cavalli" value={veicolo.cavalli} onChange={handleChange} colSpan="lg:col-span-1" />
        <SelectField
          label="CARBURANTE"
          name="carburante"
          value={veicolo.carburante}
          onChange={handleChange}
          options={['', 'Benzina', 'GPL', 'Diesel', 'Metano', 'Hybrid', 'Elettrica']}
          colSpan="lg:col-span-2"
        />

        <SelectField
          label="POSTI"
          name="posti"
          value={veicolo.posti}
          onChange={handleChange}
          options={['', '2', '4', '5', '6', '7', '9', 'altro']}
          colSpan="lg:col-span-1"
        />
        <SelectField
          label="PORTE"
          name="porte"
          value={veicolo.porte}
          onChange={handleChange}
          options={['', '2', '3', '5', '7', 'altro']}
          colSpan="lg:col-span-1"
        />

        <div className="lg:col-span-2 flex flex-col">
          <label className="block text-xs font-extrabold text-neutral-400 mb-2 cursor-pointer" htmlFor="immagine">
            FOTO (.png, .jpg, .gif)
          </label>
          <input
            type="file"
            id="immagine"
            name="immagine"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="immagine"
            className="inline-block cursor-pointer rounded bg-brand-500 px-4 py-2 text-white text-sm hover:bg-brand-600 transition"
          >
            {ICONimage} Scegli immagine
          </label>
          {loading && <p className="text-xs text-neutral-500 mt-2">Caricamento in corso...</p>}
        </div>

        <div className="lg:col-span-2 flex justify-center items-center">
          {imagePreview && (
            <img src={imagePreview} alt="Anteprima immagine" className="w-32 rounded-lg object-cover" />
          )}
        </div>
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
        className="block w-full rounded-lg p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 sm:text-sm"
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
