/* © 2026 TourFlow UB. Alle rettigheter forbeholdt / All rights reserved.
   Koden ligger åpent fordi en nettside må sende koden sin til alle som
   besøker den. Det gir ingen rett til å kopiere, endre eller ta den i
   bruk. Se LICENSE. */

/* templates.js — ferdige turer du kan opprette med ett trykk.
   Brukes bare når noen velger «Lag eksempeltur»; ekte turer bygges i appen.
   Datoene er relative, så en eksempeltur alltid ligger litt fram i tid. */

const TEMPLATES = [
  {
    key: "berlin",
    name: "Berlin",
    org: "Klassetur",
    startInDays: 14,
    lengthLabel: "5 dager",
    blurb: "To hoteller, bytte til Potsdam underveis — viser hvordan «hotellet» betyr ulike steder ulike dager.",

    places: {
      moabit: { name:"Hotel Moabit Plaza", addr:"Stromstraße 62, 10551 Berlin", kind:"Hotell" },
      havel:  { name:"Pension Havelblick", addr:"Zeppelinstraße 136, 14471 Potsdam", kind:"Hotell" },
      brand:  { name:"Brandenburger Tor", addr:"Pariser Platz, 10117 Berlin", kind:"Attraksjon" },
      mauer:  { name:"Gedenkstätte Berliner Mauer", addr:"Bernauer Straße 111, 13355 Berlin", kind:"Museum" },
      tech:   { name:"Deutsches Technikmuseum", addr:"Trebbiner Straße 9, 10963 Berlin", kind:"Museum" },
      hbf:    { name:"Berlin Hauptbahnhof", addr:"Europaplatz 1, 10557 Berlin", kind:"Stasjon" },
      sans:   { name:"Schloss Sanssouci", addr:"Maulbeerallee, 14469 Potsdam", kind:"Slott" },
      osl:    { name:"Oslo lufthavn, terminal 2", addr:"Edvard Munchs veg, 2061 Gardermoen", kind:"Flyplass" }
    },

    days: [
      { offset:0, hotel:"moabit", items:[
        { t:"05:40", title:"Oppmøte innsjekk", place:"osl" },
        { t:"08:10", title:"Fly til Berlin", note:"Gate oppgis på Gardermoen" },
        { t:"12:30", title:"Innsjekk hotell og romfordeling", place:"moabit" },
        { t:"18:00", title:"Felles middag", place:"moabit" }
      ]},
      { offset:1, hotel:"moabit", items:[
        { t:"07:45", title:"Avreise fra lobbyen", place:"moabit" },
        { t:"09:30", title:"Omvisning Berlinmuren", place:"mauer" },
        { t:"12:15", title:"Lunsj på egen hånd", note:"Møtes igjen 13:45" },
        { t:"14:00", title:"Gruppeoppgave: fotodokumentasjon", place:"brand" },
        { t:"18:30", title:"Kveldsmat på hotellet", place:"moabit" }
      ]},
      { offset:2, hotel:"moabit", items:[
        { t:"09:00", title:"Deutsches Technikmuseum", place:"tech" },
        { t:"15:00", title:"Fritid i grupper", note:"Minst tre sammen" },
        { t:"20:00", title:"Innetid", place:"moabit" }
      ]},
      { offset:3, hotel:"havel", items:[
        { t:"08:30", title:"Utsjekk, bagasje på buss", place:"moabit" },
        { t:"10:45", title:"Tog til Potsdam", place:"hbf" },
        { t:"13:00", title:"Innsjekk Potsdam", place:"havel" },
        { t:"15:00", title:"Schloss Sanssouci", place:"sans" }
      ]},
      { offset:4, hotel:"havel", items:[
        { t:"09:15", title:"Utsjekk og avreise", place:"havel" },
        { t:"14:20", title:"Fly til Oslo" }
      ]}
    ],

    channels: [
      { name:"Gruppe muren", sub:"Fotooppgave" },
      { name:"Gruppe museum", sub:"Technikmuseum" },
      { name:"Reiseledere", sub:"Kun ledere" }
    ]
  },

  {
    key: "paris",
    name: "Paris",
    org: "Klassetur",
    startInDays: 21,
    lengthLabel: "5 dager",
    blurb: "Gruppedag der halve klassen skal til Eiffeltårnet og halve til Louvre — to gruppechatter på samme tur.",

    places: {
      lafayette: { name:"Hôtel Lafayette Nord", addr:"18 Rue de Dunkerque, 75010 Paris", kind:"Hotell" },
      eiffel:    { name:"Eiffeltårnet", addr:"Champ de Mars, 5 Avenue Anatole France, 75007 Paris", kind:"Attraksjon" },
      louvre:    { name:"Musée du Louvre", addr:"Rue de Rivoli, 75001 Paris", kind:"Museum" },
      orsay:     { name:"Musée d'Orsay", addr:"1 Rue de la Légion d'Honneur, 75007 Paris", kind:"Museum" },
      sacre:     { name:"Sacré-Cœur", addr:"35 Rue du Chevalier de la Barre, 75018 Paris", kind:"Kirke" },
      cdg:       { name:"Paris Charles de Gaulle, terminal 2E", addr:"95700 Roissy-en-France", kind:"Flyplass" },
      osl:       { name:"Oslo lufthavn, terminal 2", addr:"Edvard Munchs veg, 2061 Gardermoen", kind:"Flyplass" }
    },

    days: [
      { offset:0, hotel:"lafayette", items:[
        { t:"06:00", title:"Oppmøte innsjekk", place:"osl" },
        { t:"08:45", title:"Fly til Paris" },
        { t:"13:30", title:"Innsjekk hotell", place:"lafayette" },
        { t:"17:00", title:"Bli kjent-tur i nabolaget", place:"lafayette" }
      ]},
      { offset:1, hotel:"lafayette", items:[
        { t:"08:15", title:"Avreise fra lobbyen", place:"lafayette" },
        { t:"10:00", title:"Louvre — kunsthistorie", place:"louvre" },
        { t:"14:00", title:"Eiffeltårnet, oppstigning", place:"eiffel" },
        { t:"19:00", title:"Middag på hotellet", place:"lafayette" }
      ]},
      { offset:2, hotel:"lafayette", items:[
        { t:"09:30", title:"Gruppedag", note:"Gruppene velger selv, se gruppechat" },
        { t:"16:30", title:"Felles samling Sacré-Cœur", place:"sacre" },
        { t:"21:00", title:"Innetid", place:"lafayette" }
      ]},
      { offset:3, hotel:"lafayette", items:[
        { t:"10:00", title:"Musée d'Orsay", place:"orsay" },
        { t:"14:00", title:"Fritid i grupper", note:"Minst tre sammen" }
      ]},
      { offset:4, hotel:"lafayette", items:[
        { t:"08:00", title:"Utsjekk", place:"lafayette" },
        { t:"12:40", title:"Fly til Oslo", place:"cdg" }
      ]}
    ],

    channels: [
      { name:"Gruppe Eiffeltårnet", sub:"Onsdag" },
      { name:"Gruppe museum", sub:"Onsdag" },
      { name:"Reiseledere", sub:"Kun ledere" }
    ]
  },

  /* En tur som alt er i gang. De to andre malene starter om to og tre
     uker, og da viser «I dag» bare en nedtelling — dagstripa og
     nå-kortet får ingenting å vise. Denne startet i går, så i dag er
     dag 2 og skjermen er i full drift. Til å prøve appen med. */
  {
    key: "test",
    name: "Testtur — pågår nå",
    org: "Testklasse",
    startInDays: -1,
    lengthLabel: "4 dager, dag 2 i dag",
    blurb: "Startet i går, så «I dag» har program, dagstripe og neste punkt med én gang. Bruk denne til å prøve appen.",

    places: {
      hotell:  { name:"Hotel Bedford", addr:"Rue du Midi 135, 1000 Bruxelles, Belgia", kind:"Hotell" },
      atomium: { name:"Atomium", addr:"Square de l'Atomium 1, 1020 Bruxelles, Belgia", kind:"Attraksjon" },
      parl:    { name:"Europaparlamentet", addr:"Rue Wiertz 60, 1047 Bruxelles, Belgia", kind:"Museum" },
      grote:   { name:"Grand-Place", addr:"Grote Markt, 1000 Bruxelles, Belgia", kind:"Attraksjon" },
      osl:     { name:"Oslo lufthavn, terminal 2", addr:"Edvard Munchs veg, 2061 Gardermoen", kind:"Flyplass" },
      bru:     { name:"Brussels Airport", addr:"1930 Zaventem, Belgia", kind:"Flyplass" }
    },

    days: [
      { offset:0, hotel:"hotell", items:[
        { t:"05:30", title:"Oppmøte innsjekk", place:"osl" },
        { t:"08:20", title:"Fly til Brussel", place:"osl" },
        { t:"11:05", title:"Ankomst og buss til hotellet", place:"bru" },
        { t:"18:00", title:"Middag og innsjekk", place:"hotell" }
      ]},
      { offset:1, hotel:"hotell", items:[
        { t:"08:00", title:"Frokost på hotellet", place:"hotell" },
        { t:"09:30", title:"Avreise med buss", place:"hotell" },
        { t:"12:30", title:"Lunsj ved Atomium", place:"atomium" },
        { t:"14:00", title:"Omvisning i parlamentet", place:"parl", note:"Ta med legitimasjon" },
        { t:"17:30", title:"Fri tid i sentrum", place:"grote", note:"Møt ved bussen 19:15" },
        { t:"20:00", title:"Middag på hotellet", place:"hotell" }
      ]},
      { offset:2, hotel:"hotell", items:[
        { t:"09:00", title:"Grand-Place og sentrum", place:"grote" },
        { t:"13:00", title:"Fritid i grupper", note:"Minst tre sammen" },
        { t:"19:30", title:"Felles middag", place:"hotell" }
      ]},
      { offset:3, hotel:"hotell", items:[
        { t:"08:00", title:"Utsjekk", place:"hotell" },
        { t:"12:40", title:"Fly til Oslo", place:"bru" }
      ]}
    ],

    channels: [
      { name:"Rom 204", sub:"Rommet" },
      { name:"Reiseledere", sub:"Kun ledere" }
    ]
  }
];

/* Gjør om «om 14 dager» til faktiske datoer og en lesbar periode. */
function templateDates(tpl) {
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  start.setDate(start.getDate() + tpl.startInDays);
  const dates = tpl.days.map(d => {
    const x = new Date(start);
    x.setDate(start.getDate() + d.offset);
    return x.toISOString().slice(0, 10);
  });
  const f = s => new Date(s + "T12:00:00").toLocaleDateString("nb-NO", { day:"numeric", month:"long" });
  return { dates, label: `${f(dates[0])}–${f(dates[dates.length - 1])}` };
}
