MARKETPLACE

REGOLE:
    - Crea un nuovo repository
    - Tutti gli extra sono facoltativi
    - Il compito di questa settimana è unico per tutte e due le lezioni. Svolgilo alla velocità che ritieni più opportuna. Hai tempo fino alla prima lezione del prossimo modulo.
    - E' l'ultimo compito del modulo, quindi è normale che sia un po' più complesso.
    - Richiederà di utilizzare TUTTO quello che hai visto durante questo modulo!

ESERCIZI - Pag.1:
    - Il tuo obiettivo è di creare un finto e-commerce con le funzionalità di gestione dei prodotti. Non sarà prevista alcuna funzionalità di pagamento.
    - Le features da implementare sono:
        - Una frontpage, dove si vedono tutti prodotti
        - A back office da cui aggiungere nuovi prodotti e modificare quelli già esistenti
        - Una pagina prodotto
    - Nel backoffice, implementa un form per aggiungere un nuovo prodotto al database. Il prodotto deve essere strutturato come nella prossima slide
    - Cliccando su un prodotto, l'utente deve essere reindirizzato ad una pagina prodotto. Passa l'id come query string nell'URL.
    - Nella pagina prodotto, mostra le informazioni del prodotto su cui si è cliccato. Puoi prendere le informazioni dall'endpoint "product/IL TUO ID QUI"
    - Nel backoffice, aggiungi la funzionalità per modificare un prodotto e un pulsante per eliminarlo.

    {
        "_id" : "5d318e1a8541744830bef139",         // GENERATO DAL SERVER
        "name" : "3310 cellphone",                  // OBBLIGATORIO
        "description" : "An unforgettable icon.",   // OBBLIGATORIO
        "brand" : "Nokia",                          // OBBLIGATORIO
        "imageUrl" : "https://bit.ly/3CExjRa",      // OBBLIGATORIO
        "price" : 100,                              // OBBLIGATORIO
        "userId" : "admin",                         // GENERATO DAL SERVER
        "createdAt" : "2021-09-19T09:32:10.535Z",   // GENERATO DAL SERVER
        "updatedAt" : "2021-09-19T09:32:10.535Z",   // GENERATO DAL SERVER
        "__v" : 0                                   // GENERATO DAT SERVER
    }

    - I campi che dicono "GENERATO DAL SERVER" non serve che siano inviati all'API.
    - L'endpoint è: https://striveschool-api.herokuapp.com/api/product/
    - Sia per GET che per POST.
        Per PUT e  DELETE è necessario specificare l'id
    - https://striveschool-api.herokuapp.com/api/product/:ID QUI

    ** IMPORTANTE **
    OGNI CHIAMATA DEVE ESSERE AUTENTICATA.
    - Ogni richiesta a questo API deve includere un token per ottenere l'accesso.
        Puoi ottenere il token qui: https://strive.school/studentilogin
    - Esempio:
    fetch('https://striveschool-api.herokuapp.com/api/product/',{
        headers: {
            Authorization: 'Bearer XXXXXXXXXXXXXXXXXXXX'
        }
    })
    - Dove 'XXXXXXXXXXXXXXXXXXXX' deve essere sostituito dal token preso dalla pagina menzionata in precedenza.
    CENTRO RISOLUZIONE PROBLEMI/FAQ:
    Imparare a leggere gli errori è fondamentale!
        - DOMANDA: Ricevo solo un array vuoto, perché?**
        - RISPOSTA: L'API ti invierà solo i prodotti che TU hai aggiunti. Prova a creare qualcosa con POST e controlla di nuovo.
            
        - DOMANDA: Ricevo un errore 500, come posso risolvere?**
        - RISPOSTA: Controlla nella network tab del tuo inspector per vedere l'errore specifico.
        - Solitamente:
            1. Ti manca un field nel corpo
            2. Hai una "duplicate key", cioè il nome del prodotto esiste già
            3. Hai inviato il tipo sbagliato di dati (una stringa invece di un numero o simili)