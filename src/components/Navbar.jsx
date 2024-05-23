import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function Navbar() {
  const [name, setName] = useState(localStorage.getItem("uName"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // const [params, setParams] = useState();
  // const fullscreenPopup = async (url) => {
  //   width = screen.width;
  //   height = screen.height;
  //   setParams(
  //     "width=" +
  //       screen.width +
  //       ", height=" +
  //       screen.height +
  //       ", top=0, left=0" +
  //       ", fullscreen=yes"
  //   );

  //   let newwin = window.open(url, "windowname4", params);
  //   if (window.focus) {
  //     newwin.focus();
  //   }
  //   return false;
  // };

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("uName", user.displayName);
        setName(localStorage.getItem("uName"));
        setIsLoggedIn(true);
      } else {
      }
    });
    // console.log(window.location.pathname);
    // if (window.location.pathname == "/voting") {
    //   window.open("/voting", "fs", "fullscreen,scrollbars");
    // }
  }, []);

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        const user = result.user;
        setIsLoggedIn(true);
        setDoc(
          doc(db, "Voters", user.uid),
          {
            uid: user.uid,
            Email: user.email,
          },
          { merge: true }
        );
        navigate("/register");
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        localStorage.removeItem("uid");
        console.log("User Signed Out");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar my-1 mx-4">
      <h5 style={isLoggedIn ? { display: "inline" } : { display: "none" }}>
        User: {name}
      </h5>
      <div>
        <button className="btn btn-primary mx-2" onClick={() => navigate("/")}>
          Home
        </button>
        <button
          className="btn btn-outline-danger"
          style={isLoggedIn ? { display: "inline" } : { display: "none" }}
          onClick={signout}
        >
          SignOut
        </button>
        <button
          className="btn btn-outline-primary"
          style={isLoggedIn ? { display: "none" } : { display: "inline" }}
          onClick={signInWithGoogle}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
