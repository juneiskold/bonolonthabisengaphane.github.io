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

    skills:function() {
        markCommandAsUsed('skills');
        let output = `<div class="skills-container">
<h2>My Skills - Rated by Oscar Awards 🏆</h2>
<div class="skills-list">`;
      
       portfolioData.skills.forEach(skill => {
           const oscars = '🏆'.repeat(skill.rating);
           output += `
<div class="skill-item">
   <div class="skill-name">${skill.name}</div>
   <div class="skill-rating">${oscars}</div>
</div>`;
       });
      
       output += `</div></div>`;
       return output;
    },


    interests: function() {
        markCommandAsUsed('interests');
        return `
 My Interests:
 ${portfolioData.interests.map(interest => `• ${interest}`).join('\n')}
 `;
    },
 

    projects: function() {
        markCommandAsUsed('projects');
        let output = `<div class="projects-container">`;
       
        portfolioData.projects.forEach((project, index) => {
            output += `
 <div class="project-card" style="animation-delay: ${index * 0.2}s">
    <div class="project-header">
        <span><a href="${project.link}" target="_blank" class="project-link">${project.name}</a></span>
        <span>1 - 0</span>
        <span>Me</span>
    </div>
    <div class="project-tech">
        <span class="font-semibold">Goal Scorers: </span>
        ${project.technologies.map(tech => `<span style="animation-delay: ${index * 0.1}s">⚽ ${tech}</span>`).join(' ')}
    </div>
 </div>
 `;
        });
       
        output += `</div>`;
        return output;
    },


    blog: function() {
        markCommandAsUsed('blog');
        let output = `<div class="blog-container">
 <h2>My Latest Blog Posts:</h2>
 <ul class="blog-list">`;
 
 
        portfolioData.blog.forEach(post => {
            output += `
 <li class="blog-item">
    <div class="blog-header">
        <a href="${post.link}" target="_blank" class="blog-link">${post.title}</a>
        <span class="blog-date">${post.date}</span>
    </div>
    <div class="blog-snippet">${post.snippet}</div>
 </li>
 `;
        });
 
 
        output += `</ul></div>`;
        return output;
    },


    contact: function() {
        markCommandAsUsed('contact');
        return `
 <div class="contact-container">
    <h2>Contact Information:</h2>
    <ul class="contact-list">
        <li><span class="contact-label">Email:</span> <a href="${portfolioData.contact.email}" class="contact-link">your.email@example.com</a></li>
        <li><span class="contact-label">GitHub:</span> <a href="${portfolioData.contact.github}" target="_blank" class="contact-link">github.com/yourusername</a></li>
        <li><span class="contact-label">LinkedIn:</span> <a href="${portfolioData.contact.linkedin}" target="_blank" class="contact-link">linkedin.com/in/yourusername</a></li>
        <li><span class="contact-label">Twitter:</span> <a href="${portfolioData.contact.twitter}" target="_blank" class="contact-link">twitter.com/yourusername</a></li>
    </ul>
 </div>
 `;
    },


    experience: function() {
        markCommandAsUsed('experience');
        let output = `<div class="experience-container">
 <h2>Education:</h2>
 <ul class="education-list">`;
 
 
        portfolioData.experience.education.forEach(edu => {
            output += `
    <li>
        <a href="${edu.link}" target="_blank" class="education-link">${edu.degree}, ${edu.institution}</a> (${edu.year})
    </li>`;
        });
 
 
        output += `
 </ul>
 
 
 <h2>Certifications:</h2>
 <ul class="certifications-list">`;
 
 
        portfolioData.experience.certifications.forEach(cert => {
            output += `
    <li>
        <a href="${cert.link}" target="_blank" class="certification-link">${cert.name}, ${cert.provider}</a> (${cert.year})
    </li>`;
        });
 
 
        output += `
 </ul>
 </div>`;
 
 
        return output;
    },


    clear: function() {
        markCommandAsUsed('clear');
        commandHistory.innerHTML = '';
        return '';
    },


    theme: function() {
        markCommandAsUsed('theme');
        toggleTheme();
        return ''; 
    }
};



function resetAllCommands() {
    usedCommands.clear();
    updateUnusedCommandsList();

    addToHistory("system", "All commands have been reset. Type 'help' to see available commands.");
}


function createUnusedCommandsElement() {

    if (!unusedCommandsElement) {
        unusedCommandsElement = document.createElement('div');
        unusedCommandsElement.className = 'unused-commands';
        document.body.appendChild(unusedCommandsElement);
    }

    updateUnusedCommandsList();
}

function updateUnusedCommandsList() {
    const commandsList = Object.keys(commands);
    const unusedCommandsList = commandsList.filter(cmd => !usedCommands.has(cmd));
   
    
    if (unusedCommandsList.length === 0) {
        
        unusedCommandsElement.innerHTML = `
            <div class="unused-commands-header">All Commands Used!</div>
            <div class="reset-commands">Reset Commands</div>
        `;
       
        
        const resetButton = document.querySelector('.reset-commands');
        if (resetButton) {
            resetButton.addEventListener('click', resetAllCommands);
        }
       
        return;
    }

    unusedCommandsElement.innerHTML = `
       <div class="unused-commands-header">Discover More:</div>
       <div class="unused-commands-list">
           ${unusedCommandsList.map(cmd => `
               <div class="unused-command-item" data-command="${cmd}">
                   ${cmd}
               </div>
           `).join('')}
       </div>
   `;


   document.querySelectorAll('.unused-command-item').forEach(item => {
    item.addEventListener('click', function() {
        const cmd = this.getAttribute('data-command');
        terminalInput.value = cmd;
        terminalInput.focus();
    });
});

}


function markCommandAsUsed(cmd) {
    usedCommands.add(cmd);
    if (unusedCommandsElement) {
        updateUnusedCommandsList();
    }
 }


 const loadingInterval = setInterval(() => {
    loadingText.textContent = glitchFrames[index];
    index = (index + 1) % glitchFrames.length;
 }, 300);
 

 setTimeout(() => {
    clearInterval(loadingInterval);
    loadingText.style.display = 'none';
    terminal.style.display = 'flex';
    terminalInput.focus();
   
    
    createUnusedCommandsElement();
   

    addToHistory("help", commands.help());
 }, 3000);
 

 function scrollToBottom() {
    if (terminalContent) {
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
 }
 
 
 function processCommand(cmd) {
    cmd = cmd.trim().toLowerCase();
   
    if (cmd === '') {
        return '';
    }
   
    if (commands[cmd]) {
        return commands[cmd]();
    } else {
        return `Command not found: ${cmd}. Type 'help' to see available commands.`;
    }
 }
 
 function addToHistory(input, output) {
    if (output === '') return; 
    
   
    const commandBlock = document.createElement('div');
    commandBlock.className = 'command-block';
   
    const commandInput = document.createElement('div');
    commandInput.className = 'command-input';
   
    
    if (input === 'system') {
        commandInput.innerHTML = `<span class="prompt">system:</span>`;
    } else {
        commandInput.innerHTML = `<span class="prompt">user@portfolio:~$</span> ${input}`;
    }
   
    const commandOutput = document.createElement('div');
    commandOutput.className = 'command-output';
    commandOutput.innerHTML = output;
   
    commandBlock.appendChild(commandInput);
    commandBlock.appendChild(commandOutput);
   
    commandHistory.appendChild(commandBlock);
   
    
    scrollToBottom();
 }
 
 terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        const output = processCommand(input);
       
        
        if (output !== '') {
            addToHistory(input, output);
        } else {
            
            setTimeout(scrollToBottom, 100);
        }
       
        terminalInput.value = '';
    }
 });
 

 function toggleTheme() {
    darkMode = !darkMode;
   
    document.body.classList.toggle('light-mode');
    terminal.classList.toggle('light-mode');
    unusedCommandsElement.classList.toggle('light-mode');
   
    if (darkMode) {
        moonIcon.classList.remove('hidden');
        sunIcon.classList.add('hidden');
    } else {
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    }
 }
 
 themeToggle.addEventListener('click', function() {
    toggleTheme();
    
    setTimeout(scrollToBottom, 100);
 });

 terminal.addEventListener('click', function() {
    terminalInput.focus();
 });
 
 const observer = new MutationObserver(function(mutations) {
    scrollToBottom();
 });
 
 if (terminalContent) {
    observer.observe(terminalContent, { childList: true, subtree: true });
 }
 

 document.querySelectorAll('.skills-container, .projects-container, .contact-container, .experience-container, .blog-container').forEach(container => {
    if (container) {
        container.addEventListener('DOMNodeInserted', scrollToBottom);
    }
 });
 
 window.addEventListener('load', function() {
    setTimeout(scrollToBottom, 3100); // Just after terminal appears
 });
 