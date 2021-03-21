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
import MyCommitments from "./container/ServicesStack/Commitments/MyCommitments";
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
import LandingPage from "./component/landingPage/landingPage.js";
import { logging } from "./redux/Actions/login";
import Cookies from "universal-cookie";
import { ProtectedRoute } from "./protected.route";

function App() {
  const loggedIn = useSelector((state) => state.loggedIn);
  const resetPassword = useSelector((state) => state.resetPassword);

  const loggedInState = useSelector((state) => state.loggedIn);
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
        {loggedIn.isLoggedIn ? (
          <>
            {loggedInState.userType === 1 ? (
              <>
                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/About" component={About} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/MyDonationReq" component={MyDonationReq} />
                <Route exact path="/FindDonors" component={FindDonors} />
                <Route exact path="/UpcomingDrive" component={UpcomingDrive} />
                <Route exact path="/BuyBlood" component={BuyBlood} />
                <Route exact path="/BuyBlood/Product" component={Product} />
                <Route exact path="/MyCommitments" component={MyCommitments} />
                <Route exact path="/MyPurchases" component={MyPurchases} />
                <Route exact path="/MyPurchases/Invoice" component={Invoice} />
                <Route exact path="/MyInvites" component={MyInvites} />
                <Route exact path="/inviteesList" component={InviteesList} />
              </>
            ) : (
              <>
                <Route exact path="/home" component={Home} />
                <Route exact path="/About" component={About} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/MyDonationReq" component={MyDonationReq} />
                <Route exact path="/FindDonors" component={FindDonors} />
                <Route exact path="/BuyBlood" component={BuyBlood} />
                <Route exact path="/BuyBlood/Product" component={Product} />
                <Route exact path="/MyPurchases" component={MyPurchases} />
                <Route exact path="/MyPurchases/Invoice" component={Invoice} />
                <Route exact path="/OrganiseDrive" component={ConductDrive} />
                <Route exact path="/MyDrives" component={MyDrives} />
                <Route
                  exact
                  path="/AcceptedDonors"
                  component={AcceptedDonors}
                />
                <Route exact path="/MyInventory" component={MyInventory} />
                <Route exact path="/MySales" component={MySales} />
                <Route exact path="/MyAnalytics" component={MyAnalytics} />
                <Route exact path="/inviteesList" component={InviteesList} />
              </>
            )}
          </>
        ) : (
          <>
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
            {/* loggedIn URLs used when user is logged logged out */}
            <Route exact path="/home" component={NotFound} />
            <Route exact path="/About" component={NotFound} />
            <Route exact path="/profile" component={NotFound} />
            <Route exact path="/MyDonationReq" component={NotFound} />
            <Route exact path="/FindDonors" component={NotFound} />
            <Route exact path="/UpcomingDrive" component={NotFound} />
            <Route exact path="/BuyBlood" component={NotFound} />
            <Route exact path="/BuyBlood/Product" component={NotFound} />
            <Route exact path="/MyCommitments" component={NotFound} />
            <Route exact path="/MyPurchases" component={NotFound} />
            <Route exact path="/MyPurchases/Invoice" component={NotFound} />
            <Route exact path="/MyInvites" component={NotFound} />
            <Route exact path="/inviteesList" component={NotFound} />
            <Route exact path="/OrganiseDrive" component={NotFound} />
            <Route exact path="/MyDrives" component={NotFound} />
            <Route exact path="/AcceptedDonors" component={NotFound} />
            <Route exact path="/MyInventory" component={NotFound} />
            <Route exact path="/MySales" component={NotFound} />
            <Route exact path="/MyAnalytics" component={NotFound} />
          </>
        )}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
