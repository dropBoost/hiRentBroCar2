import { Nunito, Libre_Barcode_128 } from "next/font/google";
import { companyName, logoLight, logoDark, colorBrand, colorDark } from "./cosetting";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const barcode128 = Libre_Barcode_128({
  variable: "--font-libre_Barcode_128",
  subsets: ["latin"],
  weight: "400", 
});

const anno = new Date().getFullYear();

export const metadata = {
  title: `${companyName} • hiRent`,
  description: `${anno} | ${companyName} powered by hiRent`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link rel="icon" href={logoLight} type="image/png"></link>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              ::-webkit-scrollbar {
                width: 0.7rem;
              }
              ::-webkit-scrollbar-track {
                background: #c6c6c6;
              }
              ::-webkit-scrollbar-thumb {
                background: ${colorBrand};
              }
              ::-webkit-scrollbar-thumb:hover {
                background: ${colorDark};
              }
            `,
          }}
        />
      </head>
      <body className={`${nunito.variable} ${barcode128.variable} font-nunito`}>
        <Analytics/>
        <SpeedInsights/>
        {children}
      </body>
    </html>
  );
}
