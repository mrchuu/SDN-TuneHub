import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import "../style/themeSwitcher.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toogleTheme } from "../redux/theme.js";
export default function ThemeSwitcher() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (theme) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <div>
      <input
        type="checkbox"
        class="checkbox"
        id="checkbox"
        onChange={(e) => {
          console.log(e.currentTarget.checked);
          dispatch(toogleTheme());
        }}
      />
      <label
        for="checkbox"
        class="checkbox-label border-light10 border-2 dark:border-dark10"
      >
        <FaSun color="#da8f66" />
        <FaMoon color="#F2785C" />
        <span class="ball"></span>
      </label>
    </div>
  );
}
