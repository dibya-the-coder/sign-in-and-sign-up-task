import user from "../model/userModel.js";
import connectDB from "../model/mongoConnect.js"
import bcrypt from 'bcryptjs'
import {NextResponse } from "next/server.js";

export default async function handler(body: { name: String; email: String; password: String }) {
    let val: any;
    await connectDB()

    const find = await user.findOne({email:body.email})
    if(find){
        console.log(find)
        return NextResponse.json("Duplicate Key")
    }
    else if(!(body.email.includes('@')||body.email.includes('.'))){
        return NextResponse.json("Invalid mail")
    }
    else if(!(/^[A-z ]+$/.test(body.name))){
        return NextResponse.json("Name can only contain Alphabate")
    }
    else{
        const hashedPassword = await bcrypt.hash(body.password, 8)
        console.log(hashedPassword)
        let usr = new user({name:body.name,email:body.email, password:hashedPassword})
        await usr.save().then((a: any)=>val = a).catch((e: any)=>val = e)
        return NextResponse.json(val) 
    } 
}
