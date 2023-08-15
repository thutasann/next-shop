import { NextRequest, NextResponse } from 'next/server'

interface IRequest {
  amount: number
}

let likes: number = 99

export async function GET() {
  return NextResponse.json({ likes })
}

export async function POST(request: NextRequest) {
  const { amount }: IRequest = await request.json()

  if (amount) {
    likes += amount
  }

  return NextResponse.json({ likes })
}

/**
 * ***** NOTE *****
 * Testing Purpose Only
 */
