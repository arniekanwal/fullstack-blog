import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
    return (
        <>
        {/* <Container className="d-flex align-items-center justify-content-center"
            style= {{ minHeight: "100vh"}}>
            <div className="w-100" style={{ maxWidth: '400px'}}>
                <Signup />
            </div>
        </Container> */}

        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="blogs" element={<Blogs />} />
                        <Route path="Login" element={<Login />} />
                        <Route path="Signup" element={<Signup />} /> 
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));