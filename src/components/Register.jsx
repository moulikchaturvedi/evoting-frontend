import React, { useState } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

async function isRegistered(uid) {
  const docRef = doc(db, "Voters", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data().Registered === true) {
    return true;
  }
  return false;
}

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [Registered, setRegistered] = useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        if (await isRegistered(user.uid)) {
          setRegistered(true);
        } else {
          setRegistered(false);
        }
      } else {
      }
    });
  }, []);

  const [VoterID, setVoterID] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hashing the Voter ID
    const hashValue = (val) =>
      crypto.subtle
        .digest("SHA-256", new TextEncoder("utf-8").encode(val))
        .then((h) => {
          let hexes = [],
            view = new DataView(h);
          for (let i = 0; i < view.byteLength; i += 4)
            hexes.push((VoterID + view.getUint32(i).toString(16)).slice(-8));
          return hexes.join("");
        });

    const VoterIDHash = await hashValue(
      JSON.stringify({ a: "a", b: [1, 2, 3, 4], foo: { c: "bar" } })
    );

    console.log("VoterID Hash =>  " + VoterIDHash);

    if (VoterID !== "") {
      setDoc(
        doc(db, "Voters", user.uid),
        {
          VoterID: VoterIDHash,
          Registered: true,
        },
        { merge: true }
      );
      setVoterID("");
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="container my-5">
        <h1>Voter-ID Registration </h1>
        {Registered === true ? (
          <div>
            Congratulations! You are already registered!
            <Link to={"/dashboard"}>Go Back to Dashboard!</Link>
          </div>
        ) : (
          <div>
            <span className="text-danger">
              IT IS IMPORTANT TO REGISTER YOUR VOTER-ID BEFORE YOU PROCEED.
            </span>
            {"\n"}
            <span className="text-danger">
              If already applied, do nothing.{" "}
              <Link to={"/dashboard"}>Go Back to Dashboard!</Link>
            </span>
            <form className="my-3" onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Enter your VoterID Number"
                className="form-control"
                value={VoterID}
                onChange={(e) => setVoterID(e.target.value)}
              />
              <button className="my-3 btn btn-secondary">
                Apply for Registeration
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
