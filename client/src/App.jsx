import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserProvider from './context/user/UserContext'
import TaskProvider from './context/task/TasksContext'
import Header from './component/global/Header'
import LadingPage from './pages/LadingPage'
import Sign from './pages/Sign'
import Dashboard from './pages/Dashboard'
import CreateTask from './pages/CreateTask'
import { _pages } from './utils/constance'
import { useLayoutEffect } from 'react'

export default function App() {
  useLayoutEffect(()=>{

  },[])

  return <UserProvider>
    <TaskProvider>
      <Router>
        <Header />
        <Routes>
          <Route path={`/`} element={<LadingPage />}/>
          <Route path={_pages.HOME} element={<Dashboard />}/>
          <Route path={_pages.CREATE_TASK} element={<CreateTask />}/>
          <Route path={_pages.SIGN} element={<Sign />}/>
        </Routes>
      </Router>
    </TaskProvider> 
  </UserProvider>
}
