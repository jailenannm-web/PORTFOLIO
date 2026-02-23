import { NextResponse } from 'next/server'

// In-memory feedback storage
const defaultFeedbacks = [
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
]

function getStorage() {
  if (!globalThis.__feedbackStorage) {
    globalThis.__feedbackStorage = [...defaultFeedbacks]
  }
  return globalThis.__feedbackStorage
}

export async function GET() {
  try {
    const storage = getStorage()
    const sorted = [...storage].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    return NextResponse.json(sorted, { status: 200 })
  } catch (error) {
    console.error('GET /api/feedback error:', error)
    return NextResponse.json(defaultFeedbacks, { status: 200 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, role, rating, message, timestamp } = body

    if (!name || !email || !message || !rating) {
      return NextResponse.json(
        { success: false, error: 'Name, email, message, and rating are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format.' },
        { status: 400 }
      )
    }

    const ratingNum = parseInt(rating, 10)
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5.' },
        { status: 400 }
      )
    }

    const newFeedback = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      role: role || 'User',
      rating: ratingNum,
      message: message.trim(),
      timestamp: timestamp || new Date().toISOString()
    }

    const storage = getStorage()
    storage.push(newFeedback)

    return NextResponse.json(
      { success: true, message: 'Feedback submitted successfully!', feedback: newFeedback },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/feedback error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}
