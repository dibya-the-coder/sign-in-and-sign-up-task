import { NextRequest, NextResponse } from "next/server" ;
import signIn from '../../../../data/controllers/signIn'

 export const POST = async(req:NextRequest) => {
  const reqBody = await req.json()
  const bdy = {email:reqBody.email, password:reqBody.password}
  return signIn(bdy)
}