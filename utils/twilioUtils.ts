let twilio: any;

// Dynamic import
if (typeof window === 'undefined') {  // Only import on server-side
    twilio = require('twilio');
}

import { twilioConfig } from '@/config/twilio'

// Log the configuration (without sensitive data)
console.log('Twilio Configuration:', {
  hasAccountSid: !!twilioConfig.accountSid,
  hasAuthToken: !!twilioConfig.authToken,
  phoneNumber: twilioConfig.phoneNumber,
  emergencyNumber: twilioConfig.emergencyNumber,
  appUrl: twilioConfig.appUrl
})

// Only create the client if we have valid credentials
const client = twilioConfig.accountSid && twilioConfig.authToken
  ? twilio(twilioConfig.accountSid, twilioConfig.authToken)
  : null

export async function makeEmergencyCall(to: string, emergencyType: string, location?: string) {
  if (!client) {
    console.error('Twilio client not initialized. Check your credentials.')
    return {
      success: false,
      message: 'Twilio client not initialized. Please check your configuration.',
      error: 'TWILIO_NOT_INITIALIZED'
    }
  }

  try {
    // Format the phone number to E.164 format
    let formattedNumber = to
    if (!to.startsWith('+')) {
      // If it's an emergency number, use the country code
      formattedNumber = `+91${to}`
    }

    console.log('Attempting to make call to:', formattedNumber)
    console.log('Using Twilio number:', twilioConfig.phoneNumber)

    // Generate TwiML for the call
    const twiml = await generateTwiML(emergencyType, location)

    const call = await client.calls.create({
      to: formattedNumber,
      from: twilioConfig.phoneNumber,
      twiml: twiml,
      statusCallback: `${twilioConfig.appUrl}/api/calls/status`,
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
      statusCallbackMethod: 'POST',
    })

    console.log('Call initiated successfully:', call.sid)
    return {
      success: true,
      callSid: call.sid,
      message: 'Emergency call initiated successfully'
    }
  } catch (error: any) {
    console.error('Error making emergency call:', {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
      stack: error.stack
    })
    
    return {
      success: false,
      message: `Failed to initiate emergency call: ${error.message}`,
      error: error.code || 'UNKNOWN_ERROR',
      details: error.details || error.message
    }
  }
}

export async function generateTwiML(emergencyType: string, location?: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say>This is an emergency call from V.O.I.C.E Emergency Response System.</Say>
      <Say>Emergency Type: ${emergencyType}</Say>
      ${location ? `<Say>Location: ${location}</Say>` : ''}
      <Say>Please stay on the line while we connect you to emergency services.</Say>
      <Dial>${twilioConfig.emergencyNumber}</Dial>
    </Response>`
} 