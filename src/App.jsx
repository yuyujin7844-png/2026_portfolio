import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import PaperPlaneCursor from './components/PaperPlaneCursor'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'

function App() {
  return (
    <>
      <PaperPlaneCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </>
  )
}

export default App
