import { sassExports } from "../utils/utils";
import useWindowDim from "./useWindowDim";

export function useBreakpoint() {
  const { width } = useWindowDim();
  if (!width) return null;

  const { mq, breakpoints } = sassExports;

  const regex = new RegExp(Object.keys(breakpoints).join("|"));
  return Object.entries(mq).find(function ([key, val]) {
    return val.reduce(function (res, exp) {
      const alias = exp.match(regex);
      const predicate = `${width} ${exp.slice(0, alias.index)} ${breakpoints[
        alias[0]
      ].slice(0, -2)}`;

      return res && eval(predicate);
    }, true);
  })[0];
}
