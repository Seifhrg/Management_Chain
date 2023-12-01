import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Singup";
import Login from "./components/Login";
import OperatorDashbord from "./Pages/operator/OperatorDashboard";
import ForgotPassword from "./components/ForgotPassword";
import Acceuil from "./Pages/home/Acceuil";
import Profil from "./components/Profil";

import CustomerDashbord from "./Pages/customer/CustomerDashboard";

import { setAuth } from "./components/common/setAuth";

import { Navigate } from "react-router-dom";
import jwt_decoded from "jwt-decode";

if (localStorage.jwt) {
  setAuth(localStorage.getItem("jwt"));
}

function App() {
  const decoded = localStorage.jwt
    ? jwt_decoded(localStorage.getItem("jwt"))
    : "";
  function RouteNotFound() {
    return <Navigate to={{ pathname: "/" }} />;
  }
  const user = {
    isConnected: localStorage.jwt ? true : false,
    role: decoded.role,
  };
  console.log("***************************");
  console.log(user);

  if (user.isConnected && user.role === "Operator") {
    return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<OperatorDashbord />} />
            <Route path="/profile" element={<Profil />} />
            <Route path="*" element={<RouteNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  } else if (user.isConnected && user.role === "Customer") {
    return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<CustomerDashbord />} />
            <Route path="/profile" element={<Profil />} />
            <Route path="*" element={<RouteNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Acceuil />} />

            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<RouteNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  //   return (
  //     <Routes>
  //       <Route path="/" element={<Acceuil />} />
  //       {user && <Route path="/main" exact element={<Main />} />}
  //       <Route
  //         path="/customerDashbord"
  //         element={
  //           <PrivateRouter user={user}>
  //             <CustomerDashbord />
  //           </PrivateRouter>
  //         }
  //       />
  //       <Route
  //         path="/operatorDashbord"
  //         element={
  //           <PrivateRouter user={user}>
  //             <OperatorDashbord />
  //           </PrivateRouter>
  //         }
  //       />
  //       <Route
  //         path="/signup"
  //         exact
  //         element={
  //           <ForceRedirect user={user}>
  //             <Signup />
  //           </ForceRedirect>
  //         }
  //       />
  //       <Route
  //         path="/login"
  //         exact
  //         element={
  //           <ForceRedirect user={user}>
  //             <Login />
  //           </ForceRedirect>
  //         }
  //       />

  //       <Route
  //         path="/profile"
  //         element={
  //           <PrivateRouter user={user}>
  //             <Profil />
  //           </PrivateRouter>
  //         }
  //       />

  //       <Route
  //         path="/forgot-password"
  //         element={
  //           <ForceRedirect user={user}>
  //             <ForgotPassword />
  //           </ForceRedirect>
  //         }
  //       />
  //       <Route path="*" element={<RouteNotFound />} />
  //     </Routes>
  //   );
}

export default App;
