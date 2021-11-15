// core
import React, { useCallback, useState, useEffect } from "react";
// firebase
import { db } from "./../firebase/firebase";

let logOutTimer;

// create context object
const AuthContext = React.createContext({
  tokenID: "",
  userEmailId: "",
  isUserLoggedIn: false,
  isUserAdmin: false,
  LoggedIn: (token) => {},
  LoggedOut: () => {},
});

/**
 * checks & calculates remaining tokenID expiry time
 * @param {*} expiry time
 * @returns remaining time left
 */
const calculateRemainingTime = (expTime) => {
  let adjustedTime, remainingTime;
  if (!expTime) {
    remainingTime = null;
    return remainingTime;
  }
  const currentTime = new Date().getTime();
  adjustedTime = new Date(expTime).getTime();
  remainingTime = adjustedTime - currentTime;
  console.log("Cal remaining time:", remainingTime);
  return remainingTime;
};

/**
 * Retrives token details
 * @returns {object} tokenID, expiry duration
 */
const retrieveTokenData = () => {
  const TokenId = localStorage.getItem("tokenID");
  const Expiration = localStorage.getItem("expiryTime");
  const remainingTime = calculateRemainingTime(Expiration);
  console.log("Retrive remaining time:", remainingTime);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expTime");
    return null;
  }
  return {
    token: TokenId,
    durationTIme: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  // getting token details
  const tokenData = retrieveTokenData();
  let initialTokenID;
  if (tokenData) {
    initialTokenID = tokenData.token;
  }
  const [tokenId, setTokenId] = useState(initialTokenID);
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const isUserLogged = !!tokenId;

  /**
   * Handler when user gets logged out
   */
  const OnLoggedOutHandler = useCallback(() => {
    setTokenId(null);
    localStorage.removeItem("tokenID");
    localStorage.removeItem("expiryTime");
    if (logOutTimer) {
      clearInterval(logOutTimer);
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      console.log("tokenData:", tokenData);
      logOutTimer = setTimeout(OnLoggedOutHandler, tokenData.duration);
    }
  }, [tokenData, OnLoggedOutHandler]);

  /**
   * Handler when user gets logged in
   * @param {*} token
   * @param {*} expTime
   */
  const OnLoggedInHandler = (token, expTime, emailId) => {
    setTokenId(token);
    setUserEmail(emailId);
    let getUsersData = [];
    db.collection("users")
      .get()
      .then((snapshot) => {
        let getUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(getUsers);
        getUsersData.push(...getUsers);
        console.log(getUsersData);
        const getAdminUser = getUsersData.filter(
          (user) => user.emailId === emailId
        );
        setIsAdmin(getAdminUser[0]?.isAdmin);
        localStorage.setItem("tokenID", token);
        localStorage.setItem("expiryTime", expTime);
        let remainingTime = calculateRemainingTime(expTime);
        logOutTimer = setTimeout(OnLoggedOutHandler, remainingTime);
      });
  };

  const contextValue = {
    tokenID: tokenId,
    userEmailId: userEmail,
    isUserLoggedIn: isUserLogged,
    isUserAdmin: isAdmin,
    LoggedIn: OnLoggedInHandler,
    LoggedOut: OnLoggedOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
