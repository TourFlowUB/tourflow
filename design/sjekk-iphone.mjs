/* Går gjennom alle fire fanene i demoen, i ekte WebKit — samme motor
   som iPhone bruker. Chromium sier ja til ting Safari sier nei til, og
   det er der feilene har gjemt seg.

   Krever at design/server.mjs kjører.

     node design/sjekk-iphone.mjs

   Måler det som pleier å svikte: treffflater, kontrast, øya, plassen
   under lista, og om noe ligger utenfor skjermen. */
import { webkit, devices } from "playwright";

const nb = await webkit.launch();
const side = await (await nb.newContext({ ...devices["iPhone 13"] })).newPage();
const feil = [];
side.on("pageerror", e => feil.push("pageerror: " + e));
side.on("console", m => { if (m.type() === "error") feil.push("konsoll: " + m.text()); });

await side.goto(`http://localhost:${process.env.PORT || 4321}/design/demo.html`, { waitUntil: "networkidle" });
await side.waitForSelector("#tabbar button", { timeout: 5000 });

const maal = async navn => side.evaluate(n => {
  const lum = c => {
    const m = c.match(/[\d.]+/g).map(Number);
    const k = m.slice(0, 3).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * k[0] + 0.7152 * k[1] + 0.0722 * k[2];
  };
  const bak = el => {
    for (let x = el; x; x = x.parentElement) {
      const b = getComputedStyle(x).backgroundColor;
      if (b && !/rgba\(0, 0, 0, 0\)|transparent/.test(b)) return b;
    }
    return "rgb(255,255,255)";
  };
  const forhold = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

  const app = document.getElementById("appScreen");
  const bar = document.getElementById("tabbar");
  const skjerm = document.getElementById("screen");

  const smaa = [...document.querySelectorAll("button, a, [role=tab]")]
    .filter(b => b.offsetParent !== null)
    .map(b => ({ t: (b.textContent || b.ariaLabel || "?").trim().slice(0, 22), r: b.getBoundingClientRect() }))
    .filter(x => x.r.width > 0 && (x.r.height < 44 || x.r.width < 44))
    .map(x => `${x.t} ${Math.round(x.r.width)}×${Math.round(x.r.height)}`);

  const svak = [...skjerm.querySelectorAll("*")]
    .filter(el => el.children.length === 0 && el.textContent.trim() && el.offsetParent !== null)
    .map(el => {
      const cs = getComputedStyle(el);
      const st = parseFloat(cs.fontSize), fet = parseInt(cs.fontWeight, 10) >= 700;
      const krav = (st >= 24 || (st >= 18.66 && fet)) ? 3 : 4.5;
      return { t: el.textContent.trim().slice(0, 24), f: forhold(cs.color, bak(el)), krav };
    })
    .filter(x => x.f < x.krav)
    .map(x => `${x.t} ${x.f.toFixed(2)}:1 (krav ${x.krav})`);

  const utenfor = [...skjerm.querySelectorAll("*")]
    // Noe som ligger i en stripe man blar sidelengs i, skal stikke utenfor.
    // Det er poenget med stripa, ikke en feil.
    .filter(el => {
      const r = el.getBoundingClientRect();
      if (!(r.width > 0 && (r.right > innerWidth + 1 || r.left < -1))) return false;
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        if (n.scrollWidth > n.clientWidth + 1) return false;
      }
      return true;
    })
    .map(el => el.className || el.tagName).slice(0, 5);

  return {
    fane: n,
    oey: { bunn: Math.round(app.getBoundingClientRect().bottom - bar.getBoundingClientRect().bottom), h: Math.round(bar.getBoundingClientRect().height) },
    plassUnder: getComputedStyle(skjerm).paddingBottom,
    kanBla: skjerm.scrollHeight > skjerm.clientHeight,
    smaa, svak, utenfor
  };
}, navn);

for (const fane of ["idag", "program", "chat", "meg"]) {
  await side.evaluate(f => document.querySelector(`#tabbar button[data-tab="${f}"]`).click(), fane);
  await side.waitForTimeout(220);
  const m = await maal(fane);
  console.log("\n" + fane.toUpperCase().padEnd(10), `øya ${m.oey.h}px, ${m.oey.bunn}px over bunn · plass under ${m.plassUnder} · kan bla: ${m.kanBla}`);
  console.log("  for små:   ", m.smaa.length ? m.smaa.join(" | ") : "ingen");
  console.log("  svak tekst:", m.svak.length ? m.svak.join(" | ") : "ingen");
  console.log("  utenfor:   ", m.utenfor.length ? m.utenfor.join(" | ") : "ingen");
}

console.log("\n" + (feil.length ? "FEIL:\n  " + feil.join("\n  ") : "ingen feil i konsollen"));
await nb.close();
