// core
import React, { useCallback, useState, useEffect } from "react";
// firebase
import { db } from "./../firebase/firebase";

const storageObj = {
  token: "tokenID",
  expiry: "expiryTime",
  Toast: "showToast",
  prodToast: "showProductToast",
};
let logOutTimer;

const AuthContext = React.createContext({
  tokenID: "",
  userEmailId: "",
  isUserLoggedIn: false,
  isUserAdmin: false,
  LoggedIn: (token) => {},
  LoggedOut: () => {},
});

const calculateRemainingTime = (expTime) => {
  let adjustedTime, remainingTime;
  if (!expTime) {
    remainingTime = null;
    return remainingTime;
  }
  const currentTime = new Date().getTime();
  adjustedTime = new Date(expTime).getTime();
  remainingTime = adjustedTime - currentTime;
  return remainingTime;
};

const retrieveTokenData = () => {
  const TokenId = localStorage.getItem(storageObj.token);
  const Expiration = localStorage.getItem(storageObj.expiry);
  const remainingTime = calculateRemainingTime(Expiration);
  if (remainingTime <= 60000) {
    localStorage.removeItem(storageObj.token);
    localStorage.removeItem(storageObj.expiry);
    return null;
  }
  return {
    token: TokenId,
    durationTIme: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveTokenData();
  let initialTokenID;
  if (tokenData) {
    initialTokenID = tokenData.token;
  }
  const [tokenId, setTokenId] = useState(initialTokenID);
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const isUserLogged = !!tokenId;

  const OnLoggedOutHandler = useCallback(() => {
    setTokenId(null);
    localStorage.removeItem(storageObj.token);
    localStorage.removeItem(storageObj.expiry);
    localStorage.removeItem(storageObj.Toast);
    localStorage.removeItem(storageObj.prodToast);
    if (logOutTimer) {
      clearInterval(logOutTimer);
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      logOutTimer = setTimeout(OnLoggedOutHandler, tokenData.duration);
    }
  }, [tokenData, OnLoggedOutHandler]);

  const OnLoggedInHandler = (token, expTime, emailId) => {
    setTokenId(token);
    setUserEmail(emailId);
    let getUserData = [];
    db.collection("users")
      .get()
      .then((snapshot) => {
        let getUser = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        getUserData.push(...getUser);
        const getAdminUser = getUserData.filter(
          (user) => user.emailId === emailId
        );
        setIsAdmin(getAdminUser[0]?.isAdmin);
        localStorage.setItem(storageObj.token, token);
        localStorage.setItem(storageObj.expiry, expTime);
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

AuthContextProvider.displayName = "authContext";
export default AuthContext;
