import React, { useEffect, useState } from "react";

import { Navigate ,redirect} from "react-router-dom";
import { useSelector } from "react-redux";

const Verification = ({ children }) => {
  const auth = useSelector((state) => state.auth);

return auth. isAuthenticated ? children : <Navigate to="/login" replace={true} />;

};

export default Verification;
