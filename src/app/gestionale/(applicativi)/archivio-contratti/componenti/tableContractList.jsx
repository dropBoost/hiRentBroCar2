import ContractExportPDF from './printContract'

export default function CardContrattoListRow({ contratto }) {
  const {
    UUID,
    cliente,
    veicolo,
    secondoConducente,
    dataUscita,
    dataEntrata,
    orarioEntrata,
    orarioUscita,
    franchigia,
    tariffaMensile,
    casco,
    sconto,
    tariffaGiornaliera,
    comuneDiConsegna,
    provinciaDiConsegna,
    comuneDiRientro,
    provinciaDiRientro,
  } = contratto || {}
console.log(contratto)
  return (
    <tr className="h-10">
      <td className="px-6 py-1 text-xs text-neutral-100 bg-brand-500 uppercase font-bold">{cliente.nome} {cliente.cognome}</td>
      <td className="px-6 py-1 text-xs text-neutral-100 bg-brand-500/50 uppercase font-bold">
        {veicolo?.targa} {veicolo?.marca} {veicolo?.modello} {veicolo?.anno} / {veicolo?.colore}
      </td>
      <td className="px-6 py-1 text-xs text-center text-neutral-400">
        <span className="flex items-center">{dataUscita}</span>
      </td>
      <td className="px-6 py-1 text-xs text-center text-neutral-400">
        <span className="flex items-center">{dataEntrata}</span>
      </td>
      <td className="px-6 py-1 text-xs text-center text-neutral-100 bg-brand-500/50 font-bold">€ {tariffaGiornaliera}</td>
      <td className="px-6 py-1 flex justify-center items-center text-brand-500">
        <ContractExportPDF
          UUID={UUID}
          cliente={cliente}
          secondoConducente={secondoConducente}
          veicolo={veicolo}
          dataUscita={dataUscita}
          dataEntrata={dataEntrata}
          orarioEntrata={orarioEntrata}
          orarioUscita={orarioUscita}
          franchigia={franchigia}
          tariffaMensile={tariffaMensile}
          casco={casco}
          sconto={sconto}
          tariffaGiornaliera={tariffaGiornaliera}
          comuneDiConsegna={comuneDiConsegna}
          provinciaDiConsegna={provinciaDiConsegna}
          comuneDiRientro={comuneDiRientro}
          provinciaDiRientro={provinciaDiRientro}
          
        />
      </td>
      <td className="px-6 py-1 text-xs text-center text-neutral-400">
        
      </td>
    </tr>
  )
}
