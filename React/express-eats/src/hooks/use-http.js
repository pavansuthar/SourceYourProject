// core
import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequet = useCallback(async (httpConfig, sendHttpData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(httpConfig.URL, {
        method: httpConfig.method ? httpConfig.method : "GET",
        headers: httpConfig.headers ? httpConfig.headers : {},
        body: httpConfig.body ? JSON.stringify(httpConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const responseData = await response.json();
      sendHttpData(responseData);
    } catch (e) {
      setError(e.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendHttpRequet,
  };
};

export default useHttp;
