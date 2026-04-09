import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import Nav from './components/navbar/Nav'
import Homepage from './pages/homepage/Homepage'
import Foot from './components/footer/Foot'
import AuthLayout from './pages/auth/AuthLayout'
import LiveroomLayout from './pages/liveroom/LiveroomLayout'
import MeetingId from './pages/liveroom/meeting_id/MeetingId'
import './App.css'

function App() {
  const { theme } = useTheme()

  return (
    <BrowserRouter>
      <div className="app-root" data-theme={theme}>
        <Routes>
          <Route path="/" element={
            <>
              <Nav />
              <Homepage />
              <Foot />
            </>
          } />
          <Route path="/auth" element={<AuthLayout />} />
          <Route path="/liveroom" element={<LiveroomLayout />} />
          <Route path="/liveroom/meeting" element={<MeetingId />} />
          <Route path="/liveroom/meeting/:meetingId" element={<MeetingId />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
