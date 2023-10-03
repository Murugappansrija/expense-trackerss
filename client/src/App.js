import { useSelector, useDispatch } from "react-redux";
import AppBar from "./components/AppBar";

import { Outlet } from "react-router-dom";
import { getUser } from "./store/auth";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate ,redirect} from "react-router-dom";

function App() {
  const token = Cookies.get("token");
  // const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    if (res.ok) {
      const user = await res.json()
     
      
      dispatch(getUser(user))
    }
    setIsLoading(false);
  }

  useEffect(() => {
   console.log('logggg')
    fetchUser()
  }, []);
  if(isLoading){
    return <h1>Loading...</h1>
  }


  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;
