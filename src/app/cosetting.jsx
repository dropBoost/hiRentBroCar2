import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope, faSquarePhone, faGauge, faUsers, faAddressBook, faFolder, faFileContract, faCar, faCalendarDays, faCarOn, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'

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
const ICONnoleggioAuto = <FontAwesomeIcon icon={faCar}/>
const ICONvenditaAuto = <FontAwesomeIcon icon={faMoneyCheckDollar}/>

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
    {name:'whatsApp',link:'https://www.whatsapp.com',icon: ICONwhatsApp, info:"+39 366 35 85 395",attivoWeb:"true"},
    {name:'facebook',link:'fasc',icon: ICONfacebook, info:"@facebbok",attivoWeb:"true"},
    {name:'instagram',link:'#',icon: ICONinstagram, info:"@instagram",attivoWeb:"true"},
    {name:'tiktok',link:'#',icon: ICONtikTok, info:"@tiktok",attivoWeb:"true"},
    {name:'email',link:'#',icon: ICONemail, info:"info@email.it",attivoWeb:"true"},
    {name:'tel',link:'dsda',icon: ICONtel, info:"+39 366 35 85 395",attivoWeb:"true"},
  ]

export const moduliGestionale = [
    {name:'dashboard', link:'/gestionale/dashboard', linkActive:'dashboard', icon: ICONdashboard, label:'dashboard', attivo:'true'},
    {name:'anagraficaClienti', link:'/gestionale/anagrafica-clienti', linkActive:'anagrafica-clienti', icon: ICONusers, label:'anagrafica clienti', attivo:'true'},
    {name:'redazioneContratti', link:'/gestionale/redazione-contratti', linkActive:'redazione-contratti', icon:ICONredazioneContratti, label:'redazione contratti', attivo:'true'},
    {name:'archivioContratti', link:'/gestionale/archivio-contratti', linkActive:'archivio-contratti', icon: ICONarchivioContratti, label:'archivio contratti', attivo:'true'},
    {name:'calendario', link:'/gestionale/calendario',  linkActive:'calendario', icon:ICONcalendario, label:'calendario', attivo:'true'},
    {name:'noleggioAuto', link:'/gestionale/noleggio-auto', linkActive:'noleggio-auto', icon: ICONnoleggioAuto, label:'noleggio auto', attivo:'true'},
    {name:'venditaAuto', link:'/gestionale/vendita-auto', linkActive:'vendita-auto', icon: ICONvenditaAuto, label:'vendita auto', attivo:'true'},
  ]