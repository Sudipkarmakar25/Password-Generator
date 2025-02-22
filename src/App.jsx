import { useState,useCallback,useEffect ,useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setnumberallowed] = useState(false)
  const[charallowed,setcharallowed]=useState(false)
  const[password,setpassword]=useState("")
  const passwordRef=useRef(null)

  const passwordgenerator = useCallback(()=>{
    let pass=""
    let str="QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if (numberallowed) {
      str+="0123456789"
    }
    if(charallowed)
      {
        str+="[{]}\~@#$%^&*><"
      }
      for (let i = 1; i <= length; i++) {
        let char=Math.floor(Math.random()*str.length+1)
        pass=pass+str.charAt(char)
        
      }
      setpassword(pass)
  },[length,numberallowed,charallowed,setpassword])

const copyPasswordtoClip = useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{passwordgenerator()},[length,numberallowed,charallowed,passwordgenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
       <h1 className='text-white text-center text-2xl my-3'>Password Generator</h1>
       <div className='flex shoadow rounded-lg overflow-hidden mb-4'>
         <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
         <button onClick ={copyPasswordtoClip} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
       </div> 
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={20} value={length} className='cursor-pointer'
          onChange={(e)=>{
            setLength(e.target.value)
          }}
          />
          <label >Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberallowed} id="numberinput" onChange={()=>{
            setnumberallowed((prev)=>!prev);
          }}/>
           <label >Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberallowed} id="numberinput" onChange={()=>{
            setcharallowed((prev)=>!prev);
          }}/>
           <label >Characters</label>
        </div>
       </div>
      </div>
    </>
  )
}

export default App
