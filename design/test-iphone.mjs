/* Tester utkastet i WebKit — samme motor som iPhone bruker.
 *
 * Chromium sier ja til ting Safari sier nei til, og det er der feilene
 * har gjemt seg. Dette kjører en ekte WebKit med iPhone-størrelse,
 * måler det som pleier å svikte, og tar bilder.
 *
 *   node design/test-iphone.mjs [url]
 */
import { webkit, devices } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ADRESSE = process.argv[2] || "http://localhost:4321/v2/";
const UT = fileURLToPath(new URL("./.taste-skill/webkit/", import.meta.url));

const SKJERMER = ["hjem", "program", "chat", "meg", "pakkeliste", "sitteplasser", "filer", "deltakere"];

const nettleser = await webkit.launch();
await mkdir(UT, { recursive: true });

for (const glass of [false, true]) {
  const kontekst = await nettleser.newContext({
    ...devices["iPhone 13"],
    // Hjemskjerm-appen rapporterer standalone; her later vi som.
    reducedMotion: "no-preference"
  });
  const side = await kontekst.newPage();
  const feil = [];
  side.on("pageerror", e => feil.push(String(e)));
  side.on("console", m => { if (m.type() === "error") feil.push(m.text()); });

  await side.goto(ADRESSE, { waitUntil: "networkidle" });
  if (glass) await side.evaluate(() => document.getElementById("glassbryter").click());

  console.log(`\n${glass ? "MED GLASS" : "UTEN GLASS"}  ·  WebKit · iPhone 13`);
  console.log("".padEnd(62, "─"));

  for (const navn of SKJERMER) {
    await side.evaluate(n => {
      const q = s => document.querySelector(s);
      const fane = [...document.querySelectorAll(".fane")].find(f => f.dataset.gaa === n);
      if (fane) return fane.click();
      const m = q('[data-gaa="meny"]');
      if (m) { m.click(); const k = q(`.mrad[data-gaa="${n}"]`); if (k) k.click(); }
    }, navn);

    const m = await side.evaluate(() => {
      const q = s => document.querySelector(s);
      const topp = q(".topp"), faner = q(".faner"), rull = q(".rull");
      const tit = q(".sidetittel") || q(".hilsen");
      const r = el => el ? el.getBoundingClientRect() : null;
      const tr = r(tit), tp = r(topp), fr = r(faner);
      const cs = topp ? getComputedStyle(topp) : null;
      return {
        tittel: tit ? tit.textContent.trim().slice(0, 18) : "—",
        tittelSkjult: Boolean(tr && tp && tr.top < tp.bottom - 1),
        uskarphet: cs ? (cs.backdropFilter || cs.webkitBackdropFilter || "ingen") : "—",
        innholdUnderFanene: Boolean(fr && rull && rull.scrollHeight > rull.clientHeight),
        // Treffflater skal være minst 44 px
        forSmaa: [...document.querySelectorAll("button")]
          .filter(b => b.offsetParent !== null)
          .map(b => ({ t: (b.innerText || b.ariaLabel || "?").trim().slice(0, 14), h: Math.round(b.getBoundingClientRect().height) }))
          .filter(b => b.h > 0 && b.h < 44).slice(0, 4),
        sidelengs: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    });

    const flagg = [
      m.tittelSkjult ? "TITTEL SKJULT" : "",
      m.sidelengs ? "RULLER SIDELENGS" : "",
      m.forSmaa.length ? `små knapper: ${m.forSmaa.map(b => b.t + " " + b.h).join(", ")}` : ""
    ].filter(Boolean).join(" · ");

    console.log(`  ${navn.padEnd(14)} «${m.tittel}»  ${flagg || "ok"}`);
    await side.screenshot({ path: `${UT}${glass ? "glass" : "vanlig"}-${navn}.png` });
  }

  if (feil.length) console.log("  FEIL I KONSOLLEN:", feil.slice(0, 3));
  await kontekst.close();
}

await nettleser.close();
console.log(`\nBilder: ${UT}`);
