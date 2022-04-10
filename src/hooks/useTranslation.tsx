import i18n from "i18n-js";
import * as Localization from "expo-localization";
import Storage from "@react-native-async-storage/async-storage";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AsyncStorage } from 'react-native';

import translations from "../constants/translations/";
import { ITranslate } from "../constants/types";

export const TranslationContext = React.createContext({});

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [locale, setLocale] = useState('en');

  i18n.locale = locale;
  i18n.translations = translations;
  i18n.fallbacks = true;

  const t = useCallback(
    (scope: i18n.Scope, options?: i18n.TranslateOptions) => {
      return i18n.t(scope, { ...options, locale });
    },
    [locale]
  );

  const getLocale = useCallback(async () => {
    const localeJSON = await Storage.getItem("locale");

    setLocale(localeJSON !== null ? localeJSON : Localization.locale);
  }, [setLocale]);

  useEffect(() => {
    getLocale();
  }, [getLocale]);

  useEffect(() => {
    Storage.setItem("locale", locale);
  }, [locale]);

  const contextValue = {
    t,
    locale,
    setLocale,
    translate: t,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () =>
  useContext(TranslationContext) as ITranslate;
