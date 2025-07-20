'use client';
import React from 'react';
import BottoneDownloadContratto from './printContractButtonDownload';

export default function ContractExportPDF(props) {
  const handleDownload = async () => {
    try {
      const res = await fetch('/api/genera-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props),
      });

      if (!res.ok) throw new Error('Errore nella generazione del PDF');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${props.veicolo.targa} - ${props.cliente.nome} ${props.cliente.cognome} ${props.dataUscita}-${props.dataEntrata}` || 'contratto_noleggio.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert('Errore durante il download del PDF.');
    }
  };

  return (
    <>
    <BottoneDownloadContratto action={handleDownload}/>
    </>
  );
}
