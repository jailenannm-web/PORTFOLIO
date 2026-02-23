// Simple JSON-based feedback storage (client-side compatible)
// Store feedback data in a JSON file that can be written to

let feedbackDatabase = [];

// Sample feedback data
const sampleFeedbacks = [
    {
        id: '1',
        name: 'Maria Santos',
        email: 'maria@example.com',
        role: 'Client',
        rating: 5,
        message: 'Jailen delivered excellent results on our mental health awareness website. Great communication and attention to detail throughout the project.',
        timestamp: '2024-12-15T10:30:00.000Z'
    },
    {
        id: '2',
        name: 'John Reyes',
        email: 'john@example.com',
        role: 'Colleague',
        rating: 5,
        message: 'Working with Jailen on the school property management system was a pleasure. Very skilled in database design and full-stack development.',
        timestamp: '2024-12-10T14:45:00.000Z'
    },
    {
        id: '3',
        name: 'Prof. Anna Cruz',
        email: 'anna@cnsc.edu.ph',
        role: 'Mentor',
        rating: 5,
        message: 'Jailen is a brilliant student with exceptional problem-solving skills. Demonstrates strong commitment to learning new technologies.',
        timestamp: '2024-12-05T09:15:00.000Z'
    }
];

feedbackDatabase = [...sampleFeedbacks];

// Export feedback handler
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

    // GET: Fetch all feedback
    if (req.method === 'GET') {
        try {
            // Return feedback in reverse order (newest first)
            const sortedFeedback = feedbackDatabase.sort((a, b) => 
                new Date(b.timestamp) - new Date(a.timestamp)
            );
            
            res.status(200).json(sortedFeedback);
        } catch (error) {
            console.error('[v0] Error fetching feedback:', error);
            res.status(200).json(feedbackDatabase);
        }
        return;
    }

    // POST: Submit new feedback
    if (req.method === 'POST') {
        try {
            const { name, email, role, rating, message, timestamp } = req.body;

            // Validate required fields
            if (!name || !email || !message || !rating) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                res.status(400).json({ error: 'Invalid email format' });
                return;
            }

            // Create feedback object
            const newFeedback = {
                id: Date.now().toString(),
                name,
                email,
                role: role || 'User',
                rating: Math.min(Math.max(parseInt(rating), 1), 5),
                message,
                timestamp: timestamp || new Date().toISOString()
            };

            // Add to database
            feedbackDatabase.push(newFeedback);

            // Send success response
            res.status(201).json({
                success: true,
                message: 'Feedback submitted successfully',
                feedback: newFeedback
            });

        } catch (error) {
            console.error('[v0] Error submitting feedback:', error);
            res.status(500).json({ error: 'Failed to submit feedback' });
        }
        return;
    }

    // Method not allowed
    res.status(405).json({ error: 'Method not allowed' });
};
