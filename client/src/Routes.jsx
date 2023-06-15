import Landing from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import Started from "./pages/started/Started";
import Community from "./pages/community/Community";
import About from "./pages/about/hello-world/About";
import Team from "./pages/about/team/Team";
import Error from "./error/Error";
import Freelance from "./pages/freelance/Freelance";
import Marketplace from "./pages/marketplace/MarketPlace";
import CreativeNetwork from "./pages/creative-network/CreativeNetwork";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";


function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/started" element={<Started />} />
      <Route path="/community" element={<Community />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/freelance" element={<Freelance />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/creative-network" element={<CreativeNetwork />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="*" element={<Error />} />
      <Route path="dashboard/" element={<Dashboard />}>
        <Route path="login" />
        <Route path="admins" />
        <Route path="users" />
        <Route path="admin-profile" />
        <Route path="team" />
      </Route>
    </Routes>
  );
}

export default MyRoutes;
