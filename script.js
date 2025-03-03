// portfolio data
const portfolioData = {
    about: `
    Hello! I'm a creative developer focused on building engaging digital experiences.

    I believe in writing clean, efficient code and desingning intuitive user interfaces.

    My journey in tech began 5 years ago, and I've been passionate about combining
    aesthetics with functionality ever since.

    When I'm not coding, you can fine me exploring new technologies,
    or experimenting with creative coding.

    Feel free to explore my portfolio using the terminal commands!
    `,

    skills: [
        { name: "JavaScript", level:70},
        { name: "Python", level:90},
        { name: "HTML/CSS", level:90},
        { name: "Git", level:85},
        { name: "AWS", level:60}
    ],

    projects: [
        {   title: "E-commerce Platform",
            description: "A full-stack e-commerce solution with real-time inventory management, payment processing, and user authentication.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
        },

        {   title: "Social Media Dashboard",
            description: "Analytics dashboard for social media managers to track performance acroos multiple platforms",
            technologies: ["Vue.js", "Express", "D3.js", "Social Media APIs"]
        },

        {   title: "AI Content Generator",
            description: "Web application that uses machine learning to generate content ideas and outlines based on user input.",
            technologies: ["Python", "TensorFlow", "Flask", "React"]
        },

        {   title: "Terminal Portfolio",
            description: "Interactive terminal-based portfolio website (the one you're using right now!).",
            technologies: ["HTML", "CSS", "JavaScript", "Web Audio API"]
        }
    ],

    interests: [
        "Film and TV",
        "Football aka Soccer",
        "Blogging",
        "Learning New Technologies",
        "Reading & Writing",
        "Psychology(with emphasis on Criminology)"
    ],

    blogs: [
        {
            title: "The Rise of Jamstack Architecture",
            summary: "Exploring how Jamstack is changing the way we build and deliver websites.",
            date: "2025-01-15"
        },

        {
            title: "Accessibility First: Designing for Everyone",
            summary: "Why we should prioritize accessibility from the start of any web project.",
            date: "2025-01-21"
        },

        {
            title: "Embracing TypeScript in 2025",
            summary: "How TypeScript has evolved and why it's more relevant than ever.",
            date: "2025-02-15"
        }
    ],

    contact: {
        email: "bonoloapp28@gmail.com",
        github: "github.com/juneiskold",
        linkedin: "linkedin.com/in/bonoloaphane",
        x_formerly_known_as_twitter: x.com/juneiskold
    },

    help: `
    Available Commands:
        about       - Display information about me
        skills      - Show my technical skills
        projects    - View my recent projects
        interests   - See what I'm interested in
        blogs       - Read my latest blog posts
        contact     - Get my contact information
        clear       - Clear the terminal
        help        - Show this help message
        theme       - Toggle between light/dark mode
        music       - Toggle background music    

    `
};

// dom elements
const loadingScreen = document.getElementById('loading-screen');
const loadingProgress = document.getElementById('loading-progress');
const loadingStatus  = document.getElementById('loading-status')
const terminalContainer = document.getElementById('terminal-container');
const terminalBody = document.getElementById('terminal-body')
const commandInput = document.getElementById('command-input');
const themeToggle = document.getElementById('theme-toggle');
const audioControl = document.getElementById('audio-control');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = null;
let gainNode = null;

function startAmbientSound() {
    if (oscillator) return;

    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = 220; 

    gainNode.gain.value = 0.05;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();

    setInterval(() => {
        const randomDetune = Math.sin(Date.now()/ 1000) * 5;
        oscillator.detune.value = randomDetune;
    }, 100);
}