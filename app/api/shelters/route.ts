import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Shelter from '@/models/Shelter';

export async function GET() {
  try {
    await connectDB();
    const shelters = await Shelter.find({});
    return NextResponse.json(shelters);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch shelters' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const shelter = await Shelter.create(data);
    return NextResponse.json(shelter, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create shelter' },
      { status: 500 }
    );
  }
} 