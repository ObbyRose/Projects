import { AppSidebar } from './components/app-sidebar'
import { ThemeProvider } from './components/theme-provider'
import { SidebarProvider } from './components/ui/sidebar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Error404 from './pages/Error404.tsx'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import Tos from './pages/Tos.tsx'
import Policy from './pages/Policy.tsx'
import Header from './components/header.tsx'


function App() {
  return (
    <ThemeProvider>
      <Header />
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Tos />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
