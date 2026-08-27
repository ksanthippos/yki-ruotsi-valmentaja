const areas = [
  { name: 'Sanasto', progress: 35 },
  { name: 'Lukeminen', progress: 20 },
  { name: 'Kuuntelu', progress: 15 },
  { name: 'Kirjoittaminen', progress: 10 },
  { name: 'Puhuminen', progress: 5 },
];

export default function App() {
  return (
    <main className="app">
      <header>
        <p className="eyebrow">YKI Ruotsi</p>
        <h1>YKI-valmentaja</h1>
        <p>
          Tavoitteesi: hyvä ruotsin kielen taito opetustyötä varten.
        </p>
      </header>

      <section className="card">
        <h2>Tämän päivän harjoittelu</h2>
        <p>Harjoittele 15 minuuttia ja kartuta osaamistasi.</p>
        <button>Aloita harjoittelu</button>
      </section>

      <section>
        <h2>Edistyminen</h2>
        <div className="areas">
          {areas.map((area) => (
            <div className="area" key={area.name}>
              <div className="area-header">
                <span>{area.name}</span>
                <strong>{area.progress} %</strong>
              </div>
              <progress value={area.progress} max="100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}