'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide, faCirclePlus, faImage } from '@fortawesome/free-solid-svg-icons'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import elencoMarchiAuto from '@/components/elencoMarchiAuto.json'

export default function UploadSellCar() {

  const iconaAuto = <FontAwesomeIcon className="me-2 text-brand-500" icon={faCarSide} />
  const iconaPlus = <FontAwesomeIcon icon={faCirclePlus} />
  const ICONimage = <FontAwesomeIcon icon={faImage} />

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
    titoloAnnuncio: '',
    classeEmissioni:'',
    disponibileWeb: false,
  })

  //IMMAGINE SINGOLA
  const [fileImage, setFileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  //IMMAGINI MULTIPLE
  const [fileImages, setFileImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  //LOADER
  const [loading, setLoading] = useState(false)

  const newUuid = uuidv4()
  console.log('UUID generato:', newUuid)

  const handleChange = e => {
    const { name, type, value, checked } = e.target
    setVeicolo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleMultipleFilesChange = e => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setFileImages(files)
    setImagePreviews(files.map(file => URL.createObjectURL(file)))
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
      let immaginiMultipleUrls = []

      //IMMAGINE DI COPERTINA
      if (fileImage) {
        newUuid = uuidv4()
        const fileName = `${newUuid}-${veicolo.targa || 'unknown'}`

        const { error: uploadError } = await supabase.storage.from('veicoli').upload(fileName, fileImage)
        if (uploadError) throw uploadError

        const { data } = supabase.storage.from('veicoli').getPublicUrl(fileName)
        imageUrl = data.publicUrl
      }

      //IMMAGINI MULTIPLE
      if (fileImages.length > 0) {
        for (let i = 0; i < fileImages.length; i++) {
          const file = fileImages[i]
          const fileName = `${newUuid || uuidv4()}-extra-${i}-${file.name}`

          const { error: uploadErr } = await supabase.storage
            .from('veicoli')
            .upload(fileName, file)

          if (uploadErr) throw uploadErr

          const { data } = supabase.storage
            .from('veicoli')
            .getPublicUrl(fileName)

          immaginiMultipleUrls.push(data.publicUrl)
        }
      }

      const veicoloToInsert = {
        ...veicolo,
        copertina: imageUrl,
        immaginiAggiuntive: immaginiMultipleUrls,
        UUID: newUuid || veicolo.UUID,
      }

      const { data, error } = await supabase.from('veicoliVendita').insert([veicoloToInsert])
      if (error) throw error

      alert('Veicolo inserito con successo!')

      setVeicolo({
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
        titoloAnnuncio: '',
        classeEmissioni:'',
        disponibileWeb: false,
      })
      setFileImage(null)
      setImagePreview(null)
    } catch (err) {
      alert('Errore: ' + err.message)
    }

    setLoading(false)
    setFileImages([])
    setImagePreviews([])
  }

  return (
    <form onSubmit={handleSubmit} className="ps-2 pe-8 py-4 space-y-6 ">
      <header className="flex items-center justify-between">
        <h2 className="text-xs font-extrabold text-neutral-300 flex flex-row items-start gap-2">
          {iconaAuto} AGGIUNGI VEICOLO VENDITA
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
        
        {['disponibileWeb', 'promo', 'special'].map(field => (
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
            {field === 'promo' && 'PROMO'}
            {field === 'special' && 'SPECIAL'}
          </label>
        ))}
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">
        <InputText label="TARGA" name="targa" value={veicolo.targa} onChange={handleChange} colSpan="lg:col-span-1" />
        <SelectField
          label="MARCA"
          name="marca"
          value={veicolo.marca}
          onChange={handleChange}
          options={
            elencoMarchiAuto.map(marchio => (`${marchio.name}`))
          }
          colSpan="lg:col-span-1"
        />
        <InputText label="MODELLO" name="modello" value={veicolo.modello} onChange={handleChange} colSpan="lg:col-span-2" />
        <InputText label="ANNO" name="anno" value={veicolo.anno} onChange={handleChange} colSpan="lg:col-span-1" />
        <InputText label="COLORE" name="colore" value={veicolo.colore} onChange={handleChange} colSpan="lg:col-span-1" />
        <InputText label="ALLESTIMENTO" name="allestimento" value={veicolo.allestimento} onChange={handleChange} colSpan="lg:col-span-2" />
        <InputText label="KM" name="km" value={veicolo.km} onChange={handleChange} colSpan="lg:col-span-2" />
        <InputText label="INTERNI" name="interni" value={veicolo.interni} onChange={handleChange} colSpan="lg:col-span-2" />
        <InputText label="PNEUMATICI" name="pneumatici" value={veicolo.pneumatici} onChange={handleChange} colSpan="lg:col-span-1" />
        <InputText label="CILINDRATA" name="cilindrata" value={veicolo.cilindrata} onChange={handleChange} colSpan="lg:col-span-1" />
        <InputText label="CAVALLI" name="cavalli" value={veicolo.cavalli} onChange={handleChange} colSpan="lg:col-span-1" />
        <SelectField
          label="PROVENIENZA"
          name="provenienza"
          value={veicolo.provenienza}
          onChange={handleChange}
          options={['', 'Italia', 'Europa']}
          colSpan="lg:col-span-1"
        />
        <SelectField
          label="PROPRIETARI"
          name="proprietari"
          value={veicolo.proprietari}
          onChange={handleChange}
          options={['', '1', '2', '3', '4', 'altro']}
          colSpan="lg:col-span-1"
        />
        <SelectField
          label="CAMBIO"
          name="cambio"
          value={veicolo.cambio}
          onChange={handleChange}
          options={['', 'Automatico', 'Manuale', 'Sequenziale']}
          colSpan="lg:col-span-1"
        />
        <SelectField
          label="CLASSE EMISSIONI"
          name="classeEmissioni"
          value={veicolo.classeEmissioni}
          onChange={handleChange}
          options={['','EURO 3', 'EURO 4', 'EURO 5', 'EURO 6', 'altro']}
          colSpan="lg:col-span-1"
        />
        <SelectField
          label="CARROZZERIA"
          name="carrozzeria"
          value={veicolo.carrozzeria}
          onChange={handleChange}
          options={['', 'Berlina', 'Coupè', 'SUV', 'Monovolume', 'Station Wagon', 'Furgone', 'Van']}
          colSpan="lg:col-span-1"
        />
        <SelectField
          label="CARBURANTE"
          name="carburante"
          value={veicolo.carburante}
          onChange={handleChange}
          options={['', 'Benzina', 'GPL', 'Diesel', 'Metano', 'Hybrid', 'Elettrica']}
          colSpan="lg:col-span-1"
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
        <SelectField
          label="GARANZIA"
          name="garanzia"
          value={veicolo.garanzia}
          onChange={handleChange}
          options={['', '12 mesi', '18 mesi', '24 mesi', 'no garanzia']}
          colSpan="lg:col-span-1"
        />
      </div>

      <hr className="border-brand-500" />  

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <InputText label="TITOLO ANNUNCIO" name="titoloAnnuncio" value={veicolo.titoloAnnuncio} onChange={handleChange} colSpan="lg:col-span-4" />
        <Textarea label="OPTIONAL" name="optional" value={veicolo.optional} onChange={handleChange} colSpan="lg:col-span-2" />
        <Textarea label="ANNUNCIO" name="annuncio" value={veicolo.annuncio} onChange={handleChange} colSpan="lg:col-span-2" />
      </div>

      <hr className="border-brand-500" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <InputText label="PREZZO" name="prezzo" value={veicolo.prezzo} onChange={handleChange} colSpan="lg:col-span-2" />
        <InputText label="PREZZO DI CONFRONTO" name="prezzoConfronto" value={veicolo.prezzoConfronto} onChange={handleChange} colSpan="lg:col-span-2" />
      </div>

      <hr className="border-brand-500" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">  
        <div className="lg:col-span-1 flex flex-col">
            <label className="block text-xs font-extrabold text-neutral-400 mb-2 cursor-pointer" htmlFor="copertina">
              IMMAGINE DI COPERTINA (.png, .jpg, .gif)
            </label>
            <input
              type="file"
              id="copertina"
              name="copertina"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="copertina"
              className="inline-block cursor-pointer rounded bg-brand-500 px-4 py-2 text-white text-sm hover:bg-brand-600 transition"
            >
              {ICONimage} Scegli immagine Copertina
            </label>
            {loading && <p className="text-xs text-neutral-500 mt-2">Caricamento in corso...</p>}
        </div>

        <div className="lg:col-span-1 flex justify-center items-center">
          {imagePreview && (
            <img src={imagePreview} alt="Anteprima immagine" className="w-32 rounded-lg object-cover" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-1 flex flex-col">
          <label className="block text-xs font-extrabold text-neutral-400 mb-2 cursor-pointer" htmlFor="immaginiMultiple">
            ALTRE IMMAGINI (.png, .jpg) MULTIPLE
          </label>
          <input
            type="file"
            id="immaginiMultiple"
            name="immaginiMultiple"
            accept="image/*"
            multiple
            onChange={handleMultipleFilesChange}
            className="hidden"
          />
          <label
            htmlFor="immaginiMultiple"
            className="inline-block cursor-pointer rounded bg-brand-500 px-4 py-2 text-white text-sm hover:bg-brand-600 transition"
          >
            {ICONimage} Carica Immagini Multiple
          </label>
        </div>

        <div className="lg:col-span-3 flex flex-wrap gap-2 items-start">
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Anteprima ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg border"
            />
          ))}
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
        className="block w-full rounded-lg p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 sm:text-sm"
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
