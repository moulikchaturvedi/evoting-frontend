import { Outlet, useLocation, Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function PrivateRoutesLayout() {
  const location = useLocation();
  const [localUid, setlocalUid] = useState(localStorage.getItem("uid"));

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setlocalUid(user.uid);
      } else {
        setlocalUid("");
      }
    });
  }, []);

  return localUid ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
}

export default PrivateRoutesLayout;
