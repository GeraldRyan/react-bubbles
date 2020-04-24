import React from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const Login = () =>
{
  // make a post request to retrieve a token from the api

  const handleClick = (e) =>{
    e.preventDefault()
    const creds = { username: 'Lambda School', password: 'i<3Lambd4' }
    axiosWithAuth()
    .post("/api/login", creds)
    .then(res=> {
      // console.log("response", res)
      localStorage.setItem("token", res.data.payload)
    })
  }
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <br />
      <form action="">
        <button onClick={handleClick}>Login</button>
      </form>
    </>
  );
};

export default Login;
