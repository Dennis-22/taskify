import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserProvider from './context/user/UserContext'
import TaskProvider from './context/task/TasksContext'
import Layout from './component/global/Layout'
import Header from './component/global/Header'
import LadingPage from './pages/LadingPage'
import Sign from './pages/Sign'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import CreateTask from './pages/CreateTask'
import { _pages } from './utils/constance'

export default function App() {
  return <UserProvider>
    <TaskProvider>
      <Layout>
        <Router>
          <Header />
          <Routes>
            <Route path={_pages.HOME} element={<LadingPage />}/>
            <Route path={_pages.SIGN} element={<Sign />}/>
            <Route path={_pages.DASHBOARD} element={<Dashboard />}/>
            <Route path={_pages.CREATE_TASK} element={<CreateTask />}/>
            <Route path={`${_pages.PROFILE}/:userId`} element={<Profile />}/>
          </Routes>
        </Router>
      </Layout>
    </TaskProvider> 
  </UserProvider>
}
