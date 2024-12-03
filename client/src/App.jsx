import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import serverAPI from "./services/serverAPI";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HostList from "./components/HostList/HostList";
import HostDetails from "./components/HostDetails/HostDetails";
import ActivitiesList from "./components/Activities/ActivitiesList";
import ActivityForm from "./components/Activities/ActivityFormAdd";
import GroupList from "./components/GroupList/GroupList";
import AboutBelarus from "./components/AboutBelarus/AboutBelarus";
import { useDispatch, useSelector } from "react-redux";
import MainRouter from "./components/MainRouter/MainRouter";
import LoginPage from "./components/Login/Login";
import {
  changeIsAuthorized,
  changeIsVerified,
  changeUserInfo,
} from "./store/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.userReducer.isAuthorized);
  const isVerified = useSelector((state) => state.userReducer.isVerified);

  useEffect(() => {
    function authCheckCallback(response) {
      dispatch(changeIsAuthorized(response.isAuthorized));
      dispatch(changeUserInfo(response.user));
      dispatch(changeIsVerified(response.isVerified));
    }

    serverAPI.checkUser(authCheckCallback);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={isAuth ? <MainRouter /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!isAuth ? <LoginPage /> : <Navigate to="/" />}
        />
        {/* <Route
          path={routes.registration}
          element={!isAuth ? <Registration /> : <Navigate to="/" />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;

{
  /* <div>

      <Header></Header>
      <HostList></HostList>
      <Footer></Footer>

    </div> */
}

/* function App() {
  const [hosts, setHosts] = useState(undefined);
  useEffect(() => {
    (async () => {
      const data = await serverAPI.getAvailableHosts();
      setHosts(data);
    })();
  }, []);

  return (
    <>
      {hosts &&
        hosts.data.map((host) => {
          return <div key={host.id}>{host.city}</div>;
        })}
    </>
  );
} */
