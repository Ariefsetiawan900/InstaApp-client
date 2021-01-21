import React, { useEffect, useState,useContext } from "react";
import { UserContext } from '../../App'

const Profile = () => {
  const [myPics, setPics] = useState([]);
  const {state,dispatch} = useContext(UserContext)

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
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
            alt="profile"
          />
        </div>
        <div>
          <h4>{state?state.name:"Loading"}</h4>
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
        {myPics.map((item) => {
          return <img key={`profileImg-${item._id}`} className="item" src={item.photo} alt={item.title} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
