import React from "react";
import styled from "styled-components";
// import Search from "../Search/Search";

const Title = styled.h2`
  font-family: "Bungee", cursive;
  font-size: 1.7em;
  text-align: center;
  margin: 0 auto;
  padding: 0.5em;
`;
function Header({ onPlaceSelected }) {
  return (
    <Title>
      <span role="img" aria-label="fence">
        🚧
      </span>
      FENCE
      <span role="img" aria-label="fence">
        🚧
      </span>
    </Title>
  );
}

export default Header;
