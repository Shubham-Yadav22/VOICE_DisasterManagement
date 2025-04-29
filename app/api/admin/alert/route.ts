import { NextResponse } from 'next/server'

// In a real application, you would want to store this in a database
let activeAlerts: string[] = []

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Add the alert to the active alerts array
    activeAlerts.push(message)

    // In a real application, you would:
    // 1. Store the alert in a database
    // 2. Send notifications to users
    // 3. Update real-time status

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing alert:', error)
    return NextResponse.json(
      { error: 'Failed to process alert' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ alerts: activeAlerts })
} 