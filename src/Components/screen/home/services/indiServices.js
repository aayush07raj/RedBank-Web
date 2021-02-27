import React from "react";
import saleImg from "./images/mySales.jpg";
import buyImg from "./images/cart2.jpg";
import findDonorImg from "./images/findDonor.jpg";
import commitmentImg from "./images/myCommitments.jpg";
import invitesImg from "./images/myInvites.jpg";
import sentRequestImg from "./images/sentRequests.jpg";
import upcomingDriveImg from "./images/upcomingDrives.jpg";

const IndividualServices = [
  {
    image: buyImg,
    name: "Buy Blood",
    description:
      "You can buy from any BloodBank, You can search for bloodbanks here.",
    page: "BuyBlood",
  },
  {
    image: findDonorImg,
    name: "Find Donors",
    description:
      "You can request any active donor for a donation. You can search for donor in this service",
    page: "FindDonors",
  },
  {
    image: commitmentImg,
    name: "My Commitments",
    description:
      "All your commitments like donation made, drives attended will be shown in this service.",
    page: "MyCommitments",
  },
  {
    image: saleImg,
    name: "My Purchases",
    description:
      "All your order can be seen in this service page, with all details",
    page: "MyPurchases",
  },
  {
    image: sentRequestImg,
    name: "Sent Request",
    description:
      "All your sent request to other donor are shown here with the status of the donation",
    page: "ActiveDonorReq",
  },
  {
    image: upcomingDriveImg,
    name: "Upcoming Drives",
    description:
      "If you want to donate, use this service to see any upcoming drives in your location and apply for it.",
    page: "ActiveDonorReq",
  },
  {
    image: invitesImg,
    name: "My Invites",
    description:
      "If anyone requests you for a donation or a drive, then you can accept or ignore that request in this service",
    page: "MyInvites",
  },
];

export default IndividualServices;
