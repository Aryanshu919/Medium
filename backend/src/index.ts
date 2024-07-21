import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'

const app = new Hono<{
  Bindings:{
    DATABASE_URL : string,
    JWT_SECRET : string,
  },
}>()

app.post('/api/v1/signin', async (c) =>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  console.log("creating user")
  const user =  await prisma.user.create({
    data:{
      email : body.email,
      password : body.password
    }
  });

  const payload ={
    id: user.id,
    exp: Math.floor(Date.now() / 1000) + 60 * 5, 
  }

  const token = await sign(payload,c.env.JWT_SECRET)
 

  return c.json({
    jwt : token
  })
})

app.post('/api/v1/signup',async (c) =>{  
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where :{
      email : body.email,
      password: body.password
    }
  })

  if(!user){
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

})
app.post('/api/vi/blog/:id', (c) =>{
  const id = c.req.param('id');
  console.log(id);
  return c.text("get blog route")
})
app.put('/api/vi/blog', (c) =>{
  return c.text("get all blod");
})

app.post('/api/vi/blog/bulk', (c) =>{
  return c.text("get all bolck in bulk")
})

export default app
