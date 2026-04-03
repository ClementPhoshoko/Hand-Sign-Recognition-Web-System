import { useTheme } from './hooks/useTheme'
import Nav from './components/navbar/Nav'
import Homepage from './pages/homepage/Homepage'
import './App.css'

function App() {
  const { theme } = useTheme()

  return (
    <div className="app-root" data-theme={theme}>
      <Nav />
      <Homepage />
    </div>
  )
}

export default App
