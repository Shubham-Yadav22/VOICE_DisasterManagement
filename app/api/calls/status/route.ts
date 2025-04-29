import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const callSid = formData.get('CallSid')
    const callStatus = formData.get('CallStatus')
    const duration = formData.get('CallDuration')
    const timestamp = new Date().toISOString()

    // Log the call status
    console.log(`Call ${callSid} status: ${callStatus} at ${timestamp}`)
    if (duration) {
      console.log(`Call duration: ${duration} seconds`)
    }

    // Here you could store the call status in your database
    // or perform any other necessary actions

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing call status:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process call status' },
      { status: 500 }
    )
  }
} 