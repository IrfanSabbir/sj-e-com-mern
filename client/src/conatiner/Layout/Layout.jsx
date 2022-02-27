import React from "react";
import Navigation from "./LandingNav/Navigations";
const LandingLayout = (props) => {
  return (
    <div>
      <Navigation />

      <main>{props.children}</main>
    </div>
  );
};

export default LandingLayout;
