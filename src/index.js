import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdateProfile from "./pages/UpdateProfile";
import Tag from "./pages/Tag";

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
                        <Route path='/update-profile'
                            element = {
                                <PrivateRoute>
                                    <UpdateProfile />
                                </PrivateRoute>
                            }></Route>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/blogs/:id" element={<CreateBlog />} /> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} /> 
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/blogs/:docId" element={<CreateBlog />} />
                        <Route path="/tags/:tagname" element={<Tag />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));