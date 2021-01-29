import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./Components/Auth/Login";
import Options from "./Components/Auth/Options";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import VerifyCode from "./Components/Auth/VerifyCode";
import ResetPassword from "./Components/Auth/ResetPassword";
import IndividualRegistration from "./Components/Auth/IndividualRegistration";
import HospitalRegistration from "./Components/Auth/HospitalRegistration";
import BloodBankRegistration from "./Components/Auth/BloodBankRegistration";
import Home from "./Components/screen/home";
import Terms from "./Components/Auth/terms";
import Test from "./Components/Auth/Test";

//profile pages
// import MainIndividual from "./Components/screen/profile/Individual/MainIndividual";
// import MainHospital from "./Components/screen/profile/Hospital/MainHospital";

//services
import FindDonors from "./Components/screen/services/findDonors/FindDonors";
import UpcomingDrive from "./Components/screen/services/upcomingDrive/UpcomingDrive";
import BuyBlood from "./Components/screen/services/buyBlood/BuyBlood";
import MyCommitments from "./Components/screen/services/myCommitments/MyCommitments";
import MyPurchases from "./Components/screen/services/myPurchases/MyPurchases";

import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/" component={Login} />
          <Route exact path="/ForgotPassword" component={ForgotPassword} />
          <Route exact path="/VerifyCode" component={VerifyCode} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
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
          <Route
            exact
            path="/BloodBankRegistration"
            component={BloodBankRegistration}
          />
          <Route exact path="/Login" component={Login} />

          <Route exact path="/Test" component={Test} />

          {/* <Route exact path="/MainIndividual" component={MainIndividual} />
          <Route exact path="/MainHospital" component={MainHospital} /> */}

          <Route exact path="/FindDonors" component={FindDonors} />
          <Route exact path="/UpcomingDrive" component={UpcomingDrive} />
          <Route exact path="/BuyBlood" component={BuyBlood} />
          <Route exact path="/MyCommitments" component={MyCommitments} />
          <Route exact path="/MyPurchases" component={MyPurchases} />
        </Switch>
      </Provider>
    </>
  );
}

export default App;
