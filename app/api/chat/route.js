// Bot responses for Jailen's portfolio
const botResponses = {
    greeting: "Hi there! 👋 Thanks for visiting my website. Feel free to ask me anything about programming, web development, or my experiences in tech. Let me know how I can help!",
    
    aboutMe: "I'm Jailen, a 2nd year BSIT student at Camarines Norte State College. I'm passionate about full-stack development, database design, and UI/UX design. I love creating solutions that solve real-world problems.",
    
    skills: "My main skills include:\n• Full-Stack Web Development (HTML, CSS, JavaScript, React)\n• Database Design & Management (MySQL, PostgreSQL)\n• UI/UX Design (Figma)\n• Mobile Development\n• Video Editing & Content Creation\n\nI'm constantly learning new technologies and frameworks!",
    
    projects: "I've worked on several projects including:\n1. Sonder - Mental Health Awareness Website\n2. Sta. Cruz Elementary School Property Custodian Management System\n3. CNSC Auxiliary Local Point of Sale System\n\nEach project taught me valuable lessons in full-stack development and client communication.",
    
    experience: "I have experience building complete web applications from frontend to backend. I've worked with React, Node.js, MySQL, and various other technologies. I've also worked on desktop applications and database systems.",
    
    education: "I graduated elementary school with honors from Labo Elementary School. For high school, I attended Labo Science and Technology High School where I graduated with high honors in senior year. Currently, I'm pursuing my Bachelor of Science in Information Technology at Camarines Norte State College (2nd year).",
    
    interests: "I'm passionate about:\n• Web Development & UI/UX Design\n• Database Architecture & Optimization\n• Video Editing & Visual Content Creation\n• Learning New Technologies\n• Building Impactful Solutions",
    
    goals: "My short-term goal is to complete my BSIT degree with strong academic performance and build a robust portfolio. My long-term goal is to become a professional full-stack developer and database specialist.",
    
    contact: "You can reach out to me through my portfolio website or via email. There's a 'Get in Touch' button on the homepage and a contact section.",
    
    hiring: "Yes! I'm open to opportunities for internships, freelance projects, and full-time positions. Feel free to reach out through the contact form if you'd like to discuss a potential collaboration.",
    
    technologies: "I work with:\n• Frontend: HTML, CSS, JavaScript, React\n• Backend: Node.js, PHP, Visual Basic\n• Databases: MySQL, PostgreSQL, SQLite\n• Tools: Git, Figma, VS Code\n• And many more!"
};

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Greeting detection
    if (message.includes('hi') || message.includes('hello') || message.includes('hey') || message === 'start' || message === '') {
        return botResponses.greeting;
    }
    
    // About me
    if (message.includes('about') || message.includes('who are you')) {
        return botResponses.aboutMe;
    }
    
    // Skills
    if (message.includes('skill') || message.includes('what can you') || message.includes('expertise')) {
        return botResponses.skills;
    }
    
    // Projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
        return botResponses.projects;
    }
    
    // Experience
    if (message.includes('experience') || message.includes('background') || message.includes('worked')) {
        return botResponses.experience;
    }
    
    // Education
    if (message.includes('education') || message.includes('school') || message.includes('degree')) {
        return botResponses.education;
    }
    
    // Interests
    if (message.includes('interest') || message.includes('like') || message.includes('passion')) {
        return botResponses.interests;
    }
    
    // Goals
    if (message.includes('goal') || message.includes('future') || message.includes('aspir')) {
        return botResponses.goals;
    }
    
    // Contact
    if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
        return botResponses.contact;
    }
    
    // Hiring/Opportunities
    if (message.includes('hire') || message.includes('job') || message.includes('opportunit') || message.includes('freelance')) {
        return botResponses.hiring;
    }
    
    // Technologies
    if (message.includes('technolog') || message.includes('framework') || message.includes('language') || message.includes('tool')) {
        return botResponses.technologies;
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

export async function POST(request) {
    try {
        const body = await request.json();
        const { message } = body;

        // Validate message
        if (!message || typeof message !== 'string') {
            return Response.json({ error: 'Invalid message' }, { status: 400 });
        }

        // Generate response
        const botMessage = generateBotResponse(message);

        // Send response
        return Response.json({
            success: true,
            message: botMessage,
            timestamp: new Date().toISOString()
        }, { status: 200 });

    } catch (error) {
        console.error('[v0] Error processing chat:', error);
        return Response.json({ error: 'Failed to process message' }, { status: 500 });
    }
}
