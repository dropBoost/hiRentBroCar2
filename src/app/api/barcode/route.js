// app/api/barcode/route.js
import bwipjs from 'bwip-js'
import { NextResponse } from 'next/server'

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code') || '000000'

  try {
    const png = await bwipjs.toBuffer({
      bcid: 'code128',      // Tipo di barcode
      text: code,           // Codice da trasformare
      scale: 3,
      height: 10,
      includetext: true,
    })

    return new NextResponse(png, {
      headers: { 'Content-Type': 'image/png' }
    })
  } catch (e) {
    return NextResponse.json({ error: 'Errore generazione barcode' }, { status: 500 })
  }
}
