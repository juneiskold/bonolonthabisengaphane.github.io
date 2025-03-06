import { portfolioData, glitchFrames, defaultDarkMode } from "./config";

const loadingText = document.getElementById("loading");
const terminal = document.getElementById("terminal");
const terminalInput = document.getElementById("terminal-input");
const commandHistory = document.getElementById("command-history");
const themeToggle = document.getElementById("theme-toggle");
const moonIcon = document.querySelector(".moon")
const sunIcon = document.querySelector(".sun");
const terminalContent = document.querySelector(".terminal-content");


let index = 0;
let darkMode = defaultDarkMode;

const usedCommands = new Set();
let unusedCommandsElement;

const commands = {
    help:function() {
        markCommandAsUsed('help');
        return `

    Available Commands:
        -about:         Display information about me
        -skills:        List my technical skills
        -interests:     Show my interests
        -projects:      View my projects
        -blog:          Read my latest blog posts
        -contact:       Get my contact information
        -experience:    View my education and certifications
        -clear:         Clear the terminal
        -theme:         Toggle light/dark mode
        -help:          Show this help message
        `;
    },

    about: function() {
        markCommandAsUsed('about');
        return portfolioData.about;
    },

    
}