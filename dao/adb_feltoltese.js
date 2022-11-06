const db = require('../config/db');

class filmUploadDAO {

    async createFilm(cim, leiras, megjelenes, elozetesLink){
        await db.query('INSERT INTO film (cim, leiras, megjelenes, elozetesLink)) VALUES ($1, $2, $3, $4)' [cim, leiras, megjelenes, elozetesLink])
            .catch(console.log);
        return;
    };
};


let cim = "A Keresztapa(1972)";
let leiras = "A gengszterfilmek legnagyobbika, világhírű színészek és rendező munkája, minden idők egyik legnagyobb szabású maffiafilmje, a Keresztapa. A történet bemutatja azokat az embereket és azt a gépezetet, ami az olasz maffiában gyökerezve, a világ leghatalmasabb és legrettegettebb hatalmává vált az Egyesült Államokban. Figyelemmel követhetjük a kegyetlen, gyilkos módszereket, amivel a Corleone család feje dolgozik. Tanúi lehetünk a hihetetlen összetartásnak, az érdekek és a félelem összetartó erejének, ami ezt a világot jellemzi. Emberek sorsa, élet és halál kérdése dől el Don Vito Corleone dolgozószobájában. Egyesek védelemért fordulnak a nagyúrhoz, mások hadüzenettel érkeznek. A rivális maffia, a Tattaglia család ugyanis végső leszámolásra szólította fel a Corleone családot. S a hadüzenet után az egész város lángba borul.";
megjelenes = "1972";
elozetesLink = "https://www.youtube.com/watch?v=HNWB7M6QkeM";


console.log("createFilm meghívva");
let create = new filmUploadDAO().createFilm(cim, leiras, megjelenes, elozetesLink);