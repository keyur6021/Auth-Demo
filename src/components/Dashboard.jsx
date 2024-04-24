import React, { useCallback, useEffect } from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import CustomizedTables from "./Table";
import { PRODUCT, SINGLE_PRODUCT } from "./redux/actions/product";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const loginUser = JSON.parse(localStorage.getItem("authUser"));
  const AllProductData = useSelector((state)=> state?.product?.product)
  const singleProductResoponse = useSelector((state)=> state?.product?.singleProduct)
  console.log("singleProductResoponse==", singleProductResoponse)
  const rows = AllProductData?.products?.map((data,index)=>{
    return {
      title:data?.title,
      description:data?.description,
      price:data?.price,
      rating:data?.rating,
      stock:data?.stock
    }
  })
  console.log("rows===", rows);
 const dispatch = useDispatch();
  const productData =  useCallback((data)=>{
    dispatch({type:PRODUCT,payload:data})
  },[])

  const productList = async()=>{
    try{
      const response = await fetch('https://dummyjson.com/products');
      const res = await response.json();
      productData(res)
    }catch(err){
      console.log(err);
    }
  }
   const singleProductList = async()=>{
    try{
      const response = await fetch('https://dummyjson.com/products/1');
      const res = await response.json();
      dispatch({type:SINGLE_PRODUCT,payload:res})
    }catch(err){
      console.log(err);
    }
   }

useEffect(()=>{
  if(loginUser?.role === 'admin'){
    productList()
  }else if(loginUser?.role === 'superAdmin'){
    singleProductList()
  }
},[])

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
      {
        loginUser?.role === 'admin' &&
          <CustomizedTables rows={rows} />
      }
       {
        loginUser?.role === 'superAdmin' &&
          <CustomizedTables rows={[singleProductResoponse]} />
      }
    </div>
  );
};

export default Dashboard;
