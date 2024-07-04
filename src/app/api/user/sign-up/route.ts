import { NextResponse, NextRequest } from 'next/server'
import handler from '../../../../data/controllers/signUp'

export const POST = async (req :NextRequest) => {
  const reqBody = await req.json()
  return handler(reqBody)
}