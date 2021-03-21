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

import Invoice from "./container/screen/services/myPurchases/invoice";
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
import {ProtectedRoute} from "./protected.route";


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
      { loggedIn.isLoggedIn ? ( 
            <>
              <ProtectedRoute exact path="/home" component={Home} />
              <ProtectedRoute exact path="/About" component={About} />
              <ProtectedRoute  exact path="/profile" component={Profile}/>
              <ProtectedRoute exact path="/MyDonationReq" component={MyDonationReq} />
              <ProtectedRoute exact path="/FindDonors" component={FindDonors}/>
              <ProtectedRoute exact path="/UpcomingDrive" component={UpcomingDrive}/>
              <ProtectedRoute exact path="/BuyBlood" component={BuyBlood}/>
              <ProtectedRoute exact path="/BuyBlood/Product" component={Product}/>
              <ProtectedRoute exact path="/MyCommitments" component={MyCommitments}/>
              <ProtectedRoute exact path="/MyPurchases" component={MyPurchases}/>
              <ProtectedRoute exact path="/MyPurchases/Invoice" component={Invoice}/>
              <ProtectedRoute exact path="/OrganiseDrive" component={ConductDrive}/>
              <ProtectedRoute exact path="/MyDrives" component={MyDrives}/>
              <ProtectedRoute exact path="/AcceptedDonors" component={AcceptedDonors}/>
              <ProtectedRoute exact path="/MyInventory" component={MyInventory}/>
              <ProtectedRoute exact path="/MySales" component={MySales}/>
              <ProtectedRoute exact path="/MyInvites" component={MyInvites}/ >
              <ProtectedRoute exact path="/MyAnalytics" component={MyAnalytics}/>
              <ProtectedRoute exact path="/inviteesList" component={InviteesList}/>
              {/* <ProtectedRoute component={NotFound}/> */}
              </>
          ):
          <>
          <Route exact path="/" component={LandingPage} />
          <Route
              exact
              path="/BloodBankRegistration"
              component={BloodBankRegistration}
            />
          <Route exact path="/Login"  component={Login} />
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
          </> }
          
          <Route component={NotFound}/>
      </Switch>
    </>
  );
}

export default App;
