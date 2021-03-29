import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./container/LoginStack/Login";
import Options from "./container/RegisterStack/Options";
import ForgotPassword from "./container/LoginStack/ForgotPassword";
import VerifyCode from "./container/LoginStack/VerifyCode";
import ResetPassword from "./container/LoginStack/ResetPassword";
import IndividualRegistration from "./container/RegisterStack/IndividualRegistration";
import HospitalRegistration from "./container/RegisterStack/HospitalRegistration";
import BloodBankRegistration from "./container/RegisterStack/BloodBankRegistration";
import Home from "./container/HomeStack/home/main";
import Terms from "./container/RegisterStack/terms";
import Test from "./container/RegisterStack/Test";
import Profile from "./container/ProfileStack/index";
import About from "./container/HomeStack/about/about";
import { useSelector, useDispatch } from "react-redux";

//services
import FindDonors from "./container/ServicesStack/FindDonors/FindDonors";
import BuyBlood from "./container/ServicesStack/BuyBlood/BuyBlood";
import Product from "./container/ServicesStack/BuyBlood/product";
import ConductDrive from "./container/ServicesStack/ConductDrive/conductDrive";
import MyAnalytics from "./container/ServicesStack/Analytics/MyAnalytics";
import MyActivity from "./container/ServicesStack/MyActivity/MyActivity";
import MyDonationReq from "./container/ServicesStack/DonationRequests/MyDonationReq";
import InviteesList from "./container/ServicesStack/DonationRequests/inviteesList";
import MyDrives from "./container/ServicesStack/Drives/myDrives";
import AcceptedDonors from "./container/ServicesStack/Drives/acceptedDonors";
import MyInventory from "./container/ServicesStack/Inventory/myInventory";
import MyInvites from "./container/ServicesStack/Invites/myInvites";
import MyPurchases from "./container/ServicesStack/Purchases/MyPurchases";
import Invoice from "./container/ServicesStack/Purchases/invoice";
import MySales from "./container/ServicesStack/Sales/mySales";
import UpcomingDrive from "./container/ServicesStack/UpcomingDrives/UpcomingDrive";

//other pages
import NotFound from "./component/NotFound";
import UnAuth from "./component/unAuth";
import LandingPage from "./component/landingPage/landingPage.js";
import { logging } from "./redux/Actions/login";
import Cookies from "universal-cookie";
import { ProtectedRoute } from "./protected.route";

function App() {
  const loggedIn = useSelector((state) => state.loggedIn);
  const resetPassword = useSelector((state) => state.resetPassword);
  const Individual = 1;

  const dispatch = useDispatch();

  useEffect(() => {
    const cookies = new Cookies();
    const authObj = cookies.get("Auth");
    if (authObj) {
      dispatch(logging(authObj));
    }
  }, [dispatch]);

  return (
    <>
      <Switch>
        {/* Common Pages */}
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/About" component={About} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/MyDonationReq" component={MyDonationReq} />
        <ProtectedRoute exact path="/FindDonors" component={FindDonors} />
        <ProtectedRoute exact path="/BuyBlood" component={BuyBlood} />
        <ProtectedRoute exact path="/BuyBlood/Product" component={Product} />
        <ProtectedRoute exact path="/MyPurchases" component={MyPurchases} />
        <ProtectedRoute exact path="/MyPurchases/Invoice" component={Invoice} />
        <ProtectedRoute exact path="/inviteesList" component={InviteesList} />
        {/* Urls for Individual only */}
        <ProtectedRoute
          exact
          path="/UpcomingDrive"
          component={loggedIn.userType === Individual ? UpcomingDrive : UnAuth}
        />
        <ProtectedRoute
          exact
          path="/MyActivity"
          component={loggedIn.userType === Individual ? MyActivity : UnAuth}
        />
        <ProtectedRoute
          exact
          path="/MyInvites"
          component={loggedIn.userType === Individual ? MyInvites : UnAuth}
        />
        {/* Urls for Ho[ital and Bloodbank only */}
        <ProtectedRoute
          exact
          path="/OrganiseDrive"
          component={loggedIn.userType === Individual ? UnAuth : ConductDrive}
        />
        <ProtectedRoute
          exact
          path="/MyDrives"
          component={loggedIn.userType === Individual ? UnAuth : MyDrives}
        />
        <ProtectedRoute
          exact
          path="/AcceptedDonors"
          component={loggedIn.userType === Individual ? UnAuth : AcceptedDonors}
        />
        <ProtectedRoute
          exact
          path="/MyInventory"
          component={loggedIn.userType === Individual ? UnAuth : MyInventory}
        />
        <ProtectedRoute
          exact
          path="/MySales"
          component={loggedIn.userType === Individual ? UnAuth : MySales}
        />
        <ProtectedRoute
          exact
          path="/MyAnalytics"
          component={loggedIn.userType === Individual ? UnAuth : MyAnalytics}
        />

        {/* LoggedOut URLS */}
        <Route exact path="/" component={LandingPage} />
        <Route
          exact
          path="/BloodBankRegistration"
          component={BloodBankRegistration}
        />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/ForgotPassword" component={ForgotPassword} />
        <Route exact path="/VerifyCode" component={VerifyCode} />
        {resetPassword.isOtpVerified ? (
          <Route exact path="/ResetPassword" component={ResetPassword} />
        ) : null}
        <Route exact path="/Options" component={Options} />
        <Route
          exact
          path="/IndividualRegistration"
          component={IndividualRegistration}
        />
        <Route
          exact
          path="/HospitalRegistration"
          component={HospitalRegistration}
        />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
