/* Components */
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { UserAuthContextProvider } from './components/UserAuth';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './components/Navbar';
import ForgotPassword from './components/ForgotPassword';

/* Pages */
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom'
import Test from './pages/Test';


function App() {
  return (
    <UserAuthContextProvider>
    <Navbar />
      <Routes>
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/reset" element={ <ForgotPassword /> } />
        <Route path="/test" element={ <Test/> } />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
