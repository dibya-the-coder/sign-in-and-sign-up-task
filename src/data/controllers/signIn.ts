import bcrypt from 'bcryptjs'
import user from '../model/userModel';
import { NextResponse } from 'next/server';
import connectDB from '../model/mongoConnect';
import jwt from 'jsonwebtoken'

export default async function handler(body:{email:String, password:String}){
    connectDB()
    let res:Object;
    
    const find = await user.findOne({email:body.email})
    if(find){
        const hashPassword =  await bcrypt.hash(body.password, 8)
        const isMatch = await bcrypt.compare(find.password, hashPassword);

        if(isMatch){
            let jwtSecretKey = process.env.JWT_SECRET;
            let data = {
                payload:find,
            }
            const token = jwt.sign(data, jwtSecretKey);
            res ={token:token}
        }else{
            res={msg:"Incorrect password"}
        }
    }else{
        res = {msg:"user not found"}
    }
    return NextResponse.json(res)
}