import { useEffect, useState } from "react";

const useLocalStorage = (key, defValue) => {
  const initValue = JSON.parse(localStorage.getItem(key)) || defValue;

  const [data, setData] = useState(initValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;
