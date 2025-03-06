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
        return ''; // Return empty string instead of a message
    }
 
};