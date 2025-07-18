import { NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import ContractPDF from '@/app/gestionale/(applicativi)/archivio-contratti/componenti/pdf/ContractPDF';


export async function POST(req) {
  const data = await req.json();

  const pdfBuffer = await pdf(<ContractPDF {...data} />).toBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="contratto.pdf"',
    },
  });
}
