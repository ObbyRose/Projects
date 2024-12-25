import { AppSidebar } from './components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar'

function App() {


  return (
    <>
        <SidebarProvider defaultOpen={false}>
        <AppSidebar/>
        <SidebarTrigger></SidebarTrigger>
        </SidebarProvider>
        <h1>HAHA</h1>
    </>
  )
}

export default App
