import React from "react";
import "../components_css/Preview.css";
import { Link } from "react-router-dom";

export const Preview = ({ review }) => {
   
  var userid="/user-profile/"+review.userID;

  return (
    <div>

   
    <div key={review.userId} className="prodviderCardReview">
      <p className="title"><b>{review.title}</b></p>
      <p className="title">{review.desc}</p>
      <p className="title">
        <i class="fas fa-dollar-sign"> </i> {review.amount}
      </p>
      <p className="title">{review.stars}/5</p>
      <p>
        
        <b>REVIEW</b><br></br>
        <p>{review.review}</p>
      </p>
      <div id="sender">
            Date - {review.date} <br></br>
            Review by - <a href={userid}><u>{review.userID}</u></a>
       
      </div>
    
    </div>
    <br></br>

    </div>
  );
};
