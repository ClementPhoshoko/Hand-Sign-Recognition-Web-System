import { useTheme } from './hooks/useTheme'
import './App.css'

function App() {
  const { theme } = useTheme()

  return (
    <div className="app-root" data-theme={theme}>
      
    </div>
  )
}

export default App
