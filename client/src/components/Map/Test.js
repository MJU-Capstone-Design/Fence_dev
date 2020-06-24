import React from "react";
import axios from "axios";
// import { response } from "express";

function Test() {
  axios.get(`/api/users`).then((response) => {
    console.log(response.data);
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>Test page</h2>
    </div>
  );
}

export default Test;
