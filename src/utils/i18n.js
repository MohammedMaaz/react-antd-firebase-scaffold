import { useContext } from "react";
import { LangContext, _setLang } from "../components/RootWrapper";
import en from "../translations/en.json";
import ur from "../translations/ur.json";

const STORAGE_KEY = "__lang_id__";

let LangId;

let langs = {
  en: {
    translations: en,
    rtl: false,
  },
  ur: {
    translations: ur,
    rtl: true,
  },
};

async function set(langId) {
  LangId = langId;
  localStorage.setItem(STORAGE_KEY, langId);
  _setLang(langId);
}

function get() {
  let langId = LangId || localStorage.getItem(STORAGE_KEY);
  if (!langId) {
    langId = Object.keys(langs)[0];
    localStorage.setItem(STORAGE_KEY, langId);
    LangId = langId;
  }
  return { ...langs[langId], id: langId };
}

function use(key, langId = get().id) {
  return (
    langs[langId]?.translations[key] ||
    Object.values(langs)[0].translations[key] ||
    key
  );
}

export const useLang = () => {
  const { langId, setLangId } = useContext(LangContext);
  const lang = langs[langId] || Object.values(langs)[0];
  return [(key) => use(key, langId), lang.rtl, setLangId, langId];
};

const Lang = {
  set,
  get,
  use,
  langs,
};

export default Lang;
