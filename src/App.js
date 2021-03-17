import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./container/Auth/Login";
import Options from "./container/Auth/Options";
import ForgotPassword from "./container/Auth/ForgotPassword";
import VerifyCode from "./container/Auth/VerifyCode";
import ResetPassword from "./container/Auth/ResetPassword";
import IndividualRegistration from "./container/Auth/IndividualRegistration";
import HospitalRegistration from "./container/Auth/HospitalRegistration";
import BloodBankRegistration from "./container/Auth/BloodBankRegistration";
import Home from "./container/screen/home/main";
import Terms from "./container/Auth/terms";
import Test from "./container/Auth/Test";
import Profile from "./container/screen/profile/index";
import About from "./container/screen/about/about";
import { useSelector, useDispatch } from "react-redux";

//profile pages
// import MainIndividual from "./container/screen/profile/Individual/MainIndividual";
// import MainHospital from "./container/screen/profile/Hospital/MainHospital";

//services
import FindDonors from "./container/screen/services/findDonors/FindDonors";
import InviteesList from "./container/screen/services/MyDonationReq/inviteesList";
import UpcomingDrive from "./container/screen/services/upcomingDrive/UpcomingDrive";
import BuyBlood from "./container/screen/services/buyBlood/BuyBlood";
import Product from "./container/screen/services/buyBlood/product";
import MyCommitments from "./container/screen/services/myCommitments/MyCommitments";
import MyPurchases from "./container/screen/services/myPurchases/MyPurchases";
import MyDonationReq from "./container/screen/services/MyDonationReq/MyDonationReq";
import ConductDrive from "./container/screen/services/conductDrive/conductDrive";
import MyDrives from "./container/screen/services/myDrives/myDrives";
import MyInventory from "./container/screen/services/myInventory/myInventory";
import MySales from "./container/screen/services/mysales/mySales";
import MyInvites from "./container/screen/services/myInvites/myInvites";
import AcceptedDonors from "./container/screen/services/myDrives/acceptedDonors";
import MyAnalytics from "./container/screen/services/myanalytics/MyAnalytics";
import NotFound from "./container/screen/NotFound";
import LandingPage from "./container/screen/landingPage/landingPage.js";
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
            <Route exact path="/OrganiseDrive" component={ConductDrive} />
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
