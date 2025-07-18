import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { logoExtendedFullLight } from '@/app/cosetting';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 0,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    width: "100%",
    backgroundColor: "#004082",
    padding: 20,
    textAlign: "center",
    fontSize: "11pt",
    color: "white",
    fontWeight: "bold",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerDark: {
    width: "100%",
    backgroundColor: "#111111",
    padding: "20 10 20 10",
    textAlign: "center",
    fontSize: "11pt",
    color: "white",
    fontWeight: "bold",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 15,
    textAlign: "center",
    fontSize: "11pt",
    color: "white",
    fontWeight: "bold",
    display: 'flex',
  },
  logo: {
    width: 100,
    alignItems: "center",
    textAlign: "center",
  },
  legalNotice: {
    width: "100%",
    padding: 30,
    textAlign: "justify",
    fontSize: "7pt",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    textAlign: "justify",
    fontSize: "8pt",
    justifyContent: 'center',
    alignItems: 'center',
    color: "#222222",
  },
  bodyTextNote: {
    textAlign: "left",
    fontSize: "6pt",
    justifyContent: 'center',
    alignItems: 'center',
    color: "#222222",
  },
  bodyTextContract: {
    textAlign: "justify",
    fontSize: "9pt",
    justifyContent: 'center',
    alignItems: 'center',
    color: "#ffffff",
    marginTop: "3px",
  },
  bodyTextDate: {
    textAlign: "justify",
    fontSize: "9pt",
    justifyContent: 'center',
    alignItems: 'center',
    color: "#222222",
  },
  bodyTextTitle: {
    textAlign: "justify",
    fontSize: "9pt",
    justifyContent: 'center',
    alignItems: 'center',
    color: "#ffffff",
  },
  bodyBorderArea: {
    border: "1px solid #d9d9d9",
    borderRadius: 10,
    padding: 10,
    margin: "2px 0px 2px 0px"
  },
  bodyBorderAreaDark: {
    border: "1px solid #004082",
    borderRadius: 10,
    padding: "5 10 5 10",
    margin: "4px 0px 4px 0px",
    backgroundColor: "#004082",
    textTransform: 'uppercase'
  },
  twoColumn:{
    width:"100vw",
    display: "flex",
    flexDirection: "row",
    padding: 0,
  },
  column:{
    width:"45%",
    border: "1px solid #004082",
    borderRadius: 10,
    padding: "5 5 5 5",
    margin: "4px 4px 4px 4px",
    backgroundColor: "#004082",
    color:"ffffff",
    textTransform: 'uppercase'
  },
  columnWhite:{
    width:"45%",
    border: "1px solid #004082",
    borderRadius: 10,
    padding: 18,
    margin: "4px 4px 4px 4px",
    backgroundColor: "#ffffff",
    color:"ffffff",
    textTransform: 'uppercase'
  }
});

export default function ContractPDF(data) {
  return (
  <Document>
    <Page style={styles.page}>
      <View style={styles.header}>
        <Image src={logoExtendedFullLight} height={50} width={50}/>
      </View>
      <View style={styles.headerDark}>
        <Text>CONTRATTO DI NOLEGGIO AUTOVEICOLI SENZA CONDUCENTE (D.P.R 481 DEL 2001)</Text>
        <Text style={styles.bodyTextContract}>
            UUID: {data.UUID}
          </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyBorderAreaDark}>
          <Text style={styles.bodyTextTitle}>
            1. Intestatario del Contratto e conducente del veicolo
          </Text>
        </View>
        <View style={styles.bodyBorderArea}>
          <Text style={styles.bodyText}>
            Io sottoscritto/a {data.nome} {data.cognome} nato/a a {data.luogoDiNascita} il {data.dataDiNascita} / codice fiscale: {data.codiceFiscale} e residente a {data.cittaResidenza} 
            in {data.viaResidenza}, {data.civicoResidenza} con documento d'identità n° {data.numeroCartaIdentita} con scadenza il {data.scadenzaCartaIdentita} e patente
            n° {data.numeroPatente} con scadenza il {data.scadenzaPatente} rilasciata da {data.enteRilascioPatente} sottoscrivo contratto di noleggio del
            veicolo descritto al punto (2) del seguente documento.
          </Text>
        </View>
        {data.nomeSecondoConducente ? (
          <View style={styles.bodyBorderArea}>
            <View>
              <Text style={styles.bodyText}>SECONDO CONDUCENTE:</Text>
            </View>
            <Text style={styles.bodyText}>{data.nomeSecondoConducente} {data.cognomeSecondoConducente} nato/a a {data.luogoDiNascitaSecondoConducente} il {data.dataDiNascitaSecondoConducente} / codice fiscale: {data.codiceFiscaleSecondoConducente} e residente a {data.cittaResidenzaSecondoConducente} 
            in {data.viaResidenzaSecondoConducente}, {data.civicoResidenzaSecondoConducente} con documento d'identità n° {data.numeroCartaIdentitaSecondoConducente} con scadenza il {data.scadenzaCartaIdentitaSecondoConducente} e patente
            n° {data.numeroPatenteSecondoConducente} con scadenza il {data.scadenzaPatenteSecondoConducente} rilasciata da {data.enteRilascioPatenteSecondoConducente}</Text>
          </View>
          ) : ("")}
        <View style={styles.bodyBorderAreaDark}>
          <Text style={styles.bodyTextTitle}>
            2. Dati veicolo noleggiato
          </Text>
        </View>
        <View style={styles.bodyBorderArea}>
          <Text style={styles.bodyText}> 
            {data.marca} {data.modello} - targa: {data.targa}
          </Text>
          <Text style={styles.bodyTextNote}>*i veicoli noleggiati sono tutti di proprietà della BROCAR2 di Gianluca Buonincontri con sede in Via Camillo Cucca,
          287/289 - 80031 Brusciano (NA)</Text>    
        </View>
        <View style={styles.bodyBorderAreaDark}>
          <Text style={styles.bodyTextTitle}>
            3. Dati contratto
          </Text>
        </View>
        <View style={styles.bodyBorderArea}>
          <Text style={styles.bodyTextDate}>
            Il seguente contratto sarà da considerarsi valido dalle ore: {data.orarioDiConsegnaIn} del giorno {data.dataInizio}
            fino alle ore {data.orarioDiConsegnaOut} del giorno {data.dataFine}.
          </Text>
          <Text style={styles.bodyTextDate}>
            Il veicolo sarà consegnato dalla BROCAR2 presso la città di {data.luogoDiConsegnaOut} e verrà riconsegnato dal contraente
            del seguente contratto presso la città di {data.luogoDiConsegnaIn}.
          </Text>
        </View>
        {data.tariffa ? (
          data.sconto ? (
            <View style={styles.bodyBorderArea}>
              <Text style={styles.bodyText}>
                La tariffa giornaliera scontata del {data.sconto}% riservata a te è pari ad €{data.tariffaScontata} / €{data.tariffa}</Text>
            </View>
          ) : (
            <View style={styles.bodyBorderArea}>
              <Text style={styles.bodyText}>
                La tariffa giornaliera riservata a te è pari ad €{data.tariffa}</Text>
            </View>
          )
        ) : (
          data.sconto ? (
            <View style={styles.bodyBorderArea}>
              <Text style={styles.bodyText}>
                La tariffa mensile scontata del {data.sconto}% riservata a te è pari ad €{data.tariffaScontataMensile} / €{data.tariffaMensile}</Text>
            </View>
          ) : (
            <View style={styles.bodyBorderArea}>
              <Text style={styles.bodyText}>
                La tariffa mensile riservata a te è pari ad €{data.tariffaMensile}</Text>
            </View>
          )
        )}
        <View style={styles.twoColumn}>
            <View style={styles.column}>
              <Text style={styles.bodyTextTitle}>DANNI AUTO IN USCITA</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.bodyTextTitle}>DANNI AUTO IN ENTRATA</Text>
            </View>
        </View>
        <View style={styles.bodyBorderArea}>
          <Image src="#" height={50} width={50}/>    
        </View>   
        <View style={styles.bodyBorderArea}>
          <Text style={styles.bodyTextNote}> 
            La franchigia casco è pari ad €{data.franchigiaCasco} e in caso di furto e/o incendio è pari ad €{data.franchigiaFurtoIncendio}.
            Il contraente è responsabile di ogni danno riportato al fondo o al tetto del veicolo ed inoltre verranno addebbitati costi per ogni addebito/contravvenzione o perdita di fatturato nel caso di veicolo sottoposto a fermo o a sequestro.
          </Text>    
        </View>
        <View style={styles.twoColumn}>
            <View style={styles.columnWhite}>
              <Text style={styles.bodyText}>NOLEGGIATORE</Text>
              <Text style={styles.bodyText}>BROCAR2 di Buonincontri Gianluca</Text>
            </View>
            <View style={styles.columnWhite}>
              <Text style={styles.bodyText}>FIRMA DEL CONTRAENTE</Text>
            </View>
        </View>
      </View>
    </Page>
    <Page style={styles.page}>
      <View style={styles.legalNotice}>
        <Text>
        Note: Dichiaro di non aver effettuato alcun sinistro e non aver compilato alcun modulo CID (Convenzione indennizzo diretto) o CAI (Costatazione Amichevole d'incidente stradale)
        Il cliente è respondabile di ogni danno riportato al fondo o al tetto del veicolo.
        Il cliente è respondabile per ogni addebito o perdita di fatturato nel caso di veicolo sottoposto a fermo o a sequestro.
        n.b. il cliente firmando il presente contratto, dichiara di aver ricevuto, firmato e visionato le condizioni di noleggio
        </Text>
        <Text>
        NOTE LEGALI:
        1 - Brocar2 (qui di seuito denominata LOCATORE) consegna al locatario (qui di seguito denominato CLIENTE) l'autoveicolo che ha il serbatoio pieno di carburante (l'autoveicolo al rientro dovra essere riconsegnato con il serbatoio pieno di carburante altrimenti verrà addebitato un supplemento per il sevizio di rifornimento pari al costo attuale dello stesso), il triangolo per la sosta, degli attrezzi usuali, della ruota di scorta, della carta verde assicurativa e di tutti i documenti necessari incluso il certificato e il contrssegno di assicurazione nonchè degli altri accessori. Il cliente prendendo l'autoveicolo riconosce che il medesimo è in ottimo stato di manutenzione ed idoneo all'uso pattuito ed altresi che esso è dotato di tutti gli oggetti sopraindicati.    
        2 - Il locatore garantisce che contro la responsabilità civile del cliente e di qualsiasi altra persona autorizzata a condurre l'autoveicolo (come da contratto) è in vigore una normale polizza assicurativa che prevede una garanzia con massimale unico di Euro 1.500.000,00 per danni alle persone, alle cose o animali. In caso di eccedenza dal predetto massimale il Cliente si assume la responsabilità esclusiva e personale esonerando il Locatore nei confronti di terzi. La polizza non copre i danni subiti dal guidatore salvo espressa richiesta del Cliente a pagamento come da contratto nè la sua responsabilità civile per i danni iportati da iterzi trasportati, cosi come specificato nella polizza di assicurazione, le cui clausule e condizioni il Cliente dichiara di accettare e di impegnarsi a rispettare. Siglando l'apposito riquadro assicurazione personale si acquista e si usufruisce pertanto di una speciale polizza assicurativa per i danni subiti dal guidatore (spese mediche, invalidità e morte).
        3 - OBBLIGHI DEL CLIENTE
        CIl Cliente si obbliga: a) a condurre l'autoveicolo e a custodirlo assieme agli accessori e documenti, diligentemente e nel rispetto di tutte le norme di legge. b) a curarne la manutenzione ordinaria, l'ingrassaggio, il controllo dei livelli dei lubrificanti e l'olio dei freni. c) a procedere all'oblazione anche successivamente alla riconsegna del veicolo di qualsiasi contravvenzione incorsa durante la locazione e a rimborsare il Locatore di qualsiasi altra spesa sostenuta ed in ogni caso la semplice notificazione del verbale di contestazione della multa dà diritto al locatore di addebitare forfettariamente la somma di Euro 35,00 per spese inerenti. Il Cliente accetta sin d'ora di pagare tale cifra a mezzo di carta di credito tipo Visa, American Express, etc... d) a tenere indenne il Locatore da qualsiasi pretesa avanzata da terzi per danni da essi subiti nei beni trasportati o comunque trovarsi sul'autoveicolo. Il Cliente riconosce di non essere titolare di alcun diritto reale sull'autoveicolo e di non poterne, pertando, disporre neanche a guisa di pegno.
        4 - Il Cliente si impegna a non condurre ad usare l'autoveicolo, e a non permettere e/o tollerare che altri lo conduca od usi: a) in uno stato diverso da: Italia, Francia, Germania, Spagna, Portogallo, Andorra, Città del Vticano, San Marino, Principato di Monaco, Svizzera, Belgio, Olanda, Svezia, Danimarca, Norvegia, Finlandia, Liechtenstein, Corsica, Inghilterra, Irlanda, Lussemburgo; b) Inoltre, senza esclusione gli obblighi del precedente punto "a", ove non sia valida la carta assicurativa o dove vi siano disordini politici; c) per il trasporto di persone o di cose; d) competenze o prove di velocità; e) in eccesso di velocità; f) per uno scopo contrario alla legge; g) se si tratta di persona non indicata a pag. I della lettera di noleggio o in stato di ebbrezza: h) se si tratta di persona che ha fornito al locatore informazioni false circa la propria età, nome, ndirizzo, luogo e data di riconsegna del veicolo a fine noleggio. Il cliente si obbliga a non consegnare in alcun caso che l'autoveicolo sia condotto da persona di età inferiore a 21 anni o superiore  73 anni, o priva di patente di guida valida nello stato del quale l'autoveicolo è condotto. Inoltre per noleggiare una vettura di cilindrata 1400cc. (compresa) bisogna avere 23 anni e la patente rilasciata da almeno 3 anni. In ogni caso il cliente è tenuto ad osservare la normativa prevista dal nuovo codice della strada.
        5 - Il Cliente si obbliga a risarcire il Locatore di qualsiasi danno per qualsiasi ragione occorso all'autoveicolo in ogni caso di sinistro avvenuto, senza una collisione con altro veicolo.
            Il Cliente si obbliga a risarcire al Locatore tutti i danni occorsi alla vettura ed alle successive sostituzioni di vetture oggetto del presente contratto.
            Qualora il danno sia avvenuto senza che violasse alcuna delle obbligazioni contrattualmente assunte e comunque senza sua colpa, la la responsabilità del cliente è tuttavia limitata alla franchigia dovuta in ogni caso all'incidente, stabilita dal tariffario vigente al momento della sottoscrizione del presente contratto di cui dichiara di aver preso visione. Per avvalersi di tale limitazione di responsabilità il cliente è però tenuto a comunicare tassativamente nelle successive 24 ore per iscritto una relazione dettagliata o compilare il modello C.1.D. (costatazione amichevole), di cui l'autovettura è provvista, dell'avvenuto incidente. Siglando l'apposito riquadro nella lettera di noleggio, si acquista la Copertura Danni da Collisione (Cop. Danni); Il Cliente cosi è liberato dalle obbligazioni del presente articol, qualora si tratti di danni occorsi in una collisione con un altro veicolo identificato e purchè avvenuti senza violazione di norme penali, del codice della strada e e di alcuna delle obbligazioni previste dagli art. 3 e 4 delle presenti condizioni generali. Non rientrano nella copertura danni: le ruote e i copri ruote, la parte sottostante del veicolo sottoporta sottoscocca, la tappezzeria, tetto e gli interni, i critalli, lo smarrimento dei documenti del veicolo, nonchè i danni derivanti dal rifornimento effettuato con carburante diverso da quello previsto per il veicolo noleggiato. Il Cliente si obbliga a rimborsare in contanti o ad autorizzare l'incasso mediante carta di creditofinanziaria per l'intero ammontare della franchigia prevista per ogni singola vettura prima dell'inizio del noleggio a titolo cauzionale.
            L'importo depositato verrà restituito o sbloccato, in caso di autorizzazione ad incassare su carta di credito finanziaria alla fine del noleggio,  se la vettura verrà riconsegnata integra e senza danni, in caso contrario il deposito verrà trattenuto per intero. In caso di incidente con ostacoli fissi, con automezzo o altro non identificato, al Cliente verranno addebitati i danni subiti dal veicolo e inoltre un importo secondo le nostre tariffe ufficiali pari a quello che sarebbe stato dovuto se il noleggio fosse proseguito per un periodo pari al tempo necessari per l'esecuzione delle riparazioni (tale periodo sarà determinato secondo le tabelle dell'ANIA in vigore al momento della consegna). In ogni caso il Cliente rimane responsabile per la franchigia stessa prevista dalle condizioni anche se ha acquistato e firmato per l'assicurazione copertura danni da collisione. L'addebito relativo ai pezzi di ricambio , manodopera o traino, s'intende ai prezzi di listino delle case fornitrici, oltre un importo secondo le nostre tariffe ufficiali pari a quello che sarebbe stato dovuto se il noleggio fosse proseguito per un periodo pari al tempo necessario per l'esecuzione delle riparazioni (tale periodo sarà determinato secondo le tabelle dell'ANIA in vigore al momento della consegna).
        6 - Qualora accade un incidente, il Cliente si obbliga: a) ad informare immediatamente con un telegramma o con un fax il Locatore, trasmettendogli nelle prossime 24 ore una relazione dettagliata compilata sul modulo accluso ai documenti dell'autoveicolo; b) informare la più vicina autorità di Polizia e farsi rilasciare una copia del rapporto che deve essere inoltrata alla stazione di noleggio entro le 24 ore; c) compilare una costatazione amichevole di incidente in tutte le sue part, firmata e farla firmare alla controparte, prendendo nota dei nomi e degli indirizzi delle parti e dei testimoni, dei numeri di targa di tutti gli autoveicoli coinvolti, dei dati relativi all'assicurazione e alla priorità di tali autoveicoli: d) fornire al locatore qualsiasi altra notizia utile; e) seguire le istruzioni che il Locatore fornirà relativamente alla custodia alle riparaziioni dell'autoveicolo. Nel caso in cui il Cliente non presenta la costatazione amichevole di incidente compilata in ogni sua parte, e firmata dalla controparte, insieme al rapporto compilata dalla Polizia e dalle Autorità del luogo, il Cliente rimane responsabile di tutti i dalli dell'autovettura. Il Cliente è tenuto al pagamento dei danni in caso di sinistro anche se potenzialmente attivo se non può comuncìre tutti i danni delle controparti. Numero di patente, nome, targa, Numero di Polizza, etc....
        7 - Il Cliente si obbliga a riconsegnare l'autoveicolo e le chiavi nel luogo ed entro la data indicata a pagina uno della lettera di noleggio o comunque appena il Locatore gliene faccia richiesta, con i medesimi accessori e nel medesimo stato nel quale l'ha ricevuta. Qualora l'autoveicolo non sia riconsegnato al Locatore entro tale data, il Locatore potrà riprendere possesso materiale dell'autoveicolo in qualsiasi modo, anche contro la volonta del Cliente, e quest'ultimo sarà tenuto a rimborsarlo delle spese sostenute, anche mediante addebito su carta di credito. Il Locatore in questo caso è esonerato da qualsiasi responsabilità in ordine o eventuali oggetti che il Cliente abbbia lasciato all'interno dell'autoveicolo.
        8 - Il Cliente si obbliga a corrispondere al locatore, u sua richiesta, la tariffa chilometrica e la tariffa a tempo; La tariffa dovuta qualora l'autoveicolo sia riconsegnato in luogo diverso dal luogo pattuito; IVA in vigore al momento dell chiusura dele contratto la somma necessaria per riportare all'originario livello il serbatoio di benzina e/o gasolio, nonchè le speciali tariffe previste per la "COPERTURA DANNI AUTO", la "COPERTURA FURTO E INCENDIO" "ASSICURAZIONE PERSONALE", Franchigie Furto/Incendio o Danni e per il servizio di rifornimento se dovute. La tariffa chilometrata è determinata mediante lettura del contachilometri. Il Cliente è tenuto a controllare periodicamente che il contachilometri funzioni e si obbliga a far conoscere immediatamente al Locatore difetti di funzionamento, seguendo, in tal caso, le istruzioni che gli saranno impartite. Se al momento della riconsegna, il contachilometri appare manomesso o guasto, la tariffa chilometrica è determinata sulla base di una percorrenza di 250 chilometri al giorno. Tutte le volte che si deve commisurare una tariffa al numero dei giorni, il termine "GIORNO" definisce un periodo di 24 ore, o grazione decorrente dal momento nel quale l'autoveicolo è stato conegnato al cliente, a meno che, la tariffa non preveda diversamente. Per tutti i noleggi che iniziano presso l'aeroporto verrà applicato un onere aeroportuale calcolato percentualmente sull'intero ammontare del noleggio, compreso sugli extra ed escluso carburante e tasse. Le vetture di gruppo "A" devono essere riconsegnate presso la stessa stazione, altrimenti verrà addebitata la tariffa del gruppo "II". In ogni caso se il Cliente lascia la vettura di qualsiasi gruppo in una stazione diversa da quella da dove è iniziato il noleggio, sarà applicato il supplemento per i viaggi a lasciare (VAL) in base alle tariffe vigenti.
        9 - Chi stipula la locazione in nome e per conto di un terzo riponde in solido con questi della piena osservanza degli obblighi contenuti a Lettera di Noleggio. Il Cliente risponde, in ogni caso, delle azioni ad omissioni di chiunque conduca l'autoveicolo.
        10 - In caso di furto o incendio dell'autoveicolo, il Cliente si obbliga a denunciare il fatto alle Autorità di Polizia ed a consegnare al Locatore copia autentica della denuncia . In tal caso il nolo è dovuto fino alla data di consegna della copia della denuncia, alla tariffa concordata del noleggio o alla tariffa in vigore se la denuncia viene consegnata dopo la data di rientro prevista . Insieme con la copia della denuncia il Cliente dovrà riconsegnare al Locatore le chiavi dell'autoveicolo e dell'eventuale anifurto.Quaora egli non le riconsegni, sarà facoltà del Locatore esigere il pagamento di una somma pari all'intero valore del veicolo. Il Cliente s'impegna quindi, su richiesta del Locatore, a pagare l'importo predetto. La polizza incendio e furto copre il valore dell'autoveicolo in eccedenza alla franchigia in vigore al momento della sottoscrizione del presente contratto. Siglando per accettazione l'apposito riquadro della lettera di noleggio (copertura furto e incendio - T.L.W. il Cliente è liberato dal pagamento della franchigia assicurativa iniziale. In caso di furto o incendio, comunque, il Cliente rimane responsabile della franchigia fissa, anche se ha accetttato e acquistato l'assicurazione T.L.W. il Cliente dovra versare l'intero ammontare della franchigia in vigore al momento dell'inizio del noleggio a titolo cauzionale, o autorizzarne l'incasso mediante carta di credito finanziaria. Questo importo verrà restituito o sbloccato alla fine del noleggio se l'autoveicolo verrà riconsegnato integro e senza danni. In caso di furto o incendio, anche parziale, la franchigia verrà trattenuta o ncassata per intero. Siglando per accettazione l'apposito riquadro della lettera di noleggio (copertura totale furto  incendio - T.L.W.) e acquistando tale assicurazione, il Cliente è liberato dal pagamento della franchigia fissa per il versamento del deposito cauzionale.
        11 - Sarà emessa fattura soltando quando questa sia stata richiesta al momento della sottoscrizione del contratto di noleggio ed il Cliente abbia dichiarato codice fiscale o partita IVA.
        12 - Esoneri, esclusioni, controversie, varie - Il Locatore non è responsabile nei confronti del Cliente o di qualsiasi altro soggetto per i danni subiti di qualsivoglia natura, incluso il pregiudizio economico alle persone o ai beni a causa di guasti, furti, incidenti stradali, tumulti, incendi, terremoti, guerre o causa di forza maggiore. Gli oggetti da chiunque lasciati sull'autoveicolo si intendono abbandonati ed il Locatore non è tenuto a custodirli ne a restituirli.
        13 - Il Locatore autorizza il Cliente a condurre la vettura all'estero, previa richiesta ed autorizzazione, (vedi art.4 delle presenti Condizioni generali), in regime di temporanea esportazione, escluso nei paesi dove esiste lo stato di guerra o disordini politici.
        14 - Nessuna modifica puo essere apportata alle presenti Condizioni Generali.
        15 - Il pagamento dell'intero ammontare del noleggio è dovuto al momento della riconsegna dell'autoveicolo e del relativo coontratto. Trascorso il termine pattuito, il Locatore è autorizzato ad emettere nota di addebito per interessi al tasso annuo uficiale di sconto maggiorato di g punti, salvo il risarcimento dei maggiori danni, con decorrenza della data di stipulazione del noleggio.
        16 - Atti vandalici: Tutti i danni conseguenza di atti vandalici compiuti durante il periodo in cui l'autoveicolo è stato in possesso del cliente, sono imputabili a quest'ultimo, che sarà tenuto al loro immediato risarcimento.
        17 - Il testo in italiano delle presenti Condizioni Generali prevede in caso di divertita sul testo inglese perchè si presume che esso esprima tutta la volontà delle parti.
        18 - Per qualsiasi controversia fra le parti è competente il Foro di Catania.
        </Text>
        <Text>
        DELAYED CHARGE AGREEMENT
        Il/la sottoscritto/a titolare della carta utilizzata al momento del noleggio riconosce ed accetta sin d'ora tutte le spese (carburante, franchigie assicurative, multe o danni) rilevate o riscontrate dopo la consegna della vettura ed autorizza l'autonoleggio Arcoauto ad Addebitarle sulla Carta di Credito. Informativa e richiesta di consenso al trattamento dei dati personali ai sensi del D.Igs. 196/2003
        Il ottemperanza agli obblighi previsti dal Decreto Legislativo 30 giugno 2003 n.196 in maniera di trattamento dei dati personali. Con la presente intendiamo informarLa/Vi che la società Brocar2, sottoporrà al trattamento i dati personali che riguardano Lei/Voi. Il trattamento dei dati personali sarà effettuato esclusivamente in ottemperanza agli adempimenti di legge connessi a norme civilistiche, fiscali, contabili, alla gestione amministrativa del rapporto contrattuale della presente. Nel rispetto dell'art. 13 (informativa), art.7 (diritto di accesso ai dati personali ed altri diritti) che qui si intendono integralmente riportati., il cui testo (art.13) viene consegnato alla parte in separata stampa. I dati saranno trattati manualmente e/o con l'ausiliodi strumenti informatici idonei a garantire i limiti di sicurezza e riservatezza previsti dall'art. II del D.Igs. 196/2003. Il titolare del trattamento dei dati è la scrivente società.
        </Text>
      </View>
    </Page>
  </Document>
  );
}
