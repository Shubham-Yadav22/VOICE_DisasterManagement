// This file should only be used on the server side
export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  emergencyNumber: process.env.EMERGENCY_NUMBER || '9170732347', // Default to the new emergency number
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
}

// Validate required environment variables
const requiredEnvVars = ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'TWILIO_PHONE_NUMBER'] as const

// Only validate on the server side
if (typeof window === 'undefined') {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.error(`Missing required environment variable: ${envVar}`)
      if (process.env.NODE_ENV === 'production') {
        throw new Error(`Missing required environment variable: ${envVar}`)
      }
    }
  }
}

// Validate the config object
if (!twilioConfig.accountSid || !twilioConfig.authToken || !twilioConfig.phoneNumber) {
  console.error('Twilio configuration is incomplete')
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Twilio configuration is incomplete')
  }
} 