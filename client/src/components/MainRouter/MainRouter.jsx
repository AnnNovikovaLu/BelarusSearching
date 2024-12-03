import ActivitiesList from "../Activities/ActivitiesList";
import HostDetails from "../HostDetails/HostDetails";
import HostList from "../HostList/HostList";
import AboutBelarus from "../AboutBelarus/AboutBelarus";
import GroupList from "../GroupList/GroupList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

const MainRouter = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {" "}
              <AboutBelarus></AboutBelarus>
              <HostList />{" "}
            </>
          }
        />
        <Route
          path="/hosts/available/:hostId/details"
          element={<HostDetails />}
        />
        <Route path="/activities" element={<ActivitiesList />} />
        <Route path="/groups" element={<GroupList />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer></Footer>
    </>
  );
};

export default MainRouter;
