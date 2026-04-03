import { useTheme } from './hooks/useTheme'
import Nav from './components/navbar/Nav'
import Homepage from './pages/homepage/Homepage'
import Foot from './components/footer/Foot'
import './App.css'

function App() {
  const { theme } = useTheme()

  return (
    <div className="app-root" data-theme={theme}>
      <Nav />
      <Homepage />
      <Foot />
    </div>
  )
}

export default App
