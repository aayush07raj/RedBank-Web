import saleImg from "./images/mySales.jpg"
import buyImg from "./images/cart2.jpg"
import findDonorImg from "./images/findDonor.jpg"
import commitmentImg from "./images/myCommitments.jpg"
import invitesImg from "./images/myInvites.jpg"
import sentRequestImg from "./images/sentRequests.jpg"
import upcomingDriveImg from "./images/upcomingDrives.jpg"



const HospitalServices = [
    {
      image: buyImg,
      name: "Buy Blood",
      description:
        "LYou can buy from any BloodBank, You can search for bloodbanks here.",
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
      image: saleImg,
      name: "My Inventory",
      description:
        "You can see your current stock and edit them, so that others user can reach you if they need it.",
      page: "MyInventory",
    },
    {
      image: saleImg,
      name: "Conduct a Drive",
      description:
        "If you want to restock your inventory you can conduct a blood donation drive from this service.",
      page: "ConductDrive",
    },
    {
      image: saleImg,
      name: "My Drives",
      description:
        "All your drives are shown here, you can see the list of donors in that particular drive.",
      page: "MyDrives",
    },
  ];
  
  
 
  
export default HospitalServices;
  