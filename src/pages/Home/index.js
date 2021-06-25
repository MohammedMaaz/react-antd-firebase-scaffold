import React from "react";
import PlaceholderPage from "../../components/PlaceholderPage";
import { useLang } from "../../utils/i18n";

export default function Home() {
  const [lang] = useLang();
  return <PlaceholderPage title={`${lang("menu_home")} ${lang("page")}`} />;
}
