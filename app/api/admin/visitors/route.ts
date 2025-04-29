import { NextResponse } from 'next/server'

// In a real application, you would want to store this in a database
let visitorCount = 0

export async function GET() {
  return NextResponse.json({ count: visitorCount })
}

export async function POST() {
  visitorCount++
  return NextResponse.json({ count: visitorCount })
} 