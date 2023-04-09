import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TaskProvider from './context/task/TasksContext'
import Header from './component/global/Header'
import LadingPage from './pages/LadingPage'
import Dashboard from './pages/Dashboard'
import CreateTask from './pages/CreateTask'
import { _pages } from './utils/constance'

export default function App() {
  const user = true
  return user ? <AppRoute /> : <AuthRoute />
}

function AuthRoute(){
  return <Router>
    <Routes>
      <Route path={`/`} element={<LadingPage />}/>
    </Routes>
  </Router>
}

function AppRoute(){
  return <TaskProvider>
    <Header />
    <Router>
      <Routes>
        <Route path={_pages.HOME} element={<Dashboard />}/>
        <Route path={_pages.CREATE} element={<CreateTask />}/>
      </Routes>
    </Router>
  </TaskProvider> 
}
