import type { TTheme } from "../types/types";

export function changeTheme(newTheme: TTheme) {
  document.body.setAttribute("data-theme", newTheme);
}
