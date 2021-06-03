import React from "react";
import "../components_css/explore.css";
import { Link } from "react-router-dom";

export const Result = ({ provider }) => {
  console.log("provider");
  var styles = {};

  return (
    <div className="prodvidercard">
      <p className="title">{provider.name}</p>
      <p className="title">{provider.location}</p>
      <p className="title">
        <i class="fas fa-phone"> </i> {provider.phone}
      </p>
      
      <Link
        to={{
          pathname: `/service-provider-profile/${provider.uid}`,
          state: null,
        }}
      >
        <button>More details</button>
      </Link>
    </div>
  );
};
