import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Components/Auth/Login";
import Options from "./Components/Auth/Options";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import VerifyCode from "./Components/Auth/VerifyCode";
import ResetPassword from "./Components/Auth/ResetPassword";
import IndividualRegistration from "./Components/Auth/IndividualRegistration";
import HospitalRegistration from "./Components/Auth/HospitalRegistration";
import BloodBankRegistration from "./Components/Auth/BloodBankRegistration";
import Home from "./Components/screen/home/main";
import Terms from "./Components/Auth/terms";
import Test from "./Components/Auth/Test";
import Profile from "./Components/screen/profile/index";
import About from "./Components/screen/about/about";
import { useSelector, useDispatch } from "react-redux";

//profile pages
// import MainIndividual from "./Components/screen/profile/Individual/MainIndividual";
// import MainHospital from "./Components/screen/profile/Hospital/MainHospital";

//services
import FindDonors from "./Components/screen/services/findDonors/FindDonors";
import InviteesList from "./Components/screen/services/MyDonationReq/inviteesList";
import UpcomingDrive from "./Components/screen/services/upcomingDrive/UpcomingDrive";
import BuyBlood from "./Components/screen/services/buyBlood/BuyBlood";
import Product from "./Components/screen/services/buyBlood/product";
import MyCommitments from "./Components/screen/services/myCommitments/MyCommitments";
import MyPurchases from "./Components/screen/services/myPurchases/MyPurchases";
import MyDonationReq from "./Components/screen/services/MyDonationReq/MyDonationReq";
import ConductDrive from "./Components/screen/services/conductDrive/conductDrive";
import MyDrives from "./Components/screen/services/myDrives/myDrives";
import MyInventory from "./Components/screen/services/myInventory/myInventory";
import MySales from "./Components/screen/services/mysales/mySales";
import MyInvites from "./Components/screen/services/myInvites/myInvites";
import AcceptedDonors from "./Components/screen/services/myDrives/acceptedDonors";
import MyAnalytics from "./Components/screen/services/myanalytics/MyAnalytics";
import NotFound from "./Components/screen/NotFound";
import LandingPage from "./Components/screen/landingPage/landingPage.js";
import { logging } from "./redux/Actions/login";
import Cookies from "universal-cookie";


function App() {
  const loggedIn = useSelector((state) => state.loggedIn);
  const resetPassword = useSelector((state) => state.resetPassword);
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
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/About" component={About} />
            <Route exact path="/MyDonationReq" component={MyDonationReq} />
            <Route exact path="/FindDonors" component={FindDonors} />
            <Route exact path="/UpcomingDrive" component={UpcomingDrive} />
            <Route exact path="/BuyBlood" component={BuyBlood} />
            <Route exact path="/BuyBlood/Product" component={Product} />
            <Route exact path="/MyCommitments" component={MyCommitments} />
            <Route exact path="/MyPurchases" component={MyPurchases} />
            <Route exact path="/ConductDrive" component={ConductDrive} />
            <Route exact path="/MyDrives" component={MyDrives} />
            <Route exact path="/AcceptedDonors" component={AcceptedDonors} />
            <Route exact path="/MyInventory" component={MyInventory} />
            <Route exact path="/MySales" component={MySales} />
            <Route exact path="/MyInvites" component={MyInvites} />
            <Route exact path="/MyAnalytics" component={MyAnalytics} />
            <Route exact path="/inviteesList" component={InviteesList} />
            {/* <Route component={NotFound} /> */}
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
            <Route exact path="/Test" component={Test} />
            {/* <Route component={NotFound} /> */}
          </>
        )}
      </Switch>
    </>
  );
}

export default App;
