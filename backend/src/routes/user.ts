import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import {signinInput, signupInput} from "@01xaryan/medium-common"
export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL : string,
        JWT_SECRET : string,
    }
}>();

userRouter.post('/signup', async (c) =>{
  console.log("in sigup routes")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);

    if(!success){
       c.status(411)
      return c.json({
        msg : "Invalid inputs"
      })
    }
    console.log("creating user")
    
    try {
      const user =  await prisma.user.create({
        data:{
          email : body.email,
          password : body.password
        }
      });
  
      const payload ={
        id: user.id,
      }
  
      const token = await sign(payload,c.env.JWT_SECRET)
      
      return c.json({
        jwt : token
      })
      
    } catch (error) {
      console.log(error);
      return c.json({
        msg:"not able to sign up"
      })
      
    }

})

userRouter.post('/signin',async (c) =>{  
  console.log("in signin routes")
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);

    if(!success){
      return c.json({
        msg: "invalid credentials"
      })
    }

    try {
      const user = await prisma.user.findUnique({
        where :{
          email : body.email,
          password: body.password
        }
      })
  
      if(!user){
        c.status(403); 
        return c.json({
          msg : "You don't have an account",
        })
      }
  
      const payload ={
        id: user.id, 
      }
  
      const token = await sign(payload,c.env.JWT_SECRET)
      
      
      return c.json({
        jwt: token,
        msg: "logged in successfully",
      })
  
      
    } catch (error) {
      console.log(error);
      return c.json({
        msg : 'error while signin'
      })
      
    }
   
})

