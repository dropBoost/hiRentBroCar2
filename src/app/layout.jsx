import { Nunito } from "next/font/google";
import { companyName, logoLight, logoDark, colorBrand, colorDark } from "./cosetting";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
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
      <body className={`${nunito.variable} font-nunito`}>
        {children}
      </body>
    </html>
  );
}
