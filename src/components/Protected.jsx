import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const {Component} = props;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const myTokenData = JSON.parse(token);
    const tokenData = myTokenData?.user?.station;
    const stations = tokenData.split(",");

    useEffect(()=>{
        if(!token){
            navigate("/");
        }
    })
  return (
    <div>
      <Component/>
    </div>
  )
}

export default Protected