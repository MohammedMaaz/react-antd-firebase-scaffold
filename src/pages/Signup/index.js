import React from "react";
import PlaceholderPage from "../../components/PlaceholderPage";
import { useLang } from "../../utils/i18n";

export default function Signup() {
  const [lang] = useLang();
  return <PlaceholderPage title={`${lang("signup")} ${lang("page")}`} />;
}
