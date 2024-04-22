import React from "react";
import Header from "./Header";
import { Box } from "@mui/material";

const Dashboard = () => {
  const loginUser = JSON.parse(localStorage.getItem("authUser"));
  return (
    <div>
      <Header loginUser={loginUser} />
      {
        loginUser?.role === 'admin' && loginUser?.username==='keyur' &&
         <Box className='header'>This Access for admin only </Box>
      }
      {
        loginUser?.role === 'superAdmin' && loginUser?.username==='alpesh' &&
      <Box className='header'>This Access for SuperAdmin only</Box>
      }
    </div>
  );
};

export default Dashboard;
