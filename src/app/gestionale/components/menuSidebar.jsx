'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCloud, faCalendarWeek, faUser, faCirclePlus, faFileZipper, faHome  } from '@fortawesome/free-solid-svg-icons';
import { moduliGestionale } from '@/app/cosetting';

const iconaDashboard = <FontAwesomeIcon icon={faCloud} className='max-h-[15px]' />
const iconaArchivioPreventivi = <FontAwesomeIcon icon={faFileZipper} className='max-h-[15px]'  />
const iconaGestioneFoto = <FontAwesomeIcon icon={faCamera}  className='max-h-[15px]' />
const iconaRedazionePreventivi = <FontAwesomeIcon icon={faCirclePlus} className='max-h-[15px]'  />
const iconaAgendaEventi = <FontAwesomeIcon icon={faCalendarWeek} className='max-h-[15px]'  />
const iconaClienti = <FontAwesomeIcon icon={faUser} className='max-h-[15px]'  />
const iconaHome = <FontAwesomeIcon icon={faHome} className='max-h-[15px]'  />

export default function MenuSidebar () {

  const pathname = usePathname();

  // Modifica qui: isActive controlla se pathname inizia con 'path'
  const isActive = (path) => pathname?.startsWith(path);
  const isActiveHome = (path) => pathname == path;

  return (
    <ul className="flex flex-row md:flex-col gap-2">
      <li>
        <Link
          href={`/gestionale`}
          title={`HOME GESTIONALE`}
          className={`flex items-center justify-center rounded-full p-2 md:h-[40px] md:w-[40px] h-[30px] w-[30px] transition duration-700 ${
            isActiveHome(`/gestionale`) ? 'bg-brand-500 text-neutral-100' : 'bg-neutral-100 text-brand-500 hover:bg-brand-500 hover:text-neutral-200'
          }`}
        >
          {iconaHome}
        </Link>
      </li>
      {moduliGestionale
        .filter(moduli => moduli.attivo === "true")
        .map(modulo => (
          <li key={modulo.name}>
            <Link
              href={modulo.link}
              title={modulo.linkActive}
              className={`flex items-center justify-center rounded-full p-2 md:h-[40px] md:w-[40px] h-[30px] w-[30px] transition duration-700 ${
                isActive(`/gestionale/${modulo.linkActive}`) ? 'bg-brand-500 text-neutral-100' : 'bg-neutral-100 text-brand-500 hover:bg-brand-500 hover:text-neutral-200'
              }`}
            >
              {modulo.icon}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
