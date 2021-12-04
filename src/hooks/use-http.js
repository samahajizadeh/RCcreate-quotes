import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [Status, setStatus] = useState("");
  const [isError, setIsError] = useState(null);
  const requestHandler = useCallback(async (configData, applyData) => {
    setIsLoading(true);
    try {
      const response = await fetch(configData.url, {
        method: configData.method ? configData.method : "GET",
        headers: configData.headers ? configData.headers : {},
        body: configData.body ? JSON.stringify(configData.body) : null,
      });

      setStatus(response.statusText);
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const responseData = await response.json();
      applyData(responseData);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false);
  }, []);
  return {
    sendRequest: requestHandler,
    isLoading,
    isError,
    Status,
  };
};
export default useHttp;
