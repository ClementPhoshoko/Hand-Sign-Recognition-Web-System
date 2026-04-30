import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import Nav from './components/navbar/Nav'
import Homepage from './pages/homepage/Homepage'
import Foot from './components/footer/Foot'
import AuthLayout from './pages/auth/AuthLayout'
import LiveroomLayout from './pages/liveroom/LiveroomLayout'
import MeetingId from './pages/liveroom/meeting_id/MeetingId'
import './App.css'

function AppContent() {
  const { theme } = useTheme()
  const location = useLocation()

  // Define paths where Nav and Foot should be hidden
  const isMeetingPage = location.pathname.startsWith('/liveroom/meeting')

  return (
    <div className="app-root" data-theme={theme}>
      {!isMeetingPage && <Nav />}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/auth" element={<AuthLayout />} />
          <Route path="/liveroom" element={<LiveroomLayout />} />
          <Route path="/liveroom/meeting" element={<MeetingId />} />
          <Route path="/liveroom/meeting/:meetingId" element={<MeetingId />} />
        </Routes>
      </main>
      {!isMeetingPage && <Foot />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
