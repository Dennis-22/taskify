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
import EditTask from './pages/EditTask'
import TaskDetails from './pages/TaskDetails'
import { _pages } from './utils/constance'
import Toast from './component/global/Toast'

export default function App() {
  return <UserProvider>
    <TaskProvider>
      <>
        <Layout>
          <Router>
            <Header />
            <Routes>
              <Route path={_pages.HOME} element={<LadingPage />}/>
              <Route path={_pages.SIGN} element={<Sign />}/>
              <Route path={_pages.DASHBOARD} element={<Dashboard />}/>
              <Route path={_pages.CREATE_TASK} element={<CreateTask />}/>
              <Route path={`${_pages.EDIT_TASK}/:taskId`} element={<EditTask />}/>
              <Route path={`${_pages.TASK_DETAILS}/:taskId`} element={<TaskDetails />}/>
              <Route path={`${_pages.PROFILE}/:username`} element={<Profile />}/>
            </Routes>
          </Router>
        </Layout>

        <Toast />
      </>
    </TaskProvider> 
  </UserProvider>
}
