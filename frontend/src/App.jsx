
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NewRegister from './register'
import Login from "./login"; 
function App() {
  return(<>
  <NewRegister/>
  <Login/>
  </>)
}

export default App
