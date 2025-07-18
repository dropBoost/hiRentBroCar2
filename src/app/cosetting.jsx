import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faSquarePhone, faGauge, faUsers, faAddressBook, faFolder, faFileContract, faCar, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

const ICONfacebook = <FontAwesomeIcon icon={faFacebook}/>
const ICONwhatsApp = <FontAwesomeIcon icon={faWhatsapp}/>
const ICONtikTok = <FontAwesomeIcon icon={faTiktok}/>
const ICONinstagram = <FontAwesomeIcon icon={faInstagram}/>
const ICONtel = <FontAwesomeIcon icon={faSquarePhone}/>
const ICONemail = <FontAwesomeIcon icon={faEnvelope}/>

const ICONdashboard = <FontAwesomeIcon icon={faGauge}/>
const ICONusers = <FontAwesomeIcon icon={faAddressBook}/>
const ICONredazioneContratti = <FontAwesomeIcon icon={faFileContract}/>
const ICONarchivioContratti = <FontAwesomeIcon icon={faFolder}/>
const ICONcalendario = <FontAwesomeIcon icon={faCalendarDays}/>
const ICONparcoAuto = <FontAwesomeIcon icon={faCar}/>

// PERSONALIZZAZIONI

export const companyName = "BROCAR2"
export const logoDark = "/logoDark.png"
export const logoLight = "/logoWhite.png"
export const logoFullDark = "/logoDark.png"
export const logoFullLight = "/logoWhite.png"
export const logoExtendedDark = "/logoExtendedDark.png"
export const logoExtendedLight = "/logoExtendedWhite.png"
export const logoExtendedFullDark = "/logoExtendedFullDark.png"
export const logoExtendedFullLight = "/logoExtendedFullWhite.png"
export const colorBrand = "#004082"
export const colorDark = "#272726"
export const whatsAppContactLink = "#"
export const emailContact = "info@brocar2.it"

export const socialLink = [
    {name:'whatsApp',link:'https://www.whatsapp.com',icon: ICONwhatsApp, info:"+39 366 35 85 395"},
    {name:'facebook',link:'fasc',icon: ICONfacebook, info:"@facebbok"},
    {name:'instagram',link:'#',icon: ICONinstagram, info:"@instagram"},
    {name:'tiktok',link:'#',icon: ICONtikTok, info:"@tiktok"},
    {name:'email',link:'#',icon: ICONemail, info:"info@email.it"},
    {name:'tel',link:'dsda',icon: ICONtel, info:"+39 366 35 85 395"},
  ]

export const moduliGestionale = [
    {name:'dashboard', link:'./dashboard', linkActive:'dashboard', icon: ICONdashboard, attivo:'true'},
    {name:'anagraficaClienti', link:'./anagrafica-clienti', linkActive:'anagrafica-clienti', icon: ICONusers, attivo:'true'},
    {name:'redazioneContratti', link:'./redazione-contratti', linkActive:'redazione-contratti', icon:ICONredazioneContratti, attivo:'true'},
    {name:'archivioContratti', link:'./archivio-contratti', linkActive:'archivio-contratti', icon: ICONarchivioContratti, attivo:'true'},
    {name:'calendario', link:'./calendario',  linkActive:'calendario', icon:ICONcalendario, attivo:'true'},
    {name:'parcoAuto', link:'./parco-auto', linkActive:'parco-auto', icon: ICONparcoAuto, attivo:'true'},
  ]