import i18n from "i18n-js";
import { ImageSourcePropType } from "react-native";
import { ITheme } from "./theme";

export * from "./components";
export * from "./theme";

export interface ILocation {
  id?: number;
  city?: string;
  country?: string;
}

export interface ITranslate {
  locale: string;
  setLocale: (locale?: string) => void;
  t: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
  translate: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
}
export interface IExtra {
  id?: number;
  name?: string;
  time?: string;
  image: ImageSourcePropType;
  saved?: boolean;
  booked?: boolean;
  available?: boolean;
  onBook?: () => void;
  onSave?: () => void;
  onTimeSelect?: (id?: number) => void;
}

export interface IUseData {
  isDark: boolean;
  handleIsDark: (isDark?: boolean) => void;
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
  notifications: INotification[];
  handleNotifications: (data?: INotification[]) => void;
}

export interface INotification {
  id?: number;
  subject?: string;
  message?: string;
  read?: boolean;
  business?: boolean;
  createdAt?: number | Date;
  type:
    | "document"
    | "documentation"
    | "payment"
    | "notification"
    | "profile"
    | "extras"
    | "office";
}
