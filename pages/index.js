import {useState} from 'react'

const buttonStyle = {
  marginTop: 16,
  height: 72,
  fontSize: 32,
  width: 'calc(100% - 32px)',
  background: '#44a6c6',
  border: 0,
  color: 'white'
}


export default function Home() {

  const [word, setWord] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [hasError, setHasError] = useState(false);
  const [didSave, setDidSave] = useState(false);

  const handleAdd = async () => {
    setIsSaving(true);
    setHasError(false)
    setDidSave(false);
    const response = await fetch(`/api/add?word=${word}`);
    setIsSaving(false)
    if (!response.ok || (await response.json()).status === 'error') {
      setHasError(true)
      return;
    }
    setWord('')
    setDidSave(true);

  }

  const handleExport = async () => {
    const response = await fetch(`/api/getAll`)
    if (response.ok) {
      const { data } = await response.json()
      let words = [...data]
      const randomWords = []

      for(let i = 10; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * words.length)
        randomWords.push(words[randomIndex])
        words = [...words.slice(0, randomIndex), ...words.slice(randomIndex + 1)]
      }

      await navigator.clipboard.writeText(randomWords.join(','))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 500, width: 'calc(100vw - 16px)', margin: 'auto', fontFamily: 'sans-serif'}}>
      <h1 style={{ fontSize: 100, transform: 'rotate(1deg)'}}>WORDS</h1>
      <input
        style={{
          fontSize: 42,
          transform: 'rotate(-0.5deg)',
          padding: 16,
          border: '2px solid black'
        }}
        disabled={isSaving} value={word} onKeyPress={e => e.key === 'Enter' && handleAdd()} onChange={e => setWord(e.target.value)} placeholder="your cool word..." />
      {hasError &&
        <p style={{
          color:'red',
          width: '100%',
          display: 'flex',
          marginLeft: 32,
           transform: 'rotate(-1deg)'}}>Will not save that bs</p>}
      {didSave && <p style={{ color:'green', width: '100%', display: 'flex', marginLeft: 32}}>Cool word bro</p>}
      <button style={{...buttonStyle, transform: 'rotate(0.5deg)'}} disabled={isSaving} onClick={handleAdd}>Press or hit ⏎ to add</button>
      <button style={{...buttonStyle, background: 'green', transform: 'rotate(1deg)'}} onClick={handleExport}>Export random 50 words</button>
    </div>
  )
}
