import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRegister from './components/register';
import Login from "./components/login";
import NavBar from "./components/navbar";
import DataForm from "./data";
import DataSummary from "./stats";
import CurrentLocationSearchMap from "./all1";
import GeoLocationMap from "./find";
import Logout from "./components/logout";
import Profile from "./components/profile"
import AuthButtons from "./components/button";
import AdminLogin from "./components/admin";
import './index.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthButtons />} />
        <Route path="/log" element={<Login />} />
<Route path="/navbar" element={<NavBar />} />
<Route path="/stats" element={<DataForm />} />
<Route path="/summ" element={<DataSummary />} />
<Route path="/search" element={<CurrentLocationSearchMap />} />
<Route path="/find" element={<GeoLocationMap />} />
<Route path="/logout" element={<Logout />} />
<Route path="/profile" element={<Profile />} />
<Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/register" element={<NewRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;