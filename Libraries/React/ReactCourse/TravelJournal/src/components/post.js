import React from "react";
import ping from '../assets/ping.png'

function Post(props) {
  console.log(props);
  return (
    <div className="post">
      <div className="post__img">
        <img src={props.imageUrl} alt="mountaints"></img>
      </div>
      <div className="post__description">
        <span className="post__description__location">
          <img src={ping} alt="location icon"></img>
          {props.location}
          <span className="post__description__location-googleMaps">
            <a href={props.googleMapsUrl}> View on Google maps</a>
          </span>
        </span>
        <h1 className="post__description__title"> {props.title}</h1>
        <span className="post__description__date">
          {props.startDate} - {props.endDate}
        </span>
        <p className="post__description__excerpt"> {props.description}</p>
      </div>
    </div>
  );
}
export default Post;
