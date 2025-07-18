'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCloud, faCalendarWeek, faUser, faCirclePlus, faFileZipper  } from '@fortawesome/free-solid-svg-icons';
import { moduliGestionale } from '@/app/cosetting';

const iconaDashboard = <FontAwesomeIcon icon={faCloud} className='max-h-[15px]' />
const iconaArchivioPreventivi = <FontAwesomeIcon icon={faFileZipper} className='max-h-[15px]'  />
const iconaGestioneFoto = <FontAwesomeIcon icon={faCamera}  className='max-h-[15px]' />
const iconaRedazionePreventivi = <FontAwesomeIcon icon={faCirclePlus} className='max-h-[15px]'  />
const iconaAgendaEventi = <FontAwesomeIcon icon={faCalendarWeek} className='max-h-[15px]'  />
const iconaClienti = <FontAwesomeIcon icon={faUser} className='max-h-[15px]'  />

export default function MenuSidebar () {


 const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
      <ul className="flex flex-row md:flex-col gap-2">
        {moduliGestionale.filter(moduli => moduli.attivo == "true").map(modulo=>(
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
        ))}
      </ul>
  );
    


}