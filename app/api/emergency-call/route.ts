import { NextResponse } from 'next/server'
import { makeEmergencyCall } from '@/utils/twilioUtils'

// Emergency number mapping
const EMERGENCY_NUMBER_MAPPING: Record<string, string> = {
  '112': '+919170732347',
  '100': '+919170732347',
  '101': '+919170732347',
  '102': '+919170732347',
  '108': '+919170732347',
  '1091': '+919170732347',
  '1098': '+919170732347',
  '1070': '+919170732347',
  '14567': '+919170732347'
}

// List of valid Indian emergency numbers (display numbers)
const validEmergencyNumbers = Object.keys(EMERGENCY_NUMBER_MAPPING)

export async function POST(request: Request) {
  try {
    // Check if the request has a body
    if (!request.body) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Request body is required',
          error: 'MISSING_BODY'
        },
        { status: 400 }
      )
    }

    // Parse the request body
    let body
    try {
      body = await request.json()
    } catch (error) {
      console.error('Error parsing request body:', error)
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid JSON in request body',
          error: 'INVALID_JSON'
        },
        { status: 400 }
      )
    }

    const { phoneNumber, emergencyType, location } = body

    // Validate required fields
    if (!phoneNumber) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Phone number is required',
          error: 'MISSING_PHONE'
        },
        { status: 400 }
      )
    }

    // Remove any formatting from the phone number
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '')

    // Get the actual emergency number to call
    let numberToCall = cleanNumber
    if (validEmergencyNumbers.includes(cleanNumber.replace(/^\+91/, ''))) {
      numberToCall = EMERGENCY_NUMBER_MAPPING[cleanNumber.replace(/^\+91/, '')]
    }

    // Validate phone number format for Indian numbers and emergency numbers
    if (!/^\+91\d{10}$/.test(numberToCall) && !validEmergencyNumbers.includes(numberToCall.replace(/^\+91/, ''))) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid phone number format. Please use Indian format (+91XXXXXXXXXX) or a valid emergency number.',
          error: 'INVALID_PHONE'
        },
        { status: 400 }
      )
    }

    // Validate emergency type
    if (!emergencyType) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Emergency type is required',
          error: 'MISSING_EMERGENCY_TYPE'
        },
        { status: 400 }
      )
    }

    console.log('Making emergency call to:', numberToCall)
    const result = await makeEmergencyCall(numberToCall, emergencyType, location)

    if (!result.success) {
      console.error('Failed to make call:', result)
      return NextResponse.json(
        { 
          success: false, 
          message: result.message,
          error: result.error,
          details: result.details
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      callSid: result.callSid
    })
  } catch (error: any) {
    console.error('Error in emergency call API:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    })
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process emergency call',
        error: error.code || 'UNKNOWN_ERROR',
        details: error.message
      },
      { status: 500 }
    )
  }
}  
