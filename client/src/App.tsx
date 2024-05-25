import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "./pages/auth/LoginPage"
import { RegisterPage } from "./pages/auth/RegisterPage"
import { Layout, ProtectedRoute } from "./components"
import { TaskPage } from "./pages/task/TaskPage"
import { ProfileUser } from "./pages/user/ProfileUser"
import { TaskFormPage } from "./pages/task/TaskFormPage"
import { OneTaskPage } from "./pages/task/OneTaskPage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/addTask" element={<TaskFormPage />}/>
            <Route path="/tasks/:id" element={<OneTaskPage />} />
            <Route path="/profile" element={<ProfileUser />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App
