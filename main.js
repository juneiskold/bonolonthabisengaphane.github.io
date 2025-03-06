import { portfolioData, glitchFrames, defaultDarkMode } from "./config";

const loadingText = document.getElementById("loading");
const terminal = document.getElementById("terminal");
const terminalInput = document.getElementById("terminal-input");
const commandHistory = document.getElementById("command-history");
const themeToggle = document.getElementById("theme-toggle");
const moonIcon = document.querySelector(".moon")
const sunIcon = document.querySelector(".sun");
const terminalContent = document.querySelector(".terminal-content");