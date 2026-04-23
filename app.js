const { useState } = React;


const initialAdok = [
    { id: 1, frekvencia: "87,6", teljesitmeny: "7,6", csatorna: "Neo FM", adohely: "Győr", cim: "Szabadhegy" },
    { id: 2, frekvencia: "87,6", teljesitmeny: "0,5", csatorna: "Gong Rádió", adohely: "Csongrád", cim: "" },
    { id: 3, frekvencia: "88,1", teljesitmeny: "1", csatorna: "Rise FM", adohely: "Budapest", cim: "Gellért-hegy" }
];

function App() {
    const [adok, setAdok] = useState(initialAdok);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAdo, setCurrentAdo] = useState({ 
        id: null, frekvencia: '', teljesitmeny: '', csatorna: '', adohely: '', cim: '' 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentAdo({ ...currentAdo, [name]: value });
    };

   const saveAdo = (e) => {
    e.preventDefault();

   
    fetch('save.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Frekvencia: currentAdo.frekvencia,
            teljesitmeny: currentAdo.teljesitmeny,
            csatorna: currentAdo.csatorna,
            adohely: currentAdo.adohely
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === "success") {
           
            if (isEditing) {
                setAdok(adok.map(a => a.id === currentAdo.id ? currentAdo : a));
                setIsEditing(false);
            } else {
                
                const newAdo = { ...currentAdo, id: Date.now() };
                setAdok([...adok, newAdo]);
            }
          
            setCurrentAdo({ id: null, frekvencia: '', teljesitmeny: '', csatorna: '', adohely: '', cim: '' });
            alert("Sikeres mentés az adatbázisba!");
        } else {
            alert("Hiba: " + result.message);
        }
    })
    .catch(error => {
        console.error("Hiba a mentés során:", error);
        alert("Nem sikerült kapcsolódni a szerverhez.");
    });
};
    const deleteAdo = (id) => {
        if(window.confirm("Biztosan törölni szeretné ezt az adót?")) {
            setAdok(adok.filter(a => a.id !== id));
        }
    };

    const editRow = (ado) => {
        setIsEditing(true);
        setCurrentAdo(ado);
    };

    return (
        <div>
            <h1> Rádióadó Állomások Kezelése</h1>

            <div className="form-box">
                <form className="radio-form" onSubmit={saveAdo}>
                    <div className="form-group">
                        <label>Frekvencia (MHz)</label>
                        <input name="frekvencia" value={currentAdo.frekvencia} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Teljesítmény (kW)</label>
                        <input name="teljesitmeny" value={currentAdo.teljesitmeny} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Csatorna neve</label>
                        <input name="csatorna" value={currentAdo.csatorna} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label>Adóhely (Település)</label>
                        <input name="adohely" value={currentAdo.adohely} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group" style={{gridColumn: "span 2"}}>
                        <label>Cím / Pontos helyszín</label>
                        <input name="cim" value={currentAdo.cim} onChange={handleInputChange} />
                    </div>
                    
                    <div className="btn-container">
                        <button type="submit" className="btn-primary">
                            {isEditing ? 'Módosítás mentése' : 'Új adó rögzítése'}
                        </button>
                        {isEditing && (
                            <button type="button" className="btn-primary btn-cancel" onClick={() => { 
                                setIsEditing(false); 
                                setCurrentAdo({ id: null, frekvencia: '', teljesitmeny: '', csatorna: '', adohely: '', cim: '' }); 
                            }}>Mégse</button>
                        )}
                    </div>
                </form>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Frekvencia</th>
                        <th>Telj.</th>
                        <th>Csatorna</th>
                        <th>Helyszín</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {adok.map(a => (
                        <tr key={a.id}>
                            <td>{a.frekvencia} MHz</td>
                            <td>{a.teljesitmeny}</td>
                            <td><strong>{a.csatorna}</strong></td>
                            <td>{a.adohely} ({a.cim})</td>
                            <td>
                                <button className="btn-edit" onClick={() => editRow(a)}>Szerkeszt</button>
                                <button className="btn-delete" onClick={() => deleteAdo(a.id)}>Töröl</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
