import { AppSidebar } from './components/app-sidebar';
import { ThemeProvider } from './components/theme-provider';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Error404 from './pages/Error404.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Tos from './pages/Tos.tsx';
import Policy from './pages/Policy.tsx';
import Header from './components/header.tsx';
import Setting from './pages/Settings.tsx';
import Team from './pages/Team.tsx';
// import Profile from './pages/Profile.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import { useAuth } from './hooks/use-login.tsx';
import UpgradePlan from './pages/UpgradePlan.tsx';
import NotificationsPage from './pages/Notifications.tsx';

function App() {
  const isLoggedIn = useAuth();

  return (
    <ThemeProvider>
      <Header />
      <SidebarProvider defaultOpen={false}>
        <SidebarTrigger />
        <AppSidebar />
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/terms" element={<Tos />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/our-team" element={<Team />} />
          
          {/* Protected Routes */}
          <Route path="/settings" element={isLoggedIn ? <Setting /> : <Navigate to="/login" />} />

          {/* Authentication Routes */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/about" /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/about" /> : <Signup />} />
          <Route path="/upgrade-plan" element={isLoggedIn ? <UpgradePlan /> : <Signup />} />
          <Route path="/notifications" element={isLoggedIn ? <NotificationsPage /> : <Signup />} />

          {/* Profile Route */}
          {/* <Route path="/profile" element={isLoggedIn ? <Profile userId="someUserId" /> : <Navigate to="/login" />} /> */}

          <Route path="*" element={<Error404 />} />
        </Routes>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
