import { NextResponse } from 'next/server'
import { writeDonationToFile } from '@/utils/fileUtils'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Add timestamp to the data
    const donationData = {
      ...data,
      timestamp: new Date().toISOString()
    }

    // Write to file
    const filepath = writeDonationToFile(donationData)

    return NextResponse.json({ 
      success: true, 
      message: 'Donation recorded successfully',
      filepath 
    })
  } catch (error) {
    console.error('Error processing donation:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process donation' },
      { status: 500 }
    )
  }
} 