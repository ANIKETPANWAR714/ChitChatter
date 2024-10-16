import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const TweetBox = () => {
  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser] = useLoggedInUser();
  const [user, loading, error] = useAuthState(auth);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  if (!user) {
    console.log("User is not authenticated");
    return <div>Please log in to continue.</div>;
  }
  
  const email = user?.email;
  
  //console.log(email);
  

  const userProfilePic = loggedInUser[0]?.profileImage
    ? loggedInUser[0]?.profileImage
    : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
  //console.log(loggedInUser);

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);

    axios
      .post(
        "https://api.imgbb.com/1/upload?key=0d73ada151aee1f5f8ea292527b6b682",
        formData
      )
      .then((res) => {
        setImageURL(res.data.data.display_url);
        console.log(res.data.data.display_url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleTweet = (e) => {
    e.preventDefault();
    console.log(user);
    if (user?.providerData[0]?.providerId === "password") {
      fetch(`http://localhost:5000/loggedInUser/email= ${email}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data[0]?.name);
          setUsername(data[0]?.username);
        });
    } else {
      setName(user?.displayName)
      setUsername(email?.split("@")[0]);
    }
    if (name) {
      const userPost = {
        profilePhoto: userProfilePic,
        post: post,
        photo: imageURL,
        username: username,
        name: name,
        email: email
      };

      console.log(userPost);
      fetch(`http://localhost:5000/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userPost)
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        });
    }
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isLoading ? (
              <p>uploading image</p>
            ) : (
              <p>{imageURL ? "image uploaded" : <AddPhotoAlternateIcon />}</p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};
export default TweetBox;
