import { useContext } from "react";
import { LangContext } from "../components/RootWrapper";
import Lang from "../utils/i18n";

export const useLang = () => {
  const { langId, setLangId } = useContext(LangContext);
  const lang = Lang.langs[langId] || Object.values(Lang.langs)[0];
  return [
    (key, _id) => Lang.use(key, _id || langId),
    lang.rtl,
    setLangId,
    langId,
  ];
};
