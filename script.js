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

function stopAmbientSound() {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
        gainNode = null;
    }
}

audioControl.addEventListener('click', () => {
    if (oscillator) {
        stopAmbientSound();
        audioControl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 3a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5m0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6m7-8a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 15 3M1 5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 1 5"/>
        </svg>`;
    } else {
        startAmbientSound();
        audioControl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89l.706.706z"/>
          <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7.22 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.585-1.9a.5.5 0 0 1 .307-.05z"/>
        </svg>`;
    }
});

function simulateLoading() {
    let progress = 0;
    const loadingMessages = [
      "Loading core files...",
      "Initializing terminal...",
      "Loading portfolio data...",
      "Setting up environment...",
      "Establishing connection...",
      "Applying styles...",
      "Almost ready..."
    ];
    
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          terminalContainer.style.display = 'block';
          initTerminal();
        }, 500);
      }
      
      loadingProgress.style.width = `${progress}%`;
      
      if (progress > 20 && progress < 40) {
        loadingStatus.textContent = loadingMessages[1];
      } else if (progress > 40 && progress < 60) {
        loadingStatus.textContent = loadingMessages[2];
      } else if (progress > 60 && progress < 80) {
        loadingStatus.textContent = loadingMessages[3];
      } else if (progress > 80 && progress < 90) {
        loadingStatus.textContent = loadingMessages[4];
      } else if (progress > 90) {
        loadingStatus.textContent = loadingMessages[6];
      }
    }, 200);
  }

  // Initialize Terminal
  function initTerminal() {
    // ASCII art banner
    const banner = `
██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
                                                                      `;
    
    addLine(banner, 'success');
    addLine('Welcome to my terminal portfolio! Type "help" to see available commands.', 'success');
    addLine('');
    
    // Focus on input
    commandInput.focus();
    
    // Start ambient sound
    startAmbientSound();
  }

  // Add a line to the terminal
  function addLine(text, className = '', isCommand = false) {
    const line = document.createElement('div');
    line.className = `line ${className}`;
    
    if (isCommand) {
      line.innerHTML = `<span class="prompt">user@portfolio:~$</span> <span class="command">${text}</span>`;
    } else {
      line.textContent = text;
    }
    
    terminalBody.appendChild(line);
    
    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Process command
  function processCommand(command) {
    addLine(command, '', true);
    
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'about':
        addLine(portfolioData.about);
        break;
      
      case 'skills':
        addLine('My Skills:');
        addLine('');
        
        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'bento-grid';
        
        portfolioData.skills.forEach(skill => {
          const skillItem = document.createElement('div');
          skillItem.className = 'bento-item';
          
          const skillName = document.createElement('div');
          skillName.className = 'skill-name';
          skillName.textContent = skill.name;
          
          const skillLevel = document.createElement('div');
          skillLevel.className = 'skill-level';
          
          const skillProgress = document.createElement('div');
          skillProgress.className = 'skill-progress';
          skillProgress.style.width = `${skill.level}%`;
          
          skillLevel.appendChild(skillProgress);
          skillItem.appendChild(skillName);
          skillItem.appendChild(skillLevel);
          skillsContainer.appendChild(skillItem);
        });
            
        const lineDiv = document.createElement('div');
        lineDiv.className = 'line';
        lineDiv.appendChild(skillsContainer);
        terminalBody.appendChild(lineDiv);
        break;
      
      case 'projects':
        addLine('My Projects:');
        addLine('');
        
        portfolioData.projects.forEach(project => {
          const projectContainer = document.createElement('div');
          projectContainer.className = 'project-card';
          
          const title = document.createElement('div');
          title.className = 'project-title';
          title.textContent = project.title;
          
          const description = document.createElement('div');
          description.className = 'project-description';
          description.textContent = project.description;
          
          const techTitle = document.createElement('div');
          techTitle.textContent = 'Technologies:';
          
          const techContainer = document.createElement('div');
          techContainer.className = 'project-tech';
          
          project.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            techContainer.appendChild(techTag);
          });
          
          projectContainer.appendChild(title);
          projectContainer.appendChild(description);
          projectContainer.appendChild(techTitle);
          projectContainer.appendChild(techContainer);
          
          const lineDiv = document.createElement('div');
          lineDiv.className = 'line';
          lineDiv.appendChild(projectContainer);
          terminalBody.appendChild(lineDiv);
        });
        break;
      
      case 'interests':
        addLine('My Interests:');
        addLine('');
        addLine(portfolioData.interests.join(', '));
        break;
      
      case 'blogs':
        addLine('My Blog Posts:');
        addLine('');
        
        portfolioData.blogs.forEach(blog => {
          addLine(`${blog.title} (${blog.date})`);
          addLine(`Summary: ${blog.summary}`);
          addLine('');
        });
        break;
      
      case 'contact':
        addLine('Contact Information:');
        addLine('');
        addLine(`Email: ${portfolioData.contact.email}`);
        addLine(`GitHub: ${portfolioData.contact.github}`);
        addLine(`LinkedIn: ${portfolioData.contact.linkedin}`);
        addLine(`Twitter: ${portfolioData.contact.twitter}`);
        break;
      
      case 'clear':
        terminalBody.innerHTML = '';
        break;
      
      case 'help':
        addLine(portfolioData.help);
        break;
      
      case 'theme':
        toggleTheme();
        break;
      
      case 'music':
        if (oscillator) {
          stopAmbientSound();
          addLine('Music stopped.', 'success');
        } else {
          startAmbientSound();
          addLine('Music started.', 'success');
        }
        break;
        
      case 'exit':
      case 'quit':
        addLine('Thank you for visiting my portfolio!', 'success');
        addLine('Process terminated. (Just kidding, this is a website!)');
        break;
      
      case '':
        // Do nothing for empty command
        break;
        
      default:
        if (cmd.startsWith('cd ')) {
          addLine('Navigating to directories is not supported. Use specific commands like "about", "projects", etc.');
        } else if (cmd.startsWith('ls')) {
          addLine('Available sections:');
          addLine('');
          addLine('about/     projects/     skills/');
          addLine('blogs/     interests/    contact/');
        } else {
          addLine(`Command not found: ${command}`, 'error');
          addLine('Type "help" to see available commands.');
        }
    }
    
    addLine('');
  }

  // Handle command input
  commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const command = commandInput.value;
      processCommand(command);
      commandInput.value = '';
    }
  });

  // Command history functionality
  let commandHistory = [];
  let historyIndex = -1;

  commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        commandInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
      }
      // Move cursor to end of input
      setTimeout(() => {
        commandInput.selectionStart = commandInput.selectionEnd = commandInput.value.length;
      }, 0);
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        historyIndex--;
        commandInput.value = commandHistory[commandHistory.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        commandInput.value = '';
      }
      e.preventDefault();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple command completion
      const partialCmd = commandInput.value.toLowerCase();
      const cmds = ['about', 'skills', 'projects', 'interests', 'blogs', 'contact', 'clear', 'help', 'theme', 'music'];
      
      const matches = cmds.filter(cmd => cmd.startsWith(partialCmd));
      if (matches.length === 1) {
        commandInput.value = matches[0];
      } else if (matches.length > 1) {
        addLine('Possible commands:');
        addLine(matches.join('  '));
        addLine('');
        // Restore prompt
        addLine('', '', true);
      }
    }
  });

  // Toggle theme
  function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const themeMessage = document.body.classList.contains('light-mode') 
      ? 'Theme switched to light mode.'
      : 'Theme switched to dark mode.';
    addLine(themeMessage, 'success');
  }

  // Theme toggle button
  themeToggle.addEventListener('click', toggleTheme);

  // Make sure terminal input is always focused
  document.getElementById('terminal').addEventListener('click', () => {
    commandInput.focus();
  });

  // Auto-focus input when the page loads
  window.addEventListener('load', () => {
    commandInput.focus();
  });

  // Handle loss of focus
  document.addEventListener('click', () => {
    commandInput.focus();
  });

  // Start loading animation
  window.addEventListener('load', simulateLoading);
