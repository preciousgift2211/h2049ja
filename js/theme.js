"use strict";

const THEME_STORAGE_KEY = "h2o49ja_theme";

function applyTheme(isDark) {
  document.documentElement.classList.toggle("dark-theme", isDark);
}

function loadThemePreference() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  } catch (error) {
    console.error("Could not read the theme preference:", error);
    return false;
  }
}

function saveThemePreference(isDark) {
  applyTheme(isDark);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  } catch (error) {
    console.error("Could not save the theme preference:", error);
  }
}

applyTheme(loadThemePreference());

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");

  if (!themeToggle) {
    return;
  }

  themeToggle.checked = document.documentElement.classList.contains("dark-theme");
  themeToggle.addEventListener("change", function () {
    saveThemePreference(themeToggle.checked);
  });
});

window.addEventListener("storage", function (event) {
  if (event.key === THEME_STORAGE_KEY || event.key === null) {
    applyTheme(event.newValue === "dark");
  }
});
