const { useState, useEffect } = React;

// A te saját MockAPI URL-ed
const API_URL = "https://69ecc496af4ff533142b58b0.mockapi.io/radiok";

function AxiosApp() {
    const [radiok, setRadiok] = useState([]);
    const [ujRadio, setUjRadio] = useState({ nev: '', frekvencia: '' });
    const [loading, setLoading] = useState(true);

    // ADATOK LEKÉRÉSE (READ)
    const frissit Lista = async () => {
        try {
            const response = await axios.get(API_URL);
            setRadiok(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Hiba a letöltésnél:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        frissitLista();
    }, []);

    // ÚJ RÁDIÓ HOZZÁADÁSA (CREATE)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, ujRadio);
            setUjRadio({ nev: '', frekvencia: '' }); // Form ürítése
            frissitLista(); // Lista újratöltése a szerverről
        } catch (error) {
            alert("Hiba a mentés során!");
        }
    };

    // RÁDIÓ TÖRLÉSE (DELETE)
    const handleTorles = async (id) => {
        if (confirm("Biztosan törölni szeretnéd ezt a rádiót?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                frissitLista();
            } catch (error) {
                alert("Hiba a törlésnél!");
            }
        }
    };

    if (loading) return <p style={{textAlign: 'center'}}>Adatok betöltése folyamatban...</p>;

    return (
        <div style={{padding: '20px'}}>
            <h2>Új rádióadó rögzítése</h2>
            <form onSubmit={handleSubmit} style={{marginBottom: '30px'}}>
                <input 
                    type="text" 
                    placeholder="Rádió neve" 
                    value={ujRadio.nev}
                    onChange={(e) => setUjRadio({...ujRadio, nev: e.target.value})}
                    required 
                    style={{marginRight: '10px', padding: '5px'}}
                />
                <input 
                    type="text" 
                    placeholder="Frekvencia (MHz)" 
                    value={ujRadio.frekvencia}
                    onChange={(e) => setUjRadio({...ujRadio, frekvencia: e.target.value})}
                    required 
                    style={{marginRight: '10px', padding: '5px'}}
                />
                <button type="submit" style={{backgroundColor: '#FF6600', color: 'white', border: 'none', padding: '6px 15px', cursor: 'pointer'}}>
                    Mentés az adatbázisba
                </button>
            </form>

            <h2>Aktuális lista</h2>
            <table border="1" style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
                <thead>
                    <tr style={{backgroundColor: '#f2f2f2'}}>
                        <th style={{padding: '10px'}}>Név</th>
                        <th style={{padding: '10px'}}>Frekvencia</th>
                        <th style={{padding: '10px'}}>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {radiok.map(radio => (
                        <tr key={radio.id}>
                            <td style={{padding: '10px'}}>{radio.nev}</td>
                            <td style={{padding: '10px'}}>{radio.frekvencia} MHz</td>
                            <td style={{padding: '10px'}}>
                                <button 
                                    onClick={() => handleTorles(radio.id)}
                                    style={{backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer'}}
                                >
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AxiosApp />);