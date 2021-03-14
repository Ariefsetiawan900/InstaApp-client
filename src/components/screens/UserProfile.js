import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const [showFollow, setShowFollow] = useState(true);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  //   console.log(userid);

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.getItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false)
      });
  };

  const unFollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.getItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const newFollower =prevState.user.followers.filter(item=>item != data._id)
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower
            },
          };
        });
        setShowFollow(true)
      });
  };

  return (
    <>
      {userProfile ? (
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
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src="https://placeimg.com/640/480/people"
                alt="profile"
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h5>{userProfile.posts.length} post</h5>
                <h5>{userProfile.user.followers.length} followers</h5>
                <h5>{userProfile.user.following.length} following</h5>
              </div>
              {showFollow ? (
                <button
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => followUser()}
                  style={{margin:"10px"}}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="btn waves-effect waves-light #64b5f6 blue darken-1"
                  onClick={() => unFollowUser()}
                  style={{margin:"10px"}}
                >
                  unFollow
                </button>
              )}
            </div>
          </div>

          <div className="gallery">
            {userProfile.posts.map((item) => {
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
      ) : (
        <h2>Loading....!</h2>
      )}
    </>
  );
};

export default Profile;
