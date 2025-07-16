import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Body from './components/Body'
import appStore from './utils/appStore'
import {Provider} from "react-redux" 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={appStore}><Body /></Provider>
    </>
  )
}

export default App
