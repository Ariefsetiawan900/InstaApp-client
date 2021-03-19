import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [myPics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
        console.log(state);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "InstaApp");
      data.append("cloud_name", "de212vzlc");
      fetch("https://api.cloudinary.com/v1_1/de212vzlc/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUrl(data.url);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, pic: data.url })
          );
          dispatch({ type: "UPDATEPIC", payload: data.url });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const uploadPhoto = (file) => {
    setImage(file);
  };
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid gray",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={state ? state.pic : "Loading"}
              alt="profile"
            />
          </div>
          <div>
            <h4>{state ? state.name : "Loading"}</h4>
            <h4>{state ? state.email : "Loading"}</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h5>{myPics.length} post</h5>
              <h5>{state ? state.followers.length : "0"} followers</h5>
              <h5>{state ? state.following.length : "0"} following</h5>
            </div>
          </div>
        </div>

        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div className="btn #64b5f6 blue darken-1">
            <span>Update Pic</span>
            <input
              type="file"
              onChange={(e) => uploadPhoto(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>

      <div className="gallery">
        {myPics.map((item) => {
          return (
            <img
              key={`profileImg-${item._id}`}
              className="item"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
