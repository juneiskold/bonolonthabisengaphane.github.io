document.addEventListener('DOMContentLoaded', () => {
  // Loading screen simulation
  simulateLoading();
  
  // Initialize terminal
  initTerminal();
  
  // Theme toggle
  initThemeToggle();
  
  // Audio control
  initAudioControl();
});

// Simulate loading screen
function simulateLoading() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingProgress = document.getElementById('loading-progress');
  const loadingStatus = document.getElementById('loading-status');
  
  const loadingSteps = [
      'Loading core files...',
      'Initializing terminal interface...',
      'Loading portfolio data...',
      'Setting up command processor...',
      'Establishing connection...',
      'Ready to launch!'
  ];
  
  let progress = 0;
  const interval = setInterval(() => {
      if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
              loadingScreen.style.opacity = '0';
              setTimeout(() => {
                  loadingScreen.style.display = 'none';
              }, 500);
          }, 500);
          return;
      }
      
      progress += 5;
      loadingProgress.style.width = `${progress}%`;
      
      const stepIndex = Math.floor((progress / 100) * loadingSteps.length);
      if (stepIndex < loadingSteps.length) {
          loadingStatus.textContent = loadingSteps[stepIndex];
      }
  }, 150);
}

// Initialize terminal
function initTerminal() {
  const commandInput = document.getElementById('command-input');
  const terminalBody = document.getElementById('terminal-body');
  
  // Focus input when clicking anywhere in the terminal
  document.getElementById('terminal').addEventListener('click', () => {
      commandInput.focus();
  });
  
  // Handle command input
  commandInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
          const command = commandInput.value.trim().toLowerCase();
          
          // Add command to terminal history
          const commandLine = document.createElement('div');
          commandLine.className = 'command-history';
          commandLine.innerHTML = `<span style="color: var(--prompt-color)">user@portfolio:~$</span> ${command}`;
          terminalBody.appendChild(commandLine);
          
          // Process command
          processCommand(command, terminalBody);
          
          // Clear input and scroll to bottom
          commandInput.value = '';
          terminalBody.scrollTop = terminalBody.scrollHeight;
      }
  });
  
  // Initial welcome message
  setTimeout(() => {
      const welcomeOutput = document.createElement('div');
      welcomeOutput.className = 'command-output';
      welcomeOutput.innerHTML = `
          <p class="info">Welcome to my interactive terminal portfolio!</p>
          <p>Type <span class="success">'help'</span> to see available commands.</p>
      `;
      terminalBody.appendChild(welcomeOutput);
  }, 1000);
}

// Process terminal commands
function processCommand(command, terminalBody) {
  const output = document.createElement('div');
  output.className = 'command-output';
  
  switch(command) {
      case 'help':
          output.innerHTML = `
              <p class="section-title">Available Commands:</p>
              <div class="section-content">
                  <p><span class="success">about</span> - Learn about me</p>
                  <p><span class="success">skills</span> - View my technical skills</p>
                  <p><span class="success">projects</span> - Browse my projects</p>
                  <p><span class="success">contact</span> - Get my contact information</p>
                  <p><span class="success">blog</span> - Read my latest blog posts</p>
                  <p><span class="success">interests</span> - See my personal interests</p>
                  <p><span class="success">clear</span> - Clear the terminal</p>
                  <p><span class="success">theme</span> - Toggle light/dark theme</p>
              </div>
          `;
          break;
          
      case 'about':
          output.innerHTML = `
              <p class="section-title">About Me</p>
              <div class="section-content">
                  <p>Hello! I'm [Your Name], a [Your Profession] with a passion for [Your Interests].</p>
                  <p>I specialize in [Your Specialties] and have [X] years of experience in the field.</p>
                  <p>My journey began with [Your Background] and I've been continuously learning and growing since then.</p>
                  <p>I believe in [Your Philosophy/Approach] and strive to [Your Goals].</p>
              </div>
          `;
          break;
          
      case 'skills':
          output.innerHTML = `
              <p class="section-title">Technical Skills</p>
              <div class="section-content">
                  <p class="info">Programming Languages:</p>
                  <p>JavaScript, TypeScript, Python, HTML/CSS, SQL, etc.</p>
                  
                  <p class="info">Frameworks & Libraries:</p>
                  <p>React, Node.js, Express, Django, etc.</p>
                  
                  <p class="info">Tools & Technologies:</p>
                  <p>Git, Docker, AWS, CI/CD, etc.</p>
                  
                  <p class="info">Soft Skills:</p>
                  <p>Problem-solving, Team collaboration, Communication, etc.</p>
              </div>
          `;
          break;
          
      case 'projects':
          output.innerHTML = `
              <p class="section-title">Projects</p>
              <div class="section-content">
                  <p class="info">Project 1: [Project Name]</p>
                  <p>Description: [Brief description of the project]</p>
                  <p>Technologies: [Tech stack used]</p>
                  <p>Link: <a href="#" class="link">[Project URL]</a></p>
                  
                  <p class="info">Project 2: [Project Name]</p>
                  <p>Description: [Brief description of the project]</p>
                  <p>Technologies: [Tech stack used]</p>
                  <p>Link: <a href="#" class="link">[Project URL]</a></p>
                  
                  <p class="info">Project 3: [Project Name]</p>
                  <p>Description: [Brief description of the project]</p>
                  <p>Technologies: [Tech stack used]</p>
                  <p>Link: <a href="#" class="link">[Project URL]</a></p>
                  
                  <p>Type <span class="success">'project [number]'</span> for more details about a specific project.</p>
              </div>
          `;
          break;
          
      case 'contact':
          output.innerHTML = `
              <p class="section-title">Contact Information</p>
              <div class="section-content">
                  <p>Email: <a href="mailto:your.email@example.com" class="link">your.email@example.com</a></p>
                  <p>LinkedIn: <a href="https://linkedin.com/in/yourprofile" target="_blank" class="link">linkedin.com/in/yourprofile</a></p>
                  <p>GitHub: <a href="https://github.com/yourusername" target="_blank" class="link">github.com/yourusername</a></p>
                  <p>Twitter: <a href="https://twitter.com/yourhandle" target="_blank" class="link">@yourhandle</a></p>
                  
                  <p>Feel free to reach out for collaborations, opportunities, or just to say hello!</p>
              </div>
          `;
          break;
          
      case 'blog':
          output.innerHTML = `
              <p class="section-title">Blog Posts</p>
              <div class="section-content">
                  <p class="info">Latest Post: [Post Title]</p>
                  <p>Date: [Publication Date]</p>
                  <p>Summary: [Brief summary of the post]</p>
                  <p>Read: <a href="#" class="link">[Blog URL]</a></p>
                  
                  <p class="info">Previous Post: [Post Title]</p>
                  <p>Date: [Publication Date]</p>
                  <p>Summary: [Brief summary of the post]</p>
                  <p>Read: <a href="#" class="link">[Blog URL]</a></p>
                  
                  <p>Visit my blog for more articles: <a href="#" class="link">[Blog Homepage URL]</a></p>
              </div>
          `;
          break;
          
      case 'interests':
          output.innerHTML = `
              <p class="section-title">Personal Interests</p>
              <div class="section-content">
                  <p>When I'm not coding, I enjoy:</p>
                  <ul>
                      <li>[Interest 1]</li>
                      <li>[Interest 2]</li>
                      <li>[Interest 3]</li>
                      <li>[Interest 4]</li>
                  </ul>
                  <p>I'm also passionate about [Other Passions] and always looking to learn more about [Learning Interests].</p>
              </div>
          `;
          break;
          
      case 'clear':
          terminalBody.innerHTML = '';
          return;
          
      case 'theme':
          toggleTheme();
          output.innerHTML = `<p class="success">Theme toggled!</p>`;
          break;
          
      default:
          if (command.startsWith('project ')) {
              const projectNum = command.split(' ')[1];
              if (projectNum && !isNaN(projectNum)) {
                  output.innerHTML = `
                      <p class="section-title">Project ${projectNum} Details</p>
                      <div class="section-content">
                          <p class="info">Name: [Project ${projectNum} Name]</p>
                          <p>Description: [Detailed description of the project]</p>
                          <p>Problem Solved: [What problem this project addresses]</p>
                          <p>Technologies: [Detailed tech stack]</p>
                          <p>Challenges: [Challenges faced during development]</p>
                          <p>Solutions: [How challenges were overcome]</p>
                          <p>Link: <a href="#" class="link">[Project URL]</a></p>
                          <p>Repository: <a href="#" class="link">[GitHub Repository]</a></p>
                      </div>
                  `;
              } else {
                  output.innerHTML = `<p class="error">Invalid project number. Try 'projects' to see available projects.</p>`;
              }
          } else if (command === '') {
              return;
          } else {
              output.innerHTML = `<p class="error">Command not found: ${command}. Type 'help' to see available commands.</p>`;
          }
  }
  
  terminalBody.appendChild(output);
}

// Initialize theme toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', toggleTheme);
}

// Toggle between light and dark themes
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('#theme-toggle i');
  
  body.classList.toggle('light-theme');
  
  if (body.classList.contains('light-theme')) {
      themeIcon.className = 'fas fa-sun';
  } else {
      themeIcon.className = 'fas fa-moon';
  }
}

// Initialize audio control
function initAudioControl() {
  const audioControl = document.getElementById('audio-control');
  let audioPlaying = false;
  let audio = new Audio('https://assets.codepen.io/1462889/ambient-music.mp3'); // Replace with your audio file
  audio.loop = true;
  
  audioControl.addEventListener('click', () => {
      const audioIcon = document.querySelector('#audio-control i');
      
      if (audioPlaying) {
          audio.pause();
          audioIcon.className = 'fas fa-volume-mute';
      } else {
          audio.play().catch(e => console.log('Audio playback failed:', e));
          audioIcon.className = 'fas fa-volume-up';
      }
      
      audioPlaying = !audioPlaying;
  });
}