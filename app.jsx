// app.jsx — Save The Date landing page for Yaz & Yosef

// (React hooks used via window.React directly to avoid global-scope collisions
// with the main inline script, since Babel transpiles each script as top-level.)

// ─────────────────────────────────────────────────────────────
// Tweakable defaults
// ─────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "envelopeTone": "ivory",
  "motionStyle": "tumble",
  "accentHue": 32,
  "nameTreatment": "serif"
}/*EDITMODE-END*/;

const ENVELOPE_TONES = {
  kraft:  { paper: '#E8D9C0', flap: '#D9C5A4', inner: '#F5EDDF', shadow: '#A68B5F' },
  ivory:  { paper: '#EFE6D4', flap: '#E4D6BC', inner: '#F7F0DF', shadow: '#A89770' },
  sage:   { paper: '#D5D7C6', flap: '#BDC1AA', inner: '#E8EBDB', shadow: '#8A9574' },
  sky:    { paper: '#CCD6DC', flap: '#B4C1C9', inner: '#E4EAED', shadow: '#7E8D96' },
};

// Wedding data
const WEDDING = {
  bride: 'Yaz',
  groom: 'Yosef',
  date: new Date('2027-03-13T17:00:00-06:00'),
  dateLong: 'Saturday, March 13, 2027',
  dateShort: '03 · 13 · 27',
  dateMonth: 'MARCH',
  dateDay: '13',
  dateYear: '2027',
  location: 'Jiutepec, Morelos',
  locationDetail: 'México',
  where: 'Engaged in Squamish, BC',
};

// ─────────────────────────────────────────────────────────────
// Envelope component — tap to open, wax seal breaks, photos fly out
// ─────────────────────────────────────────────────────────────
function Envelope({ tone, motionStyle, onOpen, opened }) {
  const t = ENVELOPE_TONES[tone] || ENVELOPE_TONES.kraft;
  return (
    <div style={{
      position: 'relative', width: 300, height: 210,
      perspective: 1200, transformStyle: 'preserve-3d',
      transition: 'transform 1.2s cubic-bezier(.2,.8,.2,1), opacity .6s ease .4s',
      transform: opened ? 'translateY(40px) scale(0.92)' : 'translateY(0) scale(1)',
      opacity: opened ? 0.35 : 1,
      filter: opened ? 'blur(1px)' : 'none',
    }}>
      {/* envelope body (back layer) */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 6,
        background: `linear-gradient(135deg, ${t.paper} 0%, ${t.flap} 100%)`,
        boxShadow: `0 20px 50px -10px ${t.shadow}80, 0 6px 12px rgba(0,0,0,0.1), inset 0 0 40px rgba(0,0,0,0.04)`,
      }}>
        {/* subtle paper texture */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 6, opacity: 0.25,
          backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.06), transparent 50%)',
        }} />
        {/* bottom V fold lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 300 210" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="150" y2="105" stroke={t.shadow} strokeOpacity="0.2" strokeWidth="0.8"/>
          <line x1="300" y1="0" x2="150" y2="105" stroke={t.shadow} strokeOpacity="0.2" strokeWidth="0.8"/>
          <line x1="0" y1="210" x2="150" y2="105" stroke={t.shadow} strokeOpacity="0.25" strokeWidth="0.8"/>
          <line x1="300" y1="210" x2="150" y2="105" stroke={t.shadow} strokeOpacity="0.25" strokeWidth="0.8"/>
        </svg>
        {/* address lines */}
        <div style={{
          position: 'absolute', left: 30, top: 40,
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
          fontSize: 11, color: t.shadow, opacity: 0.6, lineHeight: 1.6,
        }}>
          <div>To our dearest,</div>
          <div style={{ width: 80, height: 0.5, background: t.shadow, opacity: 0.4, margin: '4px 0' }}/>
          <div style={{ width: 110, height: 0.5, background: t.shadow, opacity: 0.4, margin: '4px 0' }}/>
          <div style={{ width: 70, height: 0.5, background: t.shadow, opacity: 0.4, margin: '4px 0' }}/>
        </div>
        {/* stamp */}
        <div style={{
          position: 'absolute', right: 14, top: 14, width: 46, height: 56,
          border: `1.5px dashed ${t.shadow}`, borderRadius: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Cormorant Garamond", serif', fontSize: 9, fontStyle: 'italic',
          color: t.shadow, opacity: 0.75, textAlign: 'center', padding: 4, lineHeight: 1.15,
        }}>
          SQUAMISH<br/>B.C.<br/>✈︎
        </div>
      </div>

      {/* flap (top triangle) — rotates on open */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '60%',
        transformOrigin: 'top',
        transform: opened ? 'rotateX(-180deg)' : 'rotateX(0deg)',
        transition: 'transform 1s cubic-bezier(.5,.05,.2,1)',
        zIndex: opened ? 1 : 4,
        backfaceVisibility: 'hidden',
      }}>
        <svg viewBox="0 0 300 126" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block', filter: `drop-shadow(0 3px 6px rgba(0,0,0,0.12))` }}>
          <defs>
            <linearGradient id={`flap-${tone}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={t.flap}/>
              <stop offset="100%" stopColor={t.paper}/>
            </linearGradient>
          </defs>
          <path d={`M0,0 L300,0 L150,126 Z`} fill={`url(#flap-${tone})`}/>
          <path d={`M0,0 L150,126 L300,0`} fill="none" stroke={t.shadow} strokeOpacity="0.15" strokeWidth="0.6"/>
        </svg>
      </div>

      {/* wax seal — gold with embossed olive branch */}
      <button
        onClick={() => !opened && onOpen()}
        disabled={opened}
        aria-label="Open envelope"
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: `translate(-50%, -50%) ${opened ? 'scale(0.6) rotate(18deg)' : 'scale(1) rotate(0)'}`,
          width: 64, height: 64, borderRadius: '50%',
          background: `radial-gradient(circle at 32% 28%, #F4D98A 0%, #D4A94B 35%, #A37A2A 75%, #6E4E15 100%)`,
          border: 'none', cursor: opened ? 'default' : 'pointer',
          boxShadow: opened
            ? '0 2px 6px rgba(0,0,0,0.25)'
            : '0 6px 14px rgba(0,0,0,0.35), inset 2px 2px 5px rgba(255,240,180,0.55), inset -2px -3px 5px rgba(90,60,10,0.5)',
          transition: 'transform .9s cubic-bezier(.5,.05,.2,1), box-shadow .4s',
          zIndex: 10, padding: 0,
          opacity: opened ? 0.9 : 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
        {/* embossed olive branch — recessed look via drop shadow + inset highlight */}
        <svg viewBox="0 0 64 64" width="44" height="44" style={{
          filter: 'drop-shadow(0 1px 0 rgba(255,240,190,0.5)) drop-shadow(0 -0.5px 0 rgba(70,45,10,0.7))',
        }}>
          <g fill="none" stroke="#6E4E15" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.85">
            {/* main stem */}
            <path d="M32 12 C 32 24, 32 40, 32 54"/>
            {/* pairs of leaves along the stem */}
            <path d="M32 18 C 26 16, 22 14, 19 10 C 22 13, 27 17, 32 20" fill="#8F6820" fillOpacity="0.75"/>
            <path d="M32 22 C 38 20, 42 18, 45 14 C 42 17, 37 21, 32 24" fill="#8F6820" fillOpacity="0.75"/>
            <path d="M32 30 C 25 30, 20 30, 16 26 C 20 30, 26 33, 32 33" fill="#8F6820" fillOpacity="0.75"/>
            <path d="M32 35 C 39 35, 44 35, 48 31 C 44 35, 38 38, 32 38" fill="#8F6820" fillOpacity="0.75"/>
            <path d="M32 43 C 26 44, 22 44, 18 41 C 22 45, 27 47, 32 47" fill="#8F6820" fillOpacity="0.75"/>
            <path d="M32 48 C 38 49, 42 49, 46 46 C 42 50, 37 52, 32 52" fill="#8F6820" fillOpacity="0.75"/>
            {/* little olives */}
            <ellipse cx="21" cy="10" rx="1.3" ry="1.8" fill="#6E4E15" stroke="none"/>
            <ellipse cx="43" cy="14" rx="1.3" ry="1.8" fill="#6E4E15" stroke="none"/>
          </g>
        </svg>
        {/* rim highlight ring for wax sheen */}
        <div style={{
          position: 'absolute', inset: 3, borderRadius: '50%',
          boxShadow: 'inset 0 1px 1px rgba(255,240,190,0.4)',
          pointerEvents: 'none',
        }}/>
        {/* wax drip bottom-left */}
        <div style={{
          position: 'absolute', left: -3, top: 44, width: 11, height: 15,
          background: 'radial-gradient(circle at 40% 30%, #E0BC5E, #9A7425 70%, #6E4E15)',
          borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
          transform: 'rotate(-22deg)',
          boxShadow: 'inset 1px 1px 2px rgba(255,240,190,0.4)',
        }}/>
        {/* wax drip bottom-right */}
        <div style={{
          position: 'absolute', right: 1, top: 46, width: 9, height: 13,
          background: 'radial-gradient(circle at 40% 30%, #E0BC5E, #9A7425 70%, #6E4E15)',
          borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
          transform: 'rotate(25deg)',
          boxShadow: 'inset 1px 1px 2px rgba(255,240,190,0.4)',
        }}/>
      </button>

      {/* hint */}
      {!opened && (
        <div style={{
          position: 'absolute', bottom: -44, left: 0, right: 0,
          textAlign: 'center',
          fontFamily: '"Inter", sans-serif', fontSize: 11, letterSpacing: 2.5,
          color: 'rgba(74,58,42,0.65)', textTransform: 'uppercase',
          animation: 'bounce 2s ease-in-out infinite',
        }}>
          ↑ tap the seal
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Photo stack — tumbles out of envelope
// ─────────────────────────────────────────────────────────────
function PhotoStack({ opened, motionStyle }) {
  // Smaller photos fanning in the upper third so the Yaz & Yosef reveal stays
  // prominent in the lower half.
  const photos = [
    { src: 'assets/chief-bw.jpeg',     rot: -10, x: -72, y: -8, delay: 600,  z: 1, caption: 'Stawamus Chief' },
    { src: 'assets/squamish-wide.jpeg', rot:   8, x:  68, y:  4, delay: 900,  z: 2, caption: 'The Summit' },
    { src: 'assets/hands-ring.jpeg',    rot:  -2, x:   0, y: 28, delay: 1200, z: 3, caption: 'She said yes.' },
  ];

  return (
    <div style={{
      position: 'absolute', left: '50%', top: '26%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 20,
    }}>
      {photos.map((p, i) => {
        let transform;
        if (!opened) {
          transform = 'translate(-50%, -10%) scale(0.15) rotate(0deg)';
        } else if (motionStyle === 'fan') {
          const angle = (i - 1) * 14;
          transform = `translate(-50%, -50%) translateX(${(i - 1) * 46}px) rotate(${angle}deg) scale(1)`;
        } else {
          // tumble (default)
          transform = `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px)) rotate(${p.rot}deg) scale(1)`;
        }
        return (
          <div key={i} style={{
            position: 'absolute', left: 0, top: 0,
            width: 108, height: 140,
            background: '#fff', padding: 6, paddingBottom: 22,
            boxShadow: opened
              ? '0 10px 30px -6px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.15)'
              : '0 2px 6px rgba(0,0,0,0.2)',
            transform,
            transition: `transform 1.1s cubic-bezier(.2,1.2,.4,1) ${p.delay}ms, opacity .6s ease ${p.delay}ms, box-shadow .6s ease ${p.delay}ms`,
            opacity: opened ? 1 : 0,
            zIndex: p.z,
          }}>
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: `url(${p.src})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}/>
            <div style={{
              position: 'absolute', bottom: 4, left: 0, right: 0,
              textAlign: 'center',
              fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
              fontSize: 9, color: '#6B5A46',
            }}>{p.caption}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Save the Date — the big reveal after photos
// ─────────────────────────────────────────────────────────────
function SaveTheDateHero({ opened, nameTreatment }) {
  const show = opened;
  const serifNames = nameTreatment === 'serif';

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, top: '62%',
      padding: '0 28px', textAlign: 'center',
      opacity: show ? 1 : 0,
      transition: 'opacity 1s ease 2.1s, transform 1s cubic-bezier(.2,.8,.2,1) 2.1s',
      transform: show ? 'translateY(0)' : 'translateY(20px)',
      pointerEvents: show ? 'auto' : 'none',
      zIndex: 25,
    }}>
      <div style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: 10, letterSpacing: 5, textTransform: 'uppercase',
        color: 'rgba(74,58,42,0.7)', marginBottom: 10,
      }}>
        — save the date —
      </div>

      {serifNames ? (
        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic', fontWeight: 400,
          fontSize: 56, lineHeight: 0.95, color: '#2B2418',
          letterSpacing: -1,
        }}>
          Yaz<br/>
          <span style={{
            fontFamily: '"Cormorant Garamond", serif', fontStyle: 'normal',
            fontSize: 18, letterSpacing: 4, verticalAlign: 'middle',
            margin: '0 8px', color: 'rgba(74,58,42,0.7)',
          }}>&amp;</span><br/>
          Yosef
        </div>
      ) : (
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontWeight: 500,
          fontSize: 42, lineHeight: 1.05, color: '#2B2418',
          letterSpacing: 1, textTransform: 'uppercase',
        }}>
          YAZ <span style={{ fontStyle: 'italic', fontWeight: 400, opacity: 0.6 }}>&amp;</span> YOSEF
        </div>
      )}

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 14, marginTop: 18,
      }}>
        <div style={{ width: 30, height: 0.5, background: 'rgba(74,58,42,0.4)' }}/>
        <div style={{
          fontFamily: '"Inter", sans-serif', fontSize: 11, letterSpacing: 3,
          color: 'rgba(74,58,42,0.85)', fontWeight: 500,
        }}>
          {WEDDING.dateShort}
        </div>
        <div style={{ width: 30, height: 0.5, background: 'rgba(74,58,42,0.4)' }}/>
      </div>

      <div style={{
        marginTop: 8,
        fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
        fontSize: 14, color: 'rgba(74,58,42,0.75)',
      }}>
        {WEDDING.location}
      </div>

      <div style={{
        marginTop: 24,
        fontFamily: '"Inter", sans-serif',
        fontSize: 9, letterSpacing: 3, textTransform: 'uppercase',
        color: 'rgba(74,58,42,0.5)',
        display: 'inline-flex', alignItems: 'center', gap: 8,
        animation: 'pulse 2.4s ease-in-out infinite',
      }}>
        <span>scroll for details</span>
        <span style={{ fontSize: 14 }}>↓</span>
      </div>
    </div>
  );
}

window.Envelope = Envelope;
window.PhotoStack = PhotoStack;
window.SaveTheDateHero = SaveTheDateHero;
window.WEDDING = WEDDING;
window.ENVELOPE_TONES = ENVELOPE_TONES;
window.TWEAK_DEFAULTS = TWEAK_DEFAULTS;
