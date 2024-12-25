import { AppSidebar } from './components/app-sidebar'
import { ThemeProvider } from './components/theme-provider'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Error404 from './pages/Error404.tsx'
import { LoginForm } from './components/login-form.tsx'
import { SignUpForm } from './components/sign-up-form.tsx'

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarTrigger />
        <Routes>
          <Route path="/" element= {<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/sign-in" element={<LoginForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
