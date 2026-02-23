// Chatbot API - Responses for Jailen's portfolio
// Simple rule-based responses with some dynamic logic

const botResponses = {
    greeting: [
        "Hi there! 👋 Thanks for visiting my website. Feel free to ask me anything about programming, web development, or my experiences in tech. Let me know how I can help!",
        "Hello! Welcome to my portfolio. What would you like to know about my work or skills?"
    ],
    
    aboutMe: [
        "I'm Jailen, a 2nd year BSIT student at Camarines Norte State College. I'm passionate about full-stack development, database design, and UI/UX design. I love creating solutions that solve real-world problems.",
        "I'm a dedicated developer from Labo, Camarines Norte. Currently studying BSIT and working on various web and database projects."
    ],
    
    skills: [
        "My main skills include:\n• Full-Stack Web Development (HTML, CSS, JavaScript, React)\n• Database Design & Management (MySQL, PostgreSQL)\n• UI/UX Design (Figma)\n• Mobile Development\n• Video Editing & Content Creation\n\nI'm constantly learning new technologies and frameworks!",
        "I specialize in web development, database management, and UI design. I'm proficient in multiple programming languages and frameworks."
    ],
    
    projects: [
        "I've worked on several projects including:\n1. Sonder - Mental Health Awareness Website\n2. Sta. Cruz Elementary School Property Custodian Management System\n3. CNSC Auxiliary Local Point of Sale System\n\nEach project taught me valuable lessons in full-stack development and client communication.",
        "My projects span across different technologies - from web development with JavaScript to desktop applications with Visual Basic and .NET."
    ],
    
    experience: [
        "I have experience building complete web applications from frontend to backend. I've worked with React, Node.js, MySQL, and various other technologies. I've also worked on desktop applications and database systems.",
        "My experience includes full-stack development, database management, UI design, and working with clients on various technical projects."
    ],
    
    education: [
        "I graduated elementary school with honors from Labo Elementary School. For high school, I attended Labo Science and Technology High School where I graduated with high honors in senior year. Currently, I'm pursuing my Bachelor of Science in Information Technology at Camarines Norte State College (2nd year).",
        "I've consistently maintained academic excellence throughout my education, with a focus on STEM and technology."
    ],
    
    interests: [
        "I'm passionate about:\n• Web Development & UI/UX Design\n• Database Architecture & Optimization\n• Video Editing & Visual Content Creation\n• Learning New Technologies\n• Building Impactful Solutions\n\nI enjoy combining technical skills with creative design to create amazing user experiences.",
        "I love exploring new technologies, working on challenging projects, and creating beautiful, functional interfaces."
    ],
    
    goals: [
        "My short-term goal is to complete my BSIT degree with strong academic performance and build a robust portfolio. My long-term goal is to become a professional full-stack developer and database specialist, eventually leading teams and creating innovative solutions.",
        "I aim to master modern web technologies, become an expert in database design, and help others through technology."
    ],
    
    contact: [
        "You can reach out to me through my portfolio website or via email. There's a 'Get in Touch' button on the homepage and a contact section. You can also submit feedback directly on this site!",
        "Feel free to reach out through the contact form on my website. I'd love to hear from you!"
    ],
    
    hiring: [
        "Yes! I'm open to opportunities for internships, freelance projects, and full-time positions. Feel free to reach out through the contact form if you'd like to discuss a potential collaboration.",
        "I'm definitely interested in professional opportunities. Please use the contact section to get in touch!"
    ],
    
    technologies: [
        "I work with:\n• Frontend: HTML, CSS, JavaScript, React\n• Backend: Node.js, PHP, Visual Basic\n• Databases: MySQL, PostgreSQL, SQLite\n• Tools: Git, Figma, VS Code\n• And many more!",
        "I'm proficient in JavaScript, React, Node.js, MySQL, and various other web and database technologies."
    ]
};

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Greeting detection
    if (message.includes('hi') || message.includes('hello') || message.includes('hey') || message === 'start' || message === '') {
        return botResponses.greeting[0];
    }
    
    // About me
    if (message.includes('about') || message.includes('who are you')) {
        return botResponses.aboutMe[0];
    }
    
    // Skills
    if (message.includes('skill') || message.includes('what can you') || message.includes('expertise')) {
        return botResponses.skills[0];
    }
    
    // Projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
        return botResponses.projects[0];
    }
    
    // Experience
    if (message.includes('experience') || message.includes('background') || message.includes('worked')) {
        return botResponses.experience[0];
    }
    
    // Education
    if (message.includes('education') || message.includes('school') || message.includes('degree')) {
        return botResponses.education[0];
    }
    
    // Interests
    if (message.includes('interest') || message.includes('like') || message.includes('passion')) {
        return botResponses.interests[0];
    }
    
    // Goals
    if (message.includes('goal') || message.includes('future') || message.includes('aspir')) {
        return botResponses.goals[0];
    }
    
    // Contact
    if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
        return botResponses.contact[0];
    }
    
    // Hiring/Opportunities
    if (message.includes('hire') || message.includes('job') || message.includes('opportunit') || message.includes('freelance')) {
        return botResponses.hiring[0];
    }
    
    // Technologies
    if (message.includes('technolog') || message.includes('framework') || message.includes('language') || message.includes('tool')) {
        return botResponses.technologies[0];
    }
    
    // React to gratitude
    if (message.includes('thank') || message.includes('appreciate')) {
        return "You're welcome! 😊 Feel free to ask any other questions. I'm here to help!";
    }
    
    // React to compliments
    if (message.includes('cool') || message.includes('amazing') || message.includes('great') || message.includes('awesome')) {
        return "Thank you! 🙌 That means a lot. Feel free to ask me anything else!";
    }
    
    // Default response
    return "That's a great question! To give you a better answer, could you clarify what you'd like to know? You can ask me about my projects, skills, experience, education, or goals. I'm also happy to discuss web development, databases, or technology in general!";
}

// API Handler
module.exports = (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // POST: Get bot response
    if (req.method === 'POST') {
        try {
            const { message } = req.body;

            // Validate message
            if (!message || typeof message !== 'string') {
                res.status(400).json({ error: 'Invalid message' });
                return;
            }

            // Generate response
            const botMessage = generateBotResponse(message);

            // Send response
            res.status(200).json({
                success: true,
                message: botMessage,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('[v0] Error processing chat:', error);
            res.status(500).json({ error: 'Failed to process message' });
        }
        return;
    }

    // Method not allowed
    res.status(405).json({ error: 'Method not allowed' });
};
