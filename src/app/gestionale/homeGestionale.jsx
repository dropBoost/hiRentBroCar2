'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEgg, faCloud, faCalendarWeek, faUser, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { moduliGestionale } from '../cosetting';

const iconaDashboard = <FontAwesomeIcon icon={faCloud} className='h-[100px]' />
const iconaGestioneMenu = <FontAwesomeIcon icon={faEgg}  className='h-[100px]' />
const iconaRedazionePreventivi = <FontAwesomeIcon icon={faCirclePlus} className='h-[100px]'  />
const iconaAgendaEventi = <FontAwesomeIcon icon={faCalendarWeek} className='h-[100px]'  />
const iconaClienti = <FontAwesomeIcon icon={faUser} className='h-[100px]'  />

export default function HomeGestionale () {

 const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-5 bg-neutral-900 overflow-auto h-full auto-rows-[200px]">
  {moduliGestionale
    .filter(moduli => moduli.attivo === "true")
    .map((modulo, index) => (
      <Link
        key={index}
        href={`/gestionale/${modulo.linkActive}`}
        className={`flex flex-col items-center justify-center rounded-[1.5rem] p-4 w-full aspect-square h-full transition duration-700 ${
          isActive(`/gestionale/${modulo.linkActive}`)
            ? 'bg-brand-500'
            : 'bg-white text-brand-500 hover:bg-brand-500 hover:text-neutral-200'
        }`}
      >
        <span className='text-[60px]'>{modulo.icon}</span>
        <span className='mt-3 text-sm uppercase text-center break-words'>{modulo.label}</span>
      </Link>
  ))}
</div>

  );
}