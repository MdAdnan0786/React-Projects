import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[Password, setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-+=[]{}~"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  // copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    passwordGenrator()
  }, [length, numberAllowed, charAllowed, passwordGenrator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg
       px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white rounded-lg my-3 text-center '>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
           type="text"
           value={Password}
           className='outline-none w-full py-1 px-3 bg-white text-gray-900'
           placeholder='Password'
           readOnly
           ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-500 text-white
           px-3 py-0.5 shrink-0 hover:bg-blue-700 cursor-pointer'>copy</button>
        </div>
        <div className='flex text-sm gap-x-7 py-2'>
          <div className='flex items-center gap-x-1'>
            <input
             type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox" 
             defaultChecked={numberAllowed}
             id="numberInput"
             className='cursor-pointer'
             onChange={ () => {
              setNumberAllowed((prev) => !prev)
             }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
             type="checkbox"
             defaultChecked={charAllowed}
             id='charInput'
             className='cursor-pointer'
             onChange={ () => {
              setCharAllowed((prev) => !prev)
             }}
             />
             <label htmlFor="charInput">Character</label>
          </div>
        </div>
       </div>
    </>
  )
}

export default App
