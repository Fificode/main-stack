import Navbar from "./components/Navbar"
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home"
import Revenue from "./pages/Revenue"
import Analytics from "./pages/Analytics"
import CRM from "./pages/CRM"
import Sidebar from "./components/Sidebar"

function App() {


  return (
    <div>
     <Navbar/>
     <Sidebar/>
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/revenue" element={<Revenue/>}/>
     <Route path="/analytics" element={<Analytics/>}/>
     <Route path="/CRM" element={<CRM/>}/>
     </Routes>
    </div>
  )
}

export default App
