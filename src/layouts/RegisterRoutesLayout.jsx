import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function RegisterRoutesLayout() {
  const [localUid, setlocalUid] = useState(localStorage.getItem("uid"));
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setlocalUid(user.uid);
        const docRef = doc(db, "Voters", localUid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().Registered === true) {
        } else if (docSnap.exists()) {
          navigate("/register");
        } else {
          localStorage.removeItem("uid");
          navigate("/");
        }
      } else {
        setlocalUid("");
      }
    });
  }, [localUid, navigate]);

  return <Outlet />;
}

export default RegisterRoutesLayout;
