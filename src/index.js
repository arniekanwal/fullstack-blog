import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from './pages/UpdateProfile';

// Components
import PrivateRoute from "./components/PrivateRoute";

// Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
    return (
        <>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path='/'
                            element = {
                                <PrivateRoute>
                                    <Home />
                                </PrivateRoute>
                            }></Route>
                        <Route path='/update-profile'
                            element = {
                                <PrivateRoute>
                                    <UpdateProfile />
                                </PrivateRoute>
                            }></Route>
                        {/* <Route index element={<Home />} /> */}
                        <Route path="blogs" element={<Blogs />} />
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} /> 
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));