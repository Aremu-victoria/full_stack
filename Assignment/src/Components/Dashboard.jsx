import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
const [data, setData] = useState([]);


let navigate = useNavigate();
const storeToken = localStorage.getItem('token');
const verifyToken = () => {
if(!storeToken){
    console.warn('No token found');
    navigate("/signin");
    return;
}
    let toVerify;

    try{
        toVerify = JSON.parse(storeToken);
    }catch(error){
    console.log("invalid Token");
    localStorage.removeItem('token');
    navigate('/signin');
    return;
    
    }
    axios.post("https://full-stack-slgm.onrender.com/verifyToken", {token : toVerify})
    .then((response) => {
        const decoded = response.data.decoded
        console.log(decoded);
        if(!decoded || decoded.exp < Math.floor(Date.now() / 1000)){
            localStorage.removeItem('token')
            navigate('/signin')
        }
    }).catch((err) => {
        localStorage.removeItem('token')
        console.log(err,"Token not verified");
        navigate('/signin'); // Navigate to login on error
    })
}
useEffect(() => {
const Interval = setInterval( verifyToken, 6000);
return () => clearInterval(Interval)
}, [navigate])

  return (
    <div> welcome to Dashboard</div>
  )
}

export default Dashboard