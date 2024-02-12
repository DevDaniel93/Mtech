import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";
import { Permission } from "../Screens/Permission";
 
import { LeadListing } from "../Screens/LeadListing";
// import DepartDetails from "../Screens/LeadListing/DepartDetails";
import { UnitListing } from "../Screens/UnitListing";
import { AddLead } from "../Screens/LeadListing/AddLead";
import { DetailListing } from "../Screens/LeadListing/DetailListig";
import { EditLead } from "../Screens/LeadListing/EditLead";

import { UserManagement } from "../Screens/UserManagement";
import { UserDetail } from "../Screens/UserManagement/UserDetail";
import { AddUser } from "../Screens/UserManagement/AddUser";
import { EditUser } from "../Screens/UserManagement/EditUser";

import { RefundManagement } from "../Screens/RefundManagement";
import { AddRefund } from "../Screens/RefundManagement/AddRefund";
import { EditRefund } from "../Screens/RefundManagement/EditRefund";
import { RefundDetail } from "../Screens/RefundManagement/RefundDetail";

import { ChargeBackManagement } from "../Screens/ChargeBackManagement";
import { AddChargeBack } from "../Screens/ChargeBackManagement/AddChargeBack";
import { EditChargeBack } from "../Screens/ChargeBackManagement/EditChargeBack";
import { ChargeBackDetail } from "../Screens/ChargeBackManagement/ChargeBackDetail";

import { PurchaseManagement } from "../Screens/PurchaseManagement";
import { AddPurchase } from "../Screens/PurchaseManagement/AddPurchase";
import { EditPurchase } from "../Screens/PurchaseManagement/EditPurchase";
import { PurchaseDetail } from "../Screens/PurchaseManagement/PurchaseDetail";

import { ReversalDetail } from "../Screens/ReversalManagement/ReversalDetail";
import { ReversalManagement } from "../Screens/ReversalManagement";
import { AddReversal } from "../Screens/ReversalManagement/AddReversal";
import { EditReversal } from "../Screens/ReversalManagement/EditReversal";

import { ReportManagement } from "../Screens/ReportManagement";
import { UnitReportManagement } from "../Screens/UnitReportManagement";

import { BrandListing } from "../Screens/BrandListing";
import { Roles } from "../Screens/Roles";

import { UnitTarget } from "../Screens/UnitTarget";
import { TargetDetails } from "../Screens/UnitTarget/targetDetails";


import { UserTarget } from "../Screens/UserTarget";
import { UsertargetDetails } from "../Screens/UnitTarget/UsertargetDetails";

import { MerchantManagement } from "../Screens/MerchantManagement";

import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";


export default function AdminRouter() {
 



  const token = localStorage.getItem('login');
 

  return (
    <BrowserRouter basename="/">
      <Routes>
 

        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<AdminLogin />} />

 
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />

        <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} />
        <Route path="/permission" element={<ProtectedRoutes Components={Permission} />} />
        <Route path="/role-management" element={<ProtectedRoutes Components={Roles} />} />

        <Route path="/lead-listing" element={<ProtectedRoutes Components={LeadListing} />} />
        <Route path="/lead-detail/:id" element={<ProtectedRoutes Components={DetailListing} />} />
        <Route path="/edit-lead/:id" element={<ProtectedRoutes Components={EditLead} />} />
        <Route path="/add-lead/" element={<ProtectedRoutes Components={AddLead} />} />


        <Route path="/user-management" element={<ProtectedRoutes Components={UserManagement} />} />
        <Route path="/user-detail/:id" element={<ProtectedRoutes Components={UserDetail} />} />
        <Route path="/add-user/" element={<ProtectedRoutes Components={AddUser} />} />
        <Route path="/edit-user/:id" element={<ProtectedRoutes Components={EditUser} />} />

        <Route path="/unit-listing" element={<ProtectedRoutes Components={UnitListing} />} />
        <Route path="/brand-listing" element={<ProtectedRoutes Components={BrandListing} />} />
 

        <Route path="/target-listing" element={<ProtectedRoutes Components={UnitTarget} />} />
        <Route path="/target-listing/target-detail/:id" element={<ProtectedRoutes Components={TargetDetails} />} />




        <Route path="/Usertarget-listing" element={<ProtectedRoutes Components={UserTarget} />} />
        <Route path="/target-listing/usertarget-detail/:id" element={<ProtectedRoutes Components={UsertargetDetails} />} />






 

        <Route path="/merchant-management" element={<ProtectedRoutes Components={MerchantManagement} />} />

        <Route path="/refund-management" element={<ProtectedRoutes Components={RefundManagement} />} />
        <Route path="/refund-detail/:id" element={<ProtectedRoutes Components={RefundDetail} />} />
        <Route path="/add-refund/" element={<ProtectedRoutes Components={AddRefund} />} />
        <Route path="/edit-refund/:id" element={<ProtectedRoutes Components={EditRefund} />} />

        <Route path="/chargeback-management" element={<ProtectedRoutes Components={ChargeBackManagement} />} />
        <Route path="/chargeback-detail/:id" element={<ProtectedRoutes Components={ChargeBackDetail} />} />
        <Route path="/add-chargeback/" element={<ProtectedRoutes Components={AddChargeBack} />} />
        <Route path="/edit-chargeback/:id" element={<ProtectedRoutes Components={EditChargeBack} />} />

        <Route path="/purchase-management" element={<ProtectedRoutes Components={PurchaseManagement} />} />
        <Route path="/purchase-detail/:id" element={<ProtectedRoutes Components={PurchaseDetail} />} />
        <Route path="/add-purchase/" element={<ProtectedRoutes Components={AddPurchase} />} />
        <Route path="/edit-purchase/:id" element={<ProtectedRoutes Components={EditPurchase} />} />

        <Route path="/reversal-management" element={<ProtectedRoutes Components={ReversalManagement} />} />
        <Route path="/reversal-detail/:id" element={<ProtectedRoutes Components={ReversalDetail} />} />
        <Route path="/add-reversal/" element={<ProtectedRoutes Components={AddReversal} />} />
        <Route path="/edit-reversal/:id" element={<ProtectedRoutes Components={EditReversal} />} />


        <Route path="/report-management" element={<ProtectedRoutes Components={ReportManagement} />} />
        <Route path="/unit-report-management" element={<ProtectedRoutes Components={UnitReportManagement} />} />

        <Route path="/profile" element={<ProtectedRoutes Components={Profile} />} />
        <Route path="/profile/edit-profile" element={<ProtectedRoutes Components={EditProfile} />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
