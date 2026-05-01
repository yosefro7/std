// details.jsx — full-bleed photo sections after the envelope opens

function Countdown({ target }) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const unit = (n, label) => (
    <div style={{ textAlign: 'center', flex: 1, minWidth: 0 }}>
      <div style={{
        fontFamily: '"Cormorant Garamond", serif', fontWeight: 400,
        fontSize: 46, lineHeight: 1, color: '#fff',
        fontVariantNumeric: 'tabular-nums',
        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
      }}>
        {String(n).padStart(2, '0')}
      </div>
      <div style={{
        fontFamily: '"Inter", sans-serif', fontSize: 9, letterSpacing: 2.5,
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginTop: 8,
        textShadow: '0 1px 6px rgba(0,0,0,0.6)',
      }}>{label}</div>
    </div>
  );
  return (
    <div style={{ display: 'flex', gap: 4, margin: '0 auto', maxWidth: 340 }}>
      {unit(days, 'days')}
      <div style={{ width: 0.5, background: 'rgba(255,255,255,0.4)', margin: '8px 0' }}/>
      {unit(hours, 'hrs')}
      <div style={{ width: 0.5, background: 'rgba(255,255,255,0.4)', margin: '8px 0' }}/>
      {unit(minutes, 'min')}
      <div style={{ width: 0.5, background: 'rgba(255,255,255,0.4)', margin: '8px 0' }}/>
      {unit(seconds, 'sec')}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section 1: ring photo background + "Save The Date" + date
// ─────────────────────────────────────────────────────────────
function RingSection({ phoneH, justOpened }) {
  return (
    <section style={{
      height: phoneH, width: '100%', position: 'relative', overflow: 'hidden',
    }}>
      <div className={justOpened ? 'stdt-photo-in' : ''} style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(' + window.__resources.ringNew + ')',
        backgroundSize: 'cover', backgroundPosition: 'center 30%',
      }}/>
      {/* Soft vignette for legibility without hiding the photo */}
      <div className={justOpened ? 'stdt-photo-in' : ''} style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.55) 100%)',
      }}/>

      <div className={justOpened ? 'stdt-text-in' : ''} style={{ position: 'absolute', inset: 0 }}>

      {/* top ornament */}
      <div style={{
        position: 'absolute', top: 48, left: 0, right: 0, textAlign: 'center',
        fontFamily: '"Inter", sans-serif', fontSize: 10, letterSpacing: 5,
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)',
        textShadow: '0 1px 8px rgba(0,0,0,0.7)',
      }}>
        — Yaz <span style={{ opacity: 0.7, margin: '0 3px' }}>&amp;</span> Yosef —
      </div>

      {/* centered block */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        transform: 'translateY(-50%)',
        textAlign: 'center', padding: '0 24px',
      }}>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
          fontWeight: 400, fontSize: 68, lineHeight: 1, color: '#fff',
          letterSpacing: -1,
          textShadow: '0 4px 30px rgba(0,0,0,0.45), 0 2px 10px rgba(0,0,0,0.3)',
        }}>
          Save
          <div style={{ fontStyle: 'normal', fontSize: 18, letterSpacing: 6, margin: '6px 0', textTransform: 'uppercase', opacity: 0.85 }}>
            the
          </div>
          Date
        </div>

        <div style={{
          margin: '32px auto 0', width: 60, height: 0.5,
          background: 'rgba(255,255,255,0.7)',
        }}/>

        <div style={{
          marginTop: 26,
          fontFamily: '"Cormorant Garamond", serif', fontWeight: 400,
          fontSize: 28, color: '#fff', letterSpacing: 0.5,
          textShadow: '0 2px 14px rgba(0,0,0,0.5)',
        }}>
          March 13<span style={{ fontSize: 16, verticalAlign: 'super' }}>th</span>, 2027
        </div>
      </div>

      {/* scroll hint */}
      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: '"Inter", sans-serif', fontSize: 9.5, letterSpacing: 4,
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)',
        textShadow: '0 1px 6px rgba(0,0,0,0.6)',
        animation: 'pulse 2.4s ease-in-out infinite',
      }}>
        <div>scroll</div>
        <div style={{ fontSize: 14, marginTop: 6 }}>↓</div>
      </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section 2: black & white mountain + names + location
// ─────────────────────────────────────────────────────────────
function NamesSection({ phoneH }) {
  return (
    <section style={{
      height: phoneH, width: '100%', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(' + window.__resources.handsNew + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.55) 100%)',
      }}/>

      {/* Names block — pushed to top so faces stay clear */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 56,
        textAlign: 'center', padding: '0 24px',
      }}>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
          fontWeight: 400, fontSize: 64, lineHeight: 0.95, color: '#fff',
          letterSpacing: -1.5,
          textShadow: '0 4px 28px rgba(0,0,0,0.55)',
        }}>
          Yaz
        </div>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontSize: 28,
          color: 'rgba(255,255,255,0.85)', margin: '2px 0',
          textShadow: '0 2px 14px rgba(0,0,0,0.5)',
        }}>
          &amp;
        </div>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
          fontWeight: 400, fontSize: 64, lineHeight: 0.95, color: '#fff',
          letterSpacing: -1.5,
          textShadow: '0 4px 28px rgba(0,0,0,0.55)',
        }}>
          Yosef
        </div>

        <div style={{
          margin: '22px auto 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
        }}>
          <div style={{ width: 24, height: 0.5, background: 'rgba(255,255,255,0.6)' }}/>
          <div style={{
            fontFamily: '"Inter", sans-serif', fontSize: 10, letterSpacing: 4,
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)',
            textShadow: '0 1px 6px rgba(0,0,0,0.6)',
          }}>
            are getting married
          </div>
          <div style={{ width: 24, height: 0.5, background: 'rgba(255,255,255,0.6)' }}/>
        </div>
      </div>

      {/* Location — bottom of section */}
      <div style={{
        position: 'absolute', bottom: 56, left: 0, right: 0,
        textAlign: 'center', padding: '0 24px',
      }}>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
          fontSize: 24, color: '#fff', letterSpacing: 0.3,
          textShadow: '0 2px 14px rgba(0,0,0,0.55)',
        }}>
          Jiutepec, Morelos
        </div>
        <div style={{
          marginTop: 6,
          fontFamily: '"Inter", sans-serif', fontSize: 10, letterSpacing: 4,
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)',
          textShadow: '0 1px 6px rgba(0,0,0,0.6)',
        }}>
          México
        </div>
      </div>

      {/* scroll hint */}
      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: '"Inter", sans-serif', fontSize: 9.5, letterSpacing: 4,
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)',
        textShadow: '0 1px 6px rgba(0,0,0,0.6)',
        animation: 'pulse 2.4s ease-in-out infinite',
      }}>
        <div style={{ fontSize: 14 }}>↓</div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section 3: summit wide photo + countdown
// ─────────────────────────────────────────────────────────────
function CountdownSection({ phoneH, target }) {
  return (
    <section style={{
      height: phoneH, width: '100%', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(' + window.__resources.mountainview + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,14,18,0.55) 0%, rgba(10,14,18,0.25) 50%, rgba(10,14,18,0.75) 100%)',
      }}/>

      {/* top */}
      <div style={{
        position: 'absolute', top: 48, left: 0, right: 0, textAlign: 'center',
        fontFamily: '"Inter", sans-serif', fontSize: 10, letterSpacing: 5,
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)',
        textShadow: '0 1px 6px rgba(0,0,0,0.7)',
      }}>
        — counting the days —
      </div>

      {/* center — countdown */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        transform: 'translateY(-50%)',
        padding: '0 20px',
      }}>
        <div style={{
          textAlign: 'center', marginBottom: 40,
          fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic',
          fontSize: 30, color: '#fff', lineHeight: 1.2,
          textShadow: '0 2px 18px rgba(0,0,0,0.55)',
        }}>
          Until we say<br/>
          <span style={{ fontStyle: 'normal', letterSpacing: 2, fontSize: 24 }}>I DO</span>
        </div>

        <Countdown target={target}/>
      </div>

      {/* bottom signature */}
      <div style={{
        position: 'absolute', bottom: 40, left: 0, right: 0,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 22, color: '#fff', letterSpacing: 2,
          textShadow: '0 2px 12px rgba(0,0,0,0.6)',
        }}>
          Y <span style={{ fontStyle: 'italic', opacity: 0.7, margin: '0 4px' }}>&amp;</span> Y
        </div>
        <div style={{
          marginTop: 8,
          fontFamily: '"Inter", sans-serif', fontSize: 9, letterSpacing: 3,
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)',
          textShadow: '0 1px 6px rgba(0,0,0,0.6)',
        }}>
          formal invitation to follow
        </div>
      </div>
    </section>
  );
}

window.RingSection = RingSection;
window.NamesSection = NamesSection;
window.CountdownSection = CountdownSection;
