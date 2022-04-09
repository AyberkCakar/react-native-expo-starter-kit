import React, { useCallback, useContext, useEffect, useState } from "react";
import Storage from "@react-native-async-storage/async-storage";

import { ITheme, IUseData } from "../constants/types";

import { light, dark } from "../constants";

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);

  const getIsDark = useCallback(async () => {
    const isDarkJSON = await Storage.getItem("isDark");

    if (isDarkJSON !== null) {
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  const handleIsDark = useCallback(
    (payload: boolean) => {
      setIsDark(payload);
      Storage.setItem("isDark", JSON.stringify(payload));
    },
    [setIsDark]
  );

  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  useEffect(() => {
    setTheme(isDark ? dark : light);
  }, [isDark]);

  const contextValue = {
    isDark,
    handleIsDark,
    theme,
    setTheme,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
