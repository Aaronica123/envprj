import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewRegister from './components/register';
import Login from "./components/login";
import NavBar from "./components/navbar";
import DataForm from "./data";
import DataSummary from "./stats";
import CurrentLocationSearchMap from "./all1";
import LocationForm from "./location";
import GeoLocationMap from "./find";
import Logout from "./components/logout";
import Profile from "./components/profile"
import AuthButtons from "./components/button";
import AdminLogin from "./components/admin";
import NavBar1 from "./components/navbaradm";
import GetAllLocations from "./all";
import DataForm1 from "./stats2";
import DataSummary1 from "./view1";
import GetAllLocations1 from "./components/map1";
import Adminreg from "./components/adminreg";
import Staff from "./components/staff";
import StaffLogin from "./components/stafflog";
import Dashboard from "./components/move";
import AllProfiles from "./components/profiles";
import StaffProfiles from "./components/staffprofiles";
import UserProfiles from "./components/userprofiles";
import StatusForm from "./components/staffin";
import NavBar2 from "./components/staffbar";
import StatusDisplay from "./design/statusform";
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
<Route path="/navbaradd" element={<NavBar1/>}/>
<Route path="/get" element={<GetAllLocations/>}/>
<Route path="/locke" element={<LocationForm/>}/>
<Route path="/navbar1" element={<DataForm1/>}/>
<Route path="/views" element={<DataSummary1/>}/>
<Route path="/views1" element={<GetAllLocations1/>}/>
<Route path="/regadmin" element={<Adminreg/>}/>
<Route path="/staff" element={<Staff/>}/>
<Route path="/stafflogin" element={<StaffLogin/>}/>
<Route path="/dash" element={<Dashboard/>}/>
<Route path="/allprofile" element={<AllProfiles/>}/>
<Route path="/staffprofile" element={<StaffProfiles/>}/>
<Route path="/userprofile" element={<UserProfiles/>}/>
  <Route path="/stafform" element={<StatusForm />} />
    <Route path="/staffbar" element={<NavBar2 />} />
   <Route path="/statusdisplay" element={<StatusDisplay />} />
        <Route path="/register" element={<NewRegister />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;