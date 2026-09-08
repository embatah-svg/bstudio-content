/* Szenen-Bibliothek – eigene schematische Zeichnungen, kein offizielles Bildmaterial. */

const P = { ink:'#1A1D22', paper:'#FBFAF7', road:'#5B6068', line:'#F4F1E9',
  red:'#C8102E', blue:'#005A9C', yellow:'#F2C230', green:'#0E7C52', grey:'#8A8F97' };

function car(x,y,rot,fill){ fill=fill||P.red; return `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-16" y="-9" width="32" height="18" rx="5" fill="${fill}" stroke="${P.ink}" stroke-width="1.2"/>
  <rect x="-7" y="-7" width="12" height="14" rx="2" fill="#dfeaf2" opacity=".9"/></g>`; }
function truck(x,y,rot,fill){ fill=fill||P.grey; return `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-24" y="-11" width="46" height="22" rx="3" fill="${fill}" stroke="${P.ink}" stroke-width="1.2"/>
  <rect x="12" y="-9" width="12" height="18" rx="2" fill="#dfeaf2"/></g>`; }
function bus(x,y,rot,fill){ fill=fill||P.yellow; return `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-26" y="-11" width="52" height="22" rx="4" fill="${fill}" stroke="${P.ink}" stroke-width="1.2"/>
  <rect x="-20" y="-7" width="10" height="8" fill="#dfeaf2"/><rect x="-6" y="-7" width="10" height="8" fill="#dfeaf2"/>
  <rect x="8" y="-7" width="10" height="8" fill="#dfeaf2"/></g>`; }
function tram(x,y,rot){ return `<g transform="translate(${x} ${y}) rotate(${rot})">
  <rect x="-28" y="-10" width="56" height="20" rx="2" fill="${P.blue}" stroke="${P.ink}" stroke-width="1.2"/>
  <rect x="-22" y="-6" width="9" height="7" fill="#dfeaf2"/><rect x="-8" y="-6" width="9" height="7" fill="#dfeaf2"/>
  <rect x="6" y="-6" width="9" height="7" fill="#dfeaf2"/><line x1="0" y1="-10" x2="0" y2="-19" stroke="${P.ink}" stroke-width="1.5"/></g>`; }
function bike(x,y,rot,fill){ fill=fill||P.ink; return `<g transform="translate(${x} ${y}) rotate(${rot})">
  <circle cx="-9" cy="7" r="6.5" fill="none" stroke="${fill}" stroke-width="2.2"/>
  <circle cx="9" cy="7" r="6.5" fill="none" stroke="${fill}" stroke-width="2.2"/>
  <path d="M-9 7 L1 -7 L9 7 M1 -7 L-2 -13 M-9 7 L5 7" stroke="${fill}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="-2" cy="-16" r="3.2" fill="${fill}"/></g>`; }
function moto(x,y,rot,fill){ fill=fill||P.ink; return `<g transform="translate(${x} ${y}) rotate(${rot})">
  <circle cx="-10" cy="7" r="7" fill="none" stroke="${fill}" stroke-width="2.4"/>
  <circle cx="11" cy="7" r="7" fill="none" stroke="${fill}" stroke-width="2.4"/>
  <path d="M-10 7 L4 0 L11 7 M4 0 L2 -9 L11 -9" stroke="${fill}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="1" cy="-11" r="3" fill="${fill}"/></g>`; }
function ped(x,y,fill){ fill=fill||P.ink; return `<g transform="translate(${x} ${y})">
  <circle cx="0" cy="-15" r="4.2" fill="${fill}"/>
  <path d="M0 -11 L0 5 M-6 -4 L6 -3 M0 5 L-6 16 M0 5 L6 16" stroke="${fill}" stroke-width="3" stroke-linecap="round" fill="none"/></g>`; }
function tractor(x,y,rot,fill){ fill=fill||P.green; return `<g transform="translate(${x} ${y}) rotate(${rot})">
  <circle cx="-14" cy="9" r="9" fill="none" stroke="${P.ink}" stroke-width="2.4"/>
  <circle cx="12" cy="10" r="5.5" fill="none" stroke="${P.ink}" stroke-width="2"/>
  <rect x="-6" y="-10" width="20" height="16" rx="2" fill="${fill}" stroke="${P.ink}" stroke-width="1.2"/>
  <rect x="-2" y="-18" width="8" height="9" fill="#dfeaf2"/></g>`; }
function dash(x1,y1,x2,y2,c){ return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c||'#fff'}" stroke-width="3" stroke-dasharray="9 8" stroke-linecap="round"/>`; }
function solid(x1,y1,x2,y2,c,w){ return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c||'#fff'}" stroke-width="${w||3}"/>`; }
function zig(x1,y1,x2,y2){ return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${P.yellow}" stroke-width="4" stroke-dasharray="4 4"/>`; }
function arrow(x,y,rot,c){ return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 12 L0 -10 M-6 -4 L0 -10 L6 -4" stroke="${c||'#fff'}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
function sign(x,y,type,size,glyph){
  size = size||30;
  const s = `<g transform="translate(${x} ${y})">`;
  if (type === 'danger') return s + `<path d="M0 ${-size} L${size*.87} ${size*.5} L${-size*.87} ${size*.5} Z" fill="#fff" stroke="${P.red}" stroke-width="4" stroke-linejoin="round"/>${glyph}</g>`;
  if (type === 'prohib') return s + `<circle r="${size}" fill="#fff" stroke="${P.red}" stroke-width="5"/>${glyph}</g>`;
  if (type === 'mandatory') return s + `<circle r="${size}" fill="${P.blue}"/>${glyph}</g>`;
  if (type === 'priority') return s + `<rect x="${-size*.72}" y="${-size*.72}" width="${size*1.44}" height="${size*1.44}" fill="${P.yellow}" stroke="${P.ink}" stroke-width="3" transform="rotate(45)"/>${glyph}</g>`;
  if (type === 'giveway') return s + `<path d="M0 ${size} L${size*.95} ${-size*.62} L${-size*.95} ${-size*.62} Z" fill="#fff" stroke="${P.red}" stroke-width="6" stroke-linejoin="round"/>${glyph}</g>`;
  if (type === 'stop') return s + `<polygon points="${oct(size)}" fill="${P.red}" stroke="${P.ink}" stroke-width="2"/><text x="0" y="7" font-family="Archivo" font-weight="700" font-size="15" fill="#fff" text-anchor="middle">STOP</text></g>`;
  if (type === 'end') return s + `<circle r="${size}" fill="#fff" stroke="${P.grey}" stroke-width="4"/><line x1="${-size*.7}" y1="${-size*.7}" x2="${size*.7}" y2="${size*.7}" stroke="${P.ink}" stroke-width="4"/>${glyph}</g>`;
  if (type === 'info') return s + `<rect x="${-size}" y="${-size*.72}" width="${size*2}" height="${size*1.44}" rx="4" fill="${P.blue}" stroke="${P.ink}" stroke-width="1.5"/>${glyph}</g>`;
  if (type === 'zone') return s + `<rect x="${-size*.9}" y="${-size*.65}" width="${size*1.8}" height="${size*1.3}" rx="4" fill="#fff" stroke="${P.ink}" stroke-width="4"/>${glyph}</g>`;
  return s + '</g>';
}
function oct(r){ let p=[]; for(let i=0;i<8;i++){const a=Math.PI/8+i*Math.PI/4; p.push((r*Math.cos(a)).toFixed(1)+','+(r*Math.sin(a)).toFixed(1));} return p.join(' '); }
function frame(inner,bg){ return `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="230" fill="${bg||P.road}"/>${inner}</svg>`; }

/* ---------- Glyph-Bibliothek für den Schilderkatalog ---------- */
function gArrowUp(c,w){ return `<path d="M0 12 L0 -12 M-7 -3 L0 -12 L7 -3" stroke="${c}" stroke-width="${w||3.4}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
function gArrowCurve(c,dir){ const f = dir==='l'?-1:1; return `<path d="M${-10*f} 12 Q${-10*f} -12 ${12*f} -12 M${4*f} -18 L${12*f} -12 L${4*f} -6" stroke="${c}" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
function gBar(c){ return `<line x1="-16" y1="0" x2="16" y2="0" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`; }
function gDiagBar(c){ return `<line x1="-15" y1="15" x2="15" y2="-15" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`; }
function gNum(t,c,size){ return `<text x="0" y="${(size||15)*.36}" font-family="Archivo" font-weight="700" font-size="${size||24}" fill="${c}" text-anchor="middle">${t}</text>`; }
function gPed(c){ return `<g><circle cx="0" cy="-10" r="3.4" fill="${c}"/><path d="M0 -7 L0 6 M-4.5 -2 L4.5 -1.5 M0 6 L-4.5 15 M0 6 L4.5 15" stroke="${c}" stroke-width="2.4" stroke-linecap="round" fill="none"/></g>`; }
function gKids(c){ return gPed(c).replace('cx="0"','cx="-7"') + gPed(c).replace('cx="0"','cx="6"').replace('cy="-10"','cy="-7"'); }
function gBike(c){ return `<g><circle cx="-7" cy="6" r="5.4" fill="none" stroke="${c}" stroke-width="1.8"/><circle cx="7" cy="6" r="5.4" fill="none" stroke="${c}" stroke-width="1.8"/>
  <path d="M-7 6 L1 -6 L7 6 M1 -6 L-1 -11" stroke="${c}" stroke-width="1.7" fill="none" stroke-linecap="round"/></g>`; }
function gRoundabout(c){ return `<g fill="none" stroke="${c}" stroke-width="2.6"><circle r="9"/><path d="M9 0 A9 9 0 0 1 0 9" marker-end="none"/></g><path d="M0 9 L-4 5 M0 9 L4 5" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`; }
function gTrain(c){ return `<g fill="none" stroke="${c}" stroke-width="2.4"><rect x="-9" y="-11" width="18" height="20" rx="4"/><circle cx="-4" cy="2" r="2" fill="${c}" stroke="none"/><circle cx="4" cy="2" r="2" fill="${c}" stroke="none"/><line x1="-9" y1="-3" x2="9" y2="-3"/></g>`; }
function gGate(c){ return `<g stroke="${c}" stroke-width="3" stroke-linecap="round"><line x1="-16" y1="6" x2="16" y2="-6"/><line x1="-16" y1="-6" x2="16" y2="6"/></g>`; }
function gSlippery(c){ return `<path d="M-14 4 Q-6 -6 2 4 Q10 -6 16 2" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`; }
function gBumps(c){ return `<path d="M-15 6 L-7 -8 L1 6 L9 -8 L16 6" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
function gRocks(c){ return `<path d="M-8 12 L-2 -6 L6 -2 L2 12 Z M6 -2 L12 -12 L15 4 L10 8 Z" fill="${c}"/>`; }
function gAnimal(c){ return `<g fill="${c}"><ellipse cx="0" cy="6" rx="12" ry="6"/><path d="M-9 2 L-15 -10 M-4 -4 L-6 -14 M4 -4 L7 -13 M9 2 L15 -8" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/></g>`; }
function gLights(c){ return `<g fill="none" stroke="${c}" stroke-width="2.2"><rect x="-6" y="-16" width="12" height="30" rx="3"/><circle cx="0" cy="-10" r="2.6" fill="${c}"/><circle cx="0" cy="-1" r="2.6" fill="${c}"/><circle cx="0" cy="8" r="2.6" fill="${c}"/></g>`; }
function gWorks(c){ return `<g fill="${c}"><circle cx="-4" cy="-11" r="3.4"/><path d="M-4 -7 L-4 4 L-11 14 M-4 4 L2 14 M-4 -2 L6 -8" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>`; }
function gNarrows(c){ return `<path d="M-14 -13 L-3 0 L-14 13 M14 -13 L3 0 L14 13" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`; }
function gTunnel(c){ return `<path d="M-13 12 L-13 -2 A13 13 0 0 1 13 -2 L13 12" stroke="${c}" stroke-width="2.6" fill="none"/>`; }
function gP(c){ return gNum('P',c,22); }
function gH(c){ return gNum('H',c,20); }
function gWind(c){ return `<path d="M-14 -4 H10 A4 4 0 1 0 6 -9 M-14 6 H14 A4 4 0 1 1 10 11" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`; }
function gChain(c){ return `<g fill="none" stroke="${c}" stroke-width="2.4"><ellipse cx="-6" cy="0" rx="6" ry="4"/><ellipse cx="6" cy="0" rx="6" ry="4"/></g>`; }
function gOneway(c){ return `<path d="M-14 0 H14 M6 -8 L14 0 L6 8" stroke="${c}" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; }
function gDeadEnd(c){ return `<g stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round"><line x1="-14" y1="0" x2="10" y2="0"/><line x1="6" y1="-9" x2="6" y2="9"/></g>`; }
function gFuel(c){ return `<g fill="none" stroke="${c}" stroke-width="2.2"><rect x="-8" y="-12" width="14" height="24" rx="2"/><path d="M6 -6 h4 a3 3 0 0 1 3 3 v10" /></g>`; }
function gGiveWayInner(c){ return `<path d="M0 8 L8 -6 L-8 -6 Z" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round"/>`; }
function gArrowsPriority(giveWay){
  const upW = giveWay?7:3, upC = giveWay?'#fff':P.red, downW = giveWay?3:7, downC = giveWay?P.red:'#fff';
  return `<path d="M0 -18 L0 2" stroke="${upC}" stroke-width="${upW}" stroke-linecap="round"/><path d="M-6 -10 L0 -18 L6 -10" stroke="${upC}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M0 2 L0 18" stroke="${downC}" stroke-width="${downW}" stroke-linecap="round"/><path d="M-6 10 L0 18 L6 10" stroke="${downC}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function gWheelchair(c){ return `<g fill="none" stroke="${c}" stroke-width="2.2"><circle cx="0" cy="9" r="8"/><circle cx="-6" cy="-11" r="3" fill="${c}" stroke="none"/><path d="M0 9 L0 -3 L8 -3 M0 -3 L-4 9"/></g>`; }
function gLoadIcon(c){ return `<g fill="none" stroke="${c}" stroke-width="2.2"><rect x="-14" y="-6" width="20" height="12" rx="2"/><rect x="6" y="-4" width="8" height="10"/><circle cx="-8" cy="8" r="2.6" fill="${c}" stroke="none"/><circle cx="10" cy="8" r="2.6" fill="${c}" stroke="none"/></g>`; }
function gEndAll(c){ return `<g stroke="${c}" stroke-width="2.4" stroke-linecap="round"><line x1="-10" y1="8" x2="-2" y2="-10"/><line x1="2" y1="8" x2="10" y2="-10"/></g>`; }

function signSVG(type,size,inner,bg){
  const box = (size||30)+18;
  return `<svg viewBox="${-box} ${-box} ${box*2} ${box*2}" xmlns="http://www.w3.org/2000/svg">${bg?`<rect x="${-box}" y="${-box}" width="${box*2}" height="${box*2}" fill="${bg}"/>`:''}${sign(0,0,type,size,inner)}</svg>`;
}

/* Katalog: Kategorie -> Liste von {id, de, ar, svg} wird in data.js referenziert (SIGN_ICON liefert das SVG) */
const SIGN_ICON = {
  curve_r: signSVG('danger',30, gArrowCurve(P.ink,'r')),
  curve_l: signSVG('danger',30, gArrowCurve(P.ink,'l')),
  curves: signSVG('danger',30, `${gArrowCurve(P.ink,'l')}`),
  children: signSVG('danger',30, gKids(P.ink)),
  pedestrians: signSVG('danger',30, gPed(P.ink)),
  cyclists: signSVG('danger',30, gBike(P.ink)),
  slippery: signSVG('danger',30, gSlippery(P.ink)),
  bumps: signSVG('danger',30, gBumps(P.ink)),
  narrows: signSVG('danger',30, gNarrows(P.ink)),
  rocks: signSVG('danger',30, gRocks(P.ink)),
  animals: signSVG('danger',30, gAnimal(P.ink)),
  lights_ahead: signSVG('danger',30, gLights(P.ink)),
  works: signSVG('danger',30, gWorks(P.ink)),
  railway_gate: signSVG('danger',30, gGate(P.ink)),
  railway_open: signSVG('danger',30, gTrain(P.ink)),
  tunnel_ahead: signSVG('danger',30, gTunnel(P.ink)),
  wind: signSVG('danger',30, gWind(P.ink)),
  queue: signSVG('danger',30, gLights(P.ink)),

  no_entry: signSVG('prohib',30, gBar('#fff') + `<circle r="30" fill="${P.red}"/><line x1="-14" y1="0" x2="14" y2="0" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`),
  no_overtake: signSVG('prohib',30, `${car(-7,-2,0,P.red)}${car(6,6,0,P.ink)}${gDiagBar(P.red)}`),
  speed30: signSVG('prohib',30, gNum('30',P.ink,20)),
  speed50: signSVG('prohib',30, gNum('50',P.ink,20)),
  speed80: signSVG('prohib',30, gNum('80',P.ink,20)),
  no_left: signSVG('prohib',30, gArrowUp(P.ink) + gDiagBar(P.red)),
  no_uturn: signSVG('prohib',30, `<path d="M-8 8 a8 8 0 1 1 16 0" stroke="${P.ink}" stroke-width="3" fill="none"/><path d="M4 4 L8 8 L12 4" stroke="${P.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>` + gDiagBar(P.red)),
  no_parking: signSVG('prohib',30, gP(P.ink) + gDiagBar(P.red)),
  no_stopping: signSVG('prohib',30, gP(P.ink) + gDiagBar(P.red) + gDiagBar(P.red).replace('15 15','15 -15').replace('-15 -15','-15 15')),
  no_trucks: signSVG('prohib',30, `${truck(0,4,0,P.grey)}`),
  no_pedestrians: signSVG('prohib',30, gPed(P.ink)),
  no_bicycles: signSVG('prohib',30, gBike(P.ink)),
  height_limit: signSVG('prohib',30, gNum('2.5m',P.ink,15)),
  weight_limit: signSVG('prohib',30, gNum('3.5t',P.ink,15)),

  ahead_only: signSVG('mandatory',30, gArrowUp('#fff')),
  right_only: signSVG('mandatory',30, gArrowUp('#fff').replace('rotate(0)','') ),
  roundabout_m: signSVG('mandatory',30, gRoundabout('#fff')),
  bike_path: signSVG('mandatory',30, gBike('#fff')),
  ped_path: signSVG('mandatory',30, gPed('#fff')),
  min_speed: signSVG('mandatory',30, gNum('30',/* white */'#fff',18)),
  chains: signSVG('mandatory',30, gChain('#fff')),

  priority_road: signSVG('priority',30, ''),
  give_way: signSVG('giveway',30, gGiveWayInner(P.ink)),
  stop: signSVG('stop',30, ''),
  priority_end: signSVG('end',30, ''),

  one_way: signSVG('info',26, gOneway('#fff'), P.blue),
  dead_end_i: signSVG('info',26, gDeadEnd('#fff'), P.blue),
  parking_i: signSVG('info',26, gP('#fff'), P.blue),
  hospital_i: signSVG('info',26, gH('#fff'), P.blue),
  motorway_i: signSVG('info',26, `${car(-8,4,0,'#dfeaf2')}`, P.green),
  motorway_end_i: signSVG('info',26, `${car(-8,4,0,'#dfeaf2')}${gDiagBar('#fff')}`, P.grey),
  fuel_i: signSVG('info',26, gFuel('#fff'), P.blue),
  tunnel_i: signSVG('info',26, gTunnel('#fff'), P.blue),

  yield_to_oncoming: signSVG('mandatory',30, gArrowsPriority(true)),
  priority_over_oncoming: signSVG('mandatory',30, gArrowsPriority(false)),
  disabled_parking_i: signSVG('info',26, gWheelchair('#fff'), P.blue),
  loading_zone_i: signSVG('info',26, gLoadIcon('#fff'), P.blue),
  zone30_i: signSVG('zone',30, `<text x="0" y="-8" font-family="Archivo" font-size="9" text-anchor="middle" fill="${P.ink}">ZONE</text>${gNum('30',P.ink,22)}`),
  begegnungszone_i: signSVG('zone',30, `<text x="0" y="-8" font-family="Archivo" font-size="8" text-anchor="middle" fill="${P.ink}">BEGEGNUNGSZONE</text>${gNum('20',P.ink,20)}`),
  ende_beschraenkung: signSVG('end',30, gEndAll(P.ink))
};

const SCENES = {

  kreuzung_rechts: frame(`
    <rect x="0" y="90" width="400" height="60" fill="${P.road}"/><rect x="170" y="0" width="60" height="230" fill="${P.road}"/>
    ${dash(0,120,150,120)}${dash(250,120,400,120)}${dash(200,0,200,90)}${dash(200,150,200,230)}
    ${car(120,120,0,P.red)}${car(200,190,-90,P.blue)}
  `),

  kreuzung_hauptstrasse: frame(`
    <rect x="0" y="90" width="400" height="60" fill="${P.road}"/><rect x="170" y="0" width="60" height="230" fill="${P.road}"/>
    ${solid(0,95,163,95,'#fff',3)}${solid(0,145,163,145,'#fff',3)}${dash(237,120,400,120)}
    ${sign(120,55,'priority',24,'')}${car(90,120,0,P.blue)}${car(200,190,-90,P.red)}
  `),

  kreisel: frame(`
    ${dash(0,115,130,115)}${dash(270,115,400,115)}${dash(200,0,200,80)}${dash(200,150,200,230)}
    <circle cx="200" cy="115" r="58" fill="${P.road}" stroke="#fff" stroke-width="4"/>
    <circle cx="200" cy="115" r="22" fill="${P.green}" opacity=".55"/>
    ${car(150,138,25,P.blue)}${car(210,60,0,P.red)}${arrow(255,115,90,'#fff')}
  `),

  fussgaengerstreifen: frame(`
    <rect x="0" y="70" width="400" height="90" fill="${P.road}"/>
    ${[0,1,2,3,4,5,6].map(i=>`<rect x="${60+i*30}" y="70" width="16" height="90" fill="#fff"/>`).join('')}
    ${car(30,115,0,P.red)}${ped(255,40,P.ink)}${ped(255,60,P.blue)}
  `),

  tram_vortritt: frame(`
    <rect x="0" y="95" width="400" height="45" fill="${P.road}"/>${solid(0,117,400,117,'#e8e4da',6)}
    <rect x="170" y="0" width="60" height="230" fill="${P.road}"/>
    ${tram(300,117,0)}${car(200,190,-90,P.red)}
  `),

  bus_haltestelle: frame(`
    <rect x="0" y="90" width="400" height="60" fill="${P.road}"/>${zig(0,150,150,150)}
    ${bus(80,117,0,P.yellow)}${car(230,90,0,P.red)}${arrow(160,105,-25,P.yellow)}
  `),

  ueberholverbot_kuppe: frame(`
    <path d="M0 140 Q120 40 200 40 Q280 40 400 140 L400 230 L0 230 Z" fill="${P.road}"/>
    ${dash(0,150,180,120)}${dash(230,110,400,150)}
    ${car(80,145,-8,P.red)}${car(150,128,-8,P.blue)}${sign(340,60,'danger',22,'')}
  `),

  ueberholung_velo: frame(`
    <rect x="0" y="60" width="400" height="110" fill="${P.road}"/>${dash(0,115,400,115)}
    ${bike(90,145,0,P.ink)}${car(90,70,0,P.red)}
    <path d="M110 70 L110 145" stroke="${P.yellow}" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="118" y="105" font-family="Archivo" font-size="13" fill="${P.yellow}">1.5m</text>
  `),

  autobahn_einspur: frame(`
    <rect x="0" y="40" width="400" height="150" fill="${P.road}"/>${dash(0,90,400,90)}${dash(0,140,260,140)}
    <path d="M260 140 L400 190" stroke="#fff" stroke-width="3"/>
    ${car(90,65,0,P.blue)}${car(190,65,0,P.grey)}${car(150,165,-12,P.red)}
  `),

  rettungsgasse: frame(`
    <rect x="0" y="30" width="400" height="170" fill="${P.road}"/>${dash(0,80,400,80)}${dash(0,130,400,130)}
    ${car(70,55,0,P.blue)}${car(70,105,0,P.grey)}${car(70,160,0,P.red)}
    ${car(220,55,0,P.grey)}${car(220,160,0,P.blue)}
    <rect x="185" y="30" width="30" height="170" fill="${P.green}" opacity=".18"/>
  `),

  parkabstand_zebrastreifen: frame(`
    <rect x="0" y="90" width="400" height="70" fill="${P.road}"/>
    ${[0,1,2,3,4].map(i=>`<rect x="${230+i*24}" y="90" width="12" height="70" fill="#fff"/>`).join('')}
    ${car(80,125,0,P.red)}
    <line x1="150" y1="90" x2="150" y2="160" stroke="${P.yellow}" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="90" y="180" font-family="Archivo" font-size="13" fill="${P.yellow}">5 m</text>
  `),

  bahnuebergang_schranke: frame(`
    <rect x="0" y="95" width="400" height="45" fill="${P.road}"/>
    <rect x="150" y="0" width="20" height="230" fill="${P.grey}" opacity=".5"/><rect x="230" y="0" width="20" height="230" fill="${P.grey}" opacity=".5"/>
    ${car(80,117,0,P.red)}<rect x="60" y="70" width="130" height="8" fill="${P.red}" transform="rotate(-4 60 74)"/>
    <circle cx="60" cy="74" r="6" fill="${P.red}"/>
  `),

  bahnuebergang_ohneschranke: frame(`
    <rect x="0" y="95" width="400" height="45" fill="${P.road}"/>
    <rect x="150" y="0" width="20" height="230" fill="${P.grey}" opacity=".5"/><rect x="230" y="0" width="20" height="230" fill="${P.grey}" opacity=".5"/>
    ${sign(90,55,'danger',24,'')}${car(90,117,0,P.red)}
  `),

  ampel_gelb: frame(`
    <rect x="170" y="30" width="60" height="150" rx="14" fill="${P.ink}"/>
    <circle cx="200" cy="65" r="18" fill="#3a1418"/><circle cx="200" cy="105" r="18" fill="${P.yellow}"/><circle cx="200" cy="145" r="18" fill="#123a26"/>
  `, P.paper),

  armaturenbrett: frame(`
    <rect x="0" y="0" width="400" height="230" fill="${P.ink}"/>
    <circle cx="90" cy="115" r="9" fill="${P.red}"/><path d="M84 111 Q90 100 96 111" stroke="#fff" stroke-width="2" fill="none"/>
    <circle cx="150" cy="115" r="9" fill="${P.yellow}"/><text x="150" y="120" font-size="12" fill="${P.ink}" text-anchor="middle" font-weight="700">!</text>
    <circle cx="210" cy="115" r="9" fill="${P.red}"/><text x="210" y="120" font-size="10" fill="#fff" text-anchor="middle">ABS</text>
    <circle cx="270" cy="115" r="9" fill="${P.blue}"/><path d="M264 118 h12 M266 111 h8" stroke="#fff" stroke-width="2"/>
    <circle cx="330" cy="115" r="9" fill="${P.yellow}"/><path d="M325 119 l10 -8" stroke="${P.ink}" stroke-width="2"/>
  `),

  bremsweg_diagramm: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    <text x="20" y="30" font-family="Archivo" font-size="13" fill="${P.ink}">50 km/h</text>
    <rect x="20" y="40" width="100" height="14" fill="${P.blue}"/><text x="125" y="52" font-size="11" fill="${P.ink}">15 m Reaktion</text>
    <rect x="20" y="60" width="160" height="14" fill="${P.red}"/><text x="185" y="72" font-size="11" fill="${P.ink}">25 m Bremsen</text>
    <text x="20" y="110" font-family="Archivo" font-size="13" fill="${P.ink}">100 km/h</text>
    <rect x="20" y="120" width="200" height="14" fill="${P.blue}"/><text x="225" y="132" font-size="11" fill="${P.ink}">30 m Reaktion</text>
    <rect x="20" y="140" width="340" height="14" fill="${P.red}"/><text x="20" y="172" font-size="11" fill="${P.ink}">100 m Bremsen</text>
  `, P.paper),

  promille_diagramm: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    <line x1="30" y1="190" x2="380" y2="190" stroke="${P.ink}" stroke-width="2"/>
    <line x1="30" y1="30" x2="30" y2="190" stroke="${P.ink}" stroke-width="2"/>
    <path d="M30 60 Q140 190 380 190" stroke="${P.red}" stroke-width="3" fill="none"/>
    <text x="40" y="50" font-size="12" fill="${P.ink}">1.0‰</text><text x="330" y="185" font-size="12" fill="${P.ink}">Zeit →</text>
    <text x="140" y="205" font-size="11" fill="${P.ink}">≈ 0.1‰ pro Stunde</text>
  `, P.paper),

  sichere_seitenlage: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    <ellipse cx="200" cy="140" rx="90" ry="24" fill="none" stroke="${P.line}" stroke-width="2"/>
    <circle cx="120" cy="120" r="12" fill="${P.ink}"/>
    <path d="M132 120 Q220 100 270 140 Q250 165 190 160 Q140 158 132 120" fill="${P.ink}" opacity=".85"/>
    <path d="M270 140 L250 110" stroke="${P.ink}" stroke-width="6" stroke-linecap="round"/>
    <path d="M190 160 L200 190" stroke="${P.ink}" stroke-width="6" stroke-linecap="round"/>
  `, P.paper),

  pannendreieck: frame(`
    <rect x="0" y="60" width="400" height="120" fill="${P.road}"/>${dash(0,120,400,120)}
    ${car(340,95,0,P.red)}
    <path d="M120 160 L140 120 L160 160 Z" fill="none" stroke="${P.yellow}" stroke-width="4" stroke-linejoin="round"/>
    <text x="40" y="200" font-family="Archivo" font-size="13" fill="#fff">100 m (Autobahn)</text>
  `),

  fahrstreifen_innerorts: frame(`
    <rect x="0" y="20" width="400" height="190" fill="${P.road}"/>${dash(140,20,140,210)}${solid(0,20,0,0)}
    ${car(80,80,90,P.red)}${car(220,150,90,P.blue)}${arrow(80,180,90,'#fff')}${arrow(220,50,90,'#fff')}
  `),

  reifen_profil: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    <rect x="60" y="40" width="60" height="150" rx="8" fill="${P.ink}"/>
    ${[0,1,2,3,4,5].map(i=>`<rect x="66" y="${52+i*22}" width="48" height="8" fill="${P.paper}"/>`).join('')}
    <text x="150" y="60" font-family="Archivo" font-size="14" fill="${P.ink}">min. 1.6 mm</text>
    <text x="150" y="85" font-family="Archivo" font-size="13" fill="${P.ink_2||'#5A6069'}">gesetzlich</text>
    <text x="150" y="120" font-family="Archivo" font-size="14" fill="${P.green}">empf. 3–4 mm</text>
  `, P.paper),

  signalfarben: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    ${sign(80,90,'danger',34,'<path d=\"M0 -8 L0 8 M0 14 L0 15\" stroke=\"'+P.ink+'\" stroke-width=\"4\" stroke-linecap=\"round\"/>')}
    ${sign(200,90,'prohib',34,'<line x1=\"-18\" y1=\"0\" x2=\"18\" y2=\"0\" stroke=\"'+P.red+'\" stroke-width=\"5\"/>')}
    ${sign(320,90,'mandatory',34,'<path d=\"M0 12 L0 -10 M-6 -4 L0 -10 L6 -4\" stroke=\"#fff\" stroke-width=\"3\" fill=\"none\"/>')}
    <text x="80" y="150" font-size="11" text-anchor="middle" fill="${P.ink}">Gefahr</text>
    <text x="200" y="150" font-size="11" text-anchor="middle" fill="${P.ink}">Verbot</text>
    <text x="320" y="150" font-size="11" text-anchor="middle" fill="${P.ink}">Gebot</text>
  `, P.paper),

  /* ---------- neue Szenen ---------- */
  einbahn_falsch: frame(`
    <rect x="0" y="60" width="400" height="110" fill="${P.road}"/>
    ${[0,1,2,3].map(i=>`${arrow(60+i*100,115,90,'#fff')}`).join('')}
    ${car(320,115,-180,P.red)}${sign(40,50,'info',24,gOneway('#fff')).replace('<svg','').replace('</svg>','').replace(/viewBox="[^"]*"/,'')}
  `),

  radweg_kreuzung: frame(`
    <rect x="0" y="90" width="400" height="60" fill="${P.road}"/>
    <rect x="0" y="72" width="400" height="14" fill="${P.red}" opacity=".35"/>
    ${dash(170,0,170,230)}${bike(120,79,0,P.ink)}${car(250,120,0,P.red)}
  `),

  schulweg: frame(`
    <rect x="0" y="90" width="400" height="70" fill="${P.road}"/>
    ${sign(60,50,'danger',26, gKids(P.ink))}${sign(60,50,'danger',0,'')}
    ${car(260,125,0,P.red)}${ped(150,70,P.ink)}${ped(165,75,P.blue)}
  `),

  bergpost: frame(`
    <path d="M0 190 Q120 60 200 60 Q280 60 400 190 L400 230 L0 230 Z" fill="${P.road}"/>
    ${dash(30,175,150,105)}${dash(250,105,370,175)}
    ${bus(190,95,-8,P.yellow)}${car(90,175,-8,P.red)}
  `),

  tunnel: frame(`
    <path d="M0 190 L0 60 A200 90 0 0 1 400 60 L400 190" fill="${P.ink}"/>
    <rect x="0" y="190" width="400" height="40" fill="${P.road}"/>${dash(0,210,400,210)}
    ${car(140,205,0,P.red)}${car(260,205,0,P.blue)}
    <circle cx="90" cy="90" r="6" fill="${P.yellow}" opacity=".8"/><circle cx="200" cy="65" r="6" fill="${P.yellow}" opacity=".8"/><circle cx="310" cy="90" r="6" fill="${P.yellow}" opacity=".8"/>
  `, P.ink),

  ladung_sichern: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    <rect x="60" y="120" width="200" height="70" rx="6" fill="none" stroke="${P.ink}" stroke-width="2"/>
    <rect x="90" y="90" width="60" height="45" fill="${P.grey}" stroke="${P.ink}" stroke-width="1.5"/>
    <path d="M90 95 L60 60 M150 95 L180 60" stroke="${P.red}" stroke-width="2.5" stroke-dasharray="3 3"/>
    <text x="200" y="60" font-family="Archivo" font-size="13" fill="${P.red}">Spanngurt fehlt</text>
  `, P.paper),

  schneeketten: frame(`
    <path d="M0 190 Q150 30 400 190" fill="#eef3f6" opacity=".9"/>
    <rect x="0" y="190" width="400" height="40" fill="${P.road}"/>
    ${sign(80,60,'mandatory',26, gChain('#fff'))}${car(260,205,0,P.red)}
  `, '#cdd9e2'),

  nachtfahrt: frame(`
    <rect width="400" height="230" fill="#12141a"/>
    <rect x="0" y="150" width="400" height="60" fill="${P.road}"/>${dash(0,180,400,180)}
    ${car(90,180,0,P.blue)}
    <path d="M106 176 L230 150 L230 210 L106 184 Z" fill="${P.yellow}" opacity=".25"/>
    ${car(300,175,180,P.red)}
  `, '#12141a'),

  kindersitz: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    <rect x="140" y="60" width="120" height="130" rx="14" fill="none" stroke="${P.ink}" stroke-width="2"/>
    <rect x="165" y="80" width="70" height="55" rx="10" fill="${P.blue}" opacity=".25"/>
    <circle cx="200" cy="100" r="14" fill="${P.ink}"/>
    <path d="M170 150 Q200 170 230 150" stroke="${P.red}" stroke-width="3" fill="none"/>
  `, P.paper),

  kreisel_tram: frame(`
    ${dash(0,115,130,115)}${dash(270,115,400,115)}
    <circle cx="200" cy="115" r="58" fill="${P.road}" stroke="#fff" stroke-width="4"/>
    <circle cx="200" cy="115" r="22" fill="${P.blue}" opacity=".4"/>
    ${tram(200,66,90)}${car(150,150,25,P.red)}
  `),

  autobahn_ausfahrt: frame(`
    <rect x="0" y="40" width="400" height="150" fill="${P.road}"/>${dash(0,90,400,90)}${dash(0,140,320,140)}
    <path d="M320 140 L400 185" stroke="#fff" stroke-width="3"/>
    <rect x="0" y="0" width="400" height="30" fill="${P.green}"/><text x="20" y="20" font-family="Archivo" font-size="13" fill="#fff">Ausfahrt Solothurn ›</text>
    ${car(150,65,0,P.blue)}${car(340,165,15,P.red)}
  `),

  rettungsgasse_bildung: frame(`
    <rect x="0" y="30" width="400" height="170" fill="${P.road}"/>${dash(0,80,400,80)}${dash(0,130,400,130)}
    ${car(90,55,0,P.blue)}${car(90,105,0,P.grey)}${car(90,160,0,P.red)}
    <rect x="185" y="30" width="30" height="170" fill="${P.yellow}" opacity=".25"/>
    ${arrow(150,55,-70,'#fff')}${arrow(150,160,70,'#fff')}
  `),

  baustelle: frame(`
    <rect x="0" y="90" width="400" height="60" fill="${P.road}"/>
    ${[0,1,2,3].map(i=>`<path d="M${100+i*40} 150 L${108+i*40} 118 L${116+i*40} 150 Z" fill="${P.yellow}" stroke="${P.ink}" stroke-width="1.5"/>`).join('')}
    ${car(50,120,0,P.red)}${truck(300,120,0,P.grey)}
  `),

  vortritt_baustelle: frame(`
    <rect x="0" y="90" width="400" height="60" fill="${P.road}"/>
    <rect x="200" y="90" width="60" height="60" fill="${P.yellow}" opacity=".3"/>
    ${car(90,110,0,P.blue)}${car(320,130,180,P.red)}
  `),

  fussgaenger_ohne_streifen: frame(`
    <rect x="0" y="90" width="400" height="60" fill="${P.road}"/><rect x="170" y="0" width="60" height="230" fill="${P.road}"/>
    ${car(90,120,0,P.red)}${ped(200,60,P.ink)}
  `),

  hoehe_ladung: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    ${truck(140,150,0,P.grey)}
    <rect x="110" y="70" width="90" height="45" fill="${P.grey}" opacity=".6" stroke="${P.ink}"/>
    <line x1="60" y1="60" x2="60" y2="150" stroke="${P.yellow}" stroke-width="2" stroke-dasharray="4 4"/>
    <text x="10" y="55" font-family="Archivo" font-size="13" fill="${P.ink}">4.0 m</text>
  `, P.paper),

  /* ---------- einzelne Signale gross, für Erkennungsfragen ---------- */
  schild_stop: frame(sign(200,110,'stop',68,''), P.paper),
  schild_vortritt_dreieck: frame(sign(200,110,'giveway',68,gGiveWayInner(P.ink)), P.paper),
  schild_hauptstrasse: frame(sign(200,110,'priority',68,''), P.paper),
  schild_kreisel_gebot: frame(sign(200,110,'mandatory',68,gRoundabout('#fff')), P.paper),
  schild_kinder: frame(sign(200,110,'danger',68,gKids(P.ink)), P.paper),
  schild_tempo_verbot: frame(sign(200,110,'prohib',68,gNum('30',P.ink,38)), P.paper),
  schild_ueberholverbot: frame(sign(200,110,'prohib',68,`${car(-11,-4,0,P.red)}${car(9,9,0,P.ink)}${gDiagBar(P.red)}`), P.paper),
  schild_kettenpflicht: frame(sign(200,110,'mandatory',68,gChain('#fff')), P.paper),

  /* ---------- weitere Szenen ---------- */
  glatteis: frame(`
    <rect x="0" y="90" width="400" height="70" fill="#c9dae4"/>
    <path d="M0 100 Q100 108 200 100 T400 102" stroke="#eef6fa" stroke-width="6" fill="none" opacity=".8"/>
    ${car(140,120,-6,P.red)}
    <path d="M60 145 Q100 150 140 146" stroke="#8fa9b8" stroke-width="2" fill="none"/>
  `, '#c9dae4'),

  herbstlaub: frame(`
    <rect x="0" y="90" width="400" height="70" fill="${P.road}"/>
    ${[0,1,2,3,4,5].map(i=>`<ellipse cx="${40+i*62}" cy="${110+((i%2)*20)}" rx="8" ry="5" fill="#C87A2A" transform="rotate(${i*35} ${40+i*62} ${110+((i%2)*20)})"/>`).join('')}
    ${car(150,125,-4,P.red)}
  `),

  behindertenparkplatz: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    <rect x="120" y="60" width="160" height="110" fill="none" stroke="${P.blue}" stroke-width="3" stroke-dasharray="10 6"/>
    <circle cx="200" cy="100" r="14" fill="${P.blue}"/>
    <path d="M192 108 h16 M200 108 v-16" stroke="#fff" stroke-width="3"/>
    <text x="200" y="150" font-family="Archivo" font-size="13" text-anchor="middle" fill="${P.ink}">Ausweis erforderlich</text>
  `, P.paper),

  ladezone: frame(`
    <rect x="0" y="90" width="400" height="70" fill="${P.road}"/>
    ${[0,1,2,3,4].map(i=>`<rect x="${40+i*24}" y="90" width="12" height="70" fill="${P.yellow}" opacity=".7"/>`).join('')}
    ${truck(180,120,0,P.grey)}
    <rect x="150" y="150" width="26" height="20" fill="${P.grey}" opacity=".6"/>
  `),

  fussgaenger_kopfhoerer: frame(`
    <rect x="0" y="70" width="400" height="90" fill="${P.road}"/>
    ${car(60,110,0,P.red)}${ped(260,50,P.ink)}
    <path d="M256 38 a6 6 0 1 1 0 12 M264 38 a6 6 0 1 1 0 12" stroke="${P.blue}" stroke-width="2" fill="none"/>
    <path d="M262 40 Q272 30 280 45" stroke="${P.blue}" stroke-width="1.5" fill="none"/>
  `),

  lkw_toter_winkel: frame(`
    <rect width="400" height="230" fill="${P.paper}"/>
    ${truck(150,140,0,P.grey)}
    <path d="M126 118 L20 40 L20 200 Z" fill="${P.red}" opacity=".18"/>
    <path d="M126 118 L20 40 L20 200 Z" stroke="${P.red}" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/>
    <text x="30" y="120" font-family="Archivo" font-size="12" fill="${P.red}">toter Winkel</text>
  `, P.paper),

  kreisel_lkw: frame(`
    ${dash(0,115,130,115)}${dash(270,115,400,115)}
    <circle cx="200" cy="115" r="58" fill="${P.road}" stroke="#fff" stroke-width="4"/>
    <circle cx="200" cy="115" r="22" fill="${P.green}" opacity=".5"/>
    ${truck(160,140,30,P.grey)}${car(230,60,10,P.red)}
  `),

  feuerwehrzufahrt: frame(`
    <rect x="0" y="60" width="400" height="130" fill="${P.paper}"/>
    <rect x="150" y="60" width="100" height="130" fill="${P.red}" opacity=".12"/>
    ${[0,1,2,3].map(i=>`<rect x="${155+i*24}" y="${70+ (i%2)*8}" width="14" height="10" fill="${P.red}" transform="rotate(-20 ${155+i*24} ${70+(i%2)*8})"/>`).join('')}
    <text x="200" y="210" font-family="Archivo" font-size="12" text-anchor="middle" fill="${P.red}">Feuerwehrzufahrt freihalten</text>
  `, P.paper),

  schild_vortritt_gegenverkehr: frame(sign(200,110,'mandatory',68,gArrowsPriority(true)), P.paper),
  schild_zone30: frame(sign(200,110,'zone',68,`<text x="0" y="-14" font-family="Archivo" font-size="14" text-anchor="middle" fill="${P.ink}">ZONE</text>${gNum('30',P.ink,40)}`), P.paper),
  ende_beschraenkung: frame(sign(200,110,'end',68,gEndAll(P.ink)), P.paper)
};
