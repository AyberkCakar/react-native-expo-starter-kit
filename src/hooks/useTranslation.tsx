import i18n from "i18n-js";
import * as Localization from "expo-localization";
import { StorageService } from "../services";
import React, { useCallback, useContext, useEffect, useState } from "react";

import translations from "../constants/translations/";
import { ITranslate } from "../constants/types";

export const TranslationContext = React.createContext({});

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [locale, setLocale] = useState(Localization.locale);

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
    const localeJSON = await StorageService.getStorageString("locale");

    setLocale(localeJSON !== null ? localeJSON : Localization.locale);
  }, [setLocale]);

  useEffect(() => {
    getLocale();
  }, [getLocale]);

  useEffect(() => {
    StorageService.setStorageString("locale", locale);
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
