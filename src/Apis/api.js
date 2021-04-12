import axios from "axios";

export default {
  post() {
    return {
      authenticateUser: (userCredentials) =>
        axios.post("http://localhost:8080/authenticate", userCredentials),
      sendOtp: (userEmail) =>
        axios.post("http://localhost:8080/verification/sendotp", userEmail),
      verifyOtp: (data) =>
        axios.post("http://localhost:8080/verification/verifyotp", data),
      registerInd: (userDetails) =>
        axios.post("http://localhost:8080/registerind", userDetails),
      registerHos: (userDetails) =>
        axios.post("http://localhost:8080/registerhos", userDetails),
      registerBB: (userDetails) =>
        axios.post("http://localhost:8080/registerbb", userDetails),
      forgotPassword: (userEmail) =>
        axios.post("http://localhost:8080/email/sendotp", userEmail),
      verifyOtp2: (data) =>
        axios.post("http://localhost:8080/email/verifyotp", data),
      addMessage: (message, headers) =>
        axios.post(
          "http://localhost:8080/contactus/addmessage",
          message,
          headers
        ),
      verifyCurrPassword: (currPassword, headers) =>
        axios.post(
          "http://localhost:8080/profile/verifycurrentpassword",
          currPassword,
          headers
        ),
      findBloodBanks: (formData, headers) =>
        axios.post("http://localhost:8080/buyblood/findbb", formData, headers),
      confirmTransaction: (transactionDetails, headers) =>
        axios.post(
          "http://localhost:8080/buyblood/confirmbuy",
          transactionDetails,
          headers
        ),
      organizeDrive: (formData, headers) =>
        axios.post(
          "http://localhost:8080/conductadrive/savedrivedetails",
          formData,
          headers
        ),
      findDrives: (formData, headers) =>
        axios.post(
          "http://localhost:8080/upcomingdrives/fetchdriveslist",
          formData,
          headers
        ),
      registerForDrive: (driveId, headers) =>
        axios.post(
          "http://localhost:8080/upcomingdrives/registerfordrive",
          driveId,
          headers
        ),
      findDonors: (formData, headers) =>
        axios.post(
          "http://localhost:8080/finddonors/donorslist",
          formData,
          headers
        ),
      sendNotification: (formData, headers) =>
        axios.post(
          "http://localhost:8080/finddonors/sendnotification",
          formData,
          headers
        ),
    };
  },

  put() {
    return {
      resetPassword: (userCredentials) =>
        axios.put(
          "http://localhost:8080/profile/resetpassword",
          userCredentials
        ),
      setDonorStatus: (donorStatus, headers) =>
        axios.put(
          "http://localhost:8080/profile/donorstatus",
          donorStatus,
          headers
        ),
      updateIndProfile: (newData, headers) =>
        axios.put(
          "http://localhost:8080/profile/updateindprofile",
          newData,
          headers
        ),
      updateHosProfile: (newData, headers) =>
        axios.put(
          "http://localhost:8080/profile/updatehosprofile",
          newData,
          headers
        ),
      updateBbProfile: (newData, headers) =>
        axios.put(
          "http://localhost:8080/profile/updatebbprofile",
          newData,
          headers
        ),
      changePassword: (newPassword, headers) =>
        axios.put(
          "http://localhost:8080/profile/changepassword",
          newPassword,
          headers
        ),
      updateHosInventory: (updates, headers) =>
        axios.put(
          "http://localhost:8080/inventory/updatehosinventory",
          updates,
          headers
        ),
      updateBbInventory: (updates, headers) =>
        axios.put(
          "http://localhost:8080/inventory/updatebbinventory",
          updates,
          headers
        ),
      cancelDrive: (driveId, headers) =>
        axios.put(
          "http://localhost:8080/mydrives/canceldrive",
          driveId,
          headers
        ),
      verifyDonorStatus: (data, headers) =>
        axios.put(
          "http://localhost:8080/mydrives/drivedonorverification",
          data,
          headers
        ),
      setInviteStatus: (eventDetails, headers) =>
        axios.put(
          "http://localhost:8080/invites/inviteresponse",
          eventDetails,
          headers
        ),
      expireDonationRequest: (donationId, headers) =>
        axios.put(
          "http://localhost:8080/donationrequests/expirerequest",
          donationId,
          headers
        ),
    };
  },

  get() {
    return {
      fetchUserProfile: (headers) =>
        axios.get("http://localhost:8080/profile/fetchuserprofile", headers),
      fetchUserData: (headers) =>
        axios.get("http://localhost:8080/profile/fetchuserdata", headers),
      fetchCommitments: (headers) =>
        axios.get("http://localhost:8080/commitment", headers),
      fetchSales: (headers) =>
        axios.get("http://localhost:8080/transactions/fetchsaleslist", headers),
      fetchPurchases: (headers) =>
        axios.get(
          "http://localhost:8080/transactions/fetchpurchaseslist",
          headers
        ),
      receiveInventory: (headers) =>
        axios.get("http://localhost:8080/inventory/receieveinventory", headers),
      fetchDrives: (headers) =>
        axios.get("http://localhost:8080/mydrives/fetchdrives", headers),
      fetchDriveDonorList: (driveId, headers) =>
        axios.get(
          `http://localhost:8080/mydrives/fetchdrivedonorlist/${driveId}`,
          headers
        ),
      fetchInvites: (headers) =>
        axios.get("http://localhost:8080/invites/fetchinvites", headers),
      fetchDonationRequests: (headers) =>
        axios.get(
          "http://localhost:8080/donationrequests/fetchrequests",
          headers
        ),
      fetchDonationDonorList: (donationId, headers) =>
        axios.get(
          `http://localhost:8080/donationrequests/fetchdonationdonorlist/${donationId}`,
          headers
        ),
      fetchTodaysStats: (headers) =>
        axios.get("http://localhost:8080/salesanalytics/fetchnow", headers),
    };
  },
};
