import { useState, useEffect } from 'react'
import axios from 'axios'

const Calculator = () => {
  const [out, setOut] = useState("")
  const btns = ["7","8","9","/", "4","5","6","*", "1","2","3","-", "0",".","=","+"]
  return (
    <div style={{background: '#eee', padding: '20px', borderRadius: '10px', color: '#000'}}>
      <h3>Számológép</h3>
      <div style={{background: '#fff', padding: '10px', textAlign: 'right', fontSize: '20px', marginBottom: '10px'}}>{out || "0"}</div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px'}}>
        {btns.map(b => (
          <button key={b} onClick={() => b === "=" ? setOut(eval(out).toString()) : setOut(out + b)} style={{padding: '10px'}}>{b}</button>
        ))}
        <button onClick={() => setOut("")} style={{gridColumn: 'span 4'}}>Clear</button>
      </div>
    </div>
  )
}

const TicTacToe = () => {
  const [cells, setCells] = useState(Array(9).fill(null))
  const [xNext, setXNext] = useState(true)
  return (
    <div style={{background: '#eee', padding: '20px', borderRadius: '10px', color: '#000'}}>
      <h3>Tic-Tac-Toe</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 60px)', gap: '5px'}}>
        {cells.map((v, i) => (
          <button key={i} style={{width: '60px', height: '60px', fontSize: '24px'}} onClick={() => {
            if(cells[i]) return
            const n = cells.slice(); n[i] = xNext ? "X" : "O"
            setCells(n); setXNext(!xNext)
          }}>{v}</button>
        ))}
      </div>
      <button onClick={() => setCells(Array(9).fill(null))} style={{marginTop: '10px'}}>Új játék</button>
    </div>
  )
}

function App() {
  const [view, setView] = useState("axios")
  const [adok, setAdok] = useState([])
  const [form, setForm] = useState({ freq: '', channel: '' })
  const API_URL = "http://fel1.nethely.hu/api.php"

  const frissit = () => { axios.get(API_URL).then(res => setAdok(res.data)) }
  useEffect(() => { if(view === "axios") frissit() }, [view])

  return (
    <div style={{padding: '20px', color: '#fff', maxWidth: '800px', margin: '0 auto'}}>
      <nav style={{marginBottom: '20px', borderBottom: '1px solid #555', paddingBottom: '10px'}}>
        <button onClick={() => setView("axios")} style={{marginRight: '10px'}}>Axios CRUD</button>
        <button onClick={() => setView("calc")} style={{marginRight: '10px'}}>Számológép</button>
        <button onClick={() => setView("ttt")}>Tic-Tac-Toe</button>
      </nav>

      {view === "axios" && (
        <div>
          <h2>Axios CRUD Felület</h2>
          <form onSubmit={(e) => { e.preventDefault(); axios.post(API_URL, form).then(() => {setForm({freq:'', channel:''}); frissit()}) }}>
            <input placeholder="MHz" value={form.freq} onChange={e => setForm({...form, freq: e.target.value})} />
            <input placeholder="Csatorna" value={form.channel} onChange={e => setForm({...form, channel: e.target.value})} />
            <button type="submit">Hozzáad</button>
          </form>
          <ul>{adok.map(a => <li key={a.id}>{a.freq} MHz - {a.channel}</li>)}</ul>
        </div>
      )}

      {view === "calc" && <Calculator />}
      {view === "ttt" && <TicTacToe />}
    </div>
  )
}

export default App
