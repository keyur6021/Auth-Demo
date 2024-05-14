import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { Box, Button } from "@mui/material";
import CustomizedTables from "./Table";
import { PRODUCT, SINGLE_PRODUCT } from "./redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const loginUser = JSON.parse(localStorage.getItem("authUser"));
  const {role, username} = loginUser;
  const navigate  = useNavigate()
  const AllProductData = useSelector((state) => state?.product?.product);
  const singleProductResoponse = useSelector(
    (state) => state?.product?.singleProduct
  );
  const rows = AllProductData?.products?.map((data, index) => {
    return {
      title: data?.title,
      description: data?.description,
      price: data?.price,
      rating: data?.rating,
      stock: data?.stock,
    };
  });
  const dispatch = useDispatch();
  const productData = useCallback((data) => {
    dispatch({ type: PRODUCT, payload: data });
  }, []);

  const productList = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const res = await response.json();
      productData(res);
    } catch (err) {
      console.log(err);
    }
  };
  const singleProductList = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products/1");
      const res = await response.json();
      dispatch({ type: SINGLE_PRODUCT, payload: res });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (role === "admin" && username === 'keyur') {
      productList();
    } else if (role === "superAdmin" && username === 'alpesh') {
      singleProductList();
    }
  }, []);

  const allUsers = [
    { title: "Admin", id: 1 },
    { title: "SuperAdmin", id: 2 },
    { title: "Manager", id: 3 },
    { title: "CEO", id: 4 },
  ];
  const [user, setUser] = useState([]);
  console.log("user===", user);

 

  return (
    <div>
      <Header loginUser={loginUser} />
      {role === "admin" && username === "keyur" && (
        <Box className="header">This Access for admin only </Box>
      )}
      {role === "superAdmin" && username === "alpesh" && (
        <Box className="header">This Access for SuperAdmin only</Box>
      )}
      {role === "admin" && username === "keyur" && <CustomizedTables rows={rows} />}

      {role === "superAdmin" && username === "alpesh" && (
        <CustomizedTables rows={[singleProductResoponse]} />
      )}
{
  !(username === 'keyur'|| username === 'alpesh') &&
        <div className="error-msg">
        You Are Enter Wrong Credentials !!!
        <Button className="wrong-btn" variant="contained" onClick={()=> navigate('/')}> Login 🤭</Button>
        </div>
}
        

{/* //! other one */}
      {/* {allUsers?.map((data, index) => {
        const userIndex = user?.findIndex((user) => user?.id === data?.id);
        console.log("userIndex:", userIndex)
        return (
          <div
            key={index}
            onChange={() => {
              if (userIndex === -1) {
                setUser((prev) => [...prev, data]);
              }else{
                setUser((prev)=> prev?.filter((user) => user?.id !== data?.id));
              }
            }}
           className="check"
          >
            <input type="checkbox" value={data?.id} />
            <div>{data?.title}</div>
          </div>
        );
      })}
 
      <div className="parent_space">
        {user?.map((data, index) => {
          return (
            <div key={index} className="parent_box_data" onClick={()=> setUser((prev)=> prev?.filter((item)=> data?.id !== item?.id))}>
              {data?.title}
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default Dashboard;
