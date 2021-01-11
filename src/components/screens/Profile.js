import React from "react";

const Profile = () => {
  return (
    <div style={{maxWidth:'550px', margin:'0px auto'}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid gray",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://placeimg.com/640/480/people"
          />
        </div>
        <div>
          <h4>Bang Jago</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h5>40 post</h5>
            <h5>40 followers</h5>
            <h5>40 following</h5>
          </div>
        </div>
      </div>

      <div className="gallery">
        <img className="item" src="https://placeimg.com/640/480/arch" />
        <img className="item" src="https://placeimg.com/640/480/arch" />
        <img className="item" src="https://placeimg.com/640/480/arch" />
        <img className="item" src="https://placeimg.com/640/480/arch" />
        <img className="item" src="https://placeimg.com/640/480/arch" />
        <img className="item" src="https://placeimg.com/640/480/arch" />
      </div>
    </div>
  );
};

export default Profile;
