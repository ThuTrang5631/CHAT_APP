import { Check } from "lucide-react";
import { useThemeStore } from "../../store/useThemeStore";
import { THEMES } from "../../utils/constants";

const SettingPage = () => {
  const { theme: themeChoose, saveTheme } = useThemeStore();

  return (
    <div className="setting-page">
      <div className="setting-page-top">
        <h1 className="setting-page-title">Theme</h1>
        <p className="setting-page-desc">Choose a theme for your interface</p>
      </div>

      <div className="grid grid-cols-4 gap-[20px] setting-page-contain-theme">
        {THEMES.map((theme) => {
          return (
            <button
              className={`setting-page-button ${
                themeChoose === theme ? "bg-base-200" : ""
              }`}
              onClick={() => saveTheme(theme)}
            >
              <div
                className="theme-item relative h-8 w-full rounded-md overflow-hidden"
                data-theme={theme}
              >
                <div className="theme-item-contain absolute inset-0 grid grid-cols-4 gap-[5px]">
                  <div className="item-color rounded bg-primary"></div>
                  <div className="item-color rounded bg-secondary"></div>
                  <div className="item-color rounded bg-accent"></div>
                  <div className="item-color rounded bg-neutral"></div>
                </div>
              </div>
              <div className="flex items-center w-full justify-center gap-[5px]">
                <span className="text-[11px] font-medium truncate text-center">
                  {theme.charAt(0).toLocaleUpperCase() + theme.slice(1)}
                </span>
                {themeChoose === theme ? <Check /> : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SettingPage;
