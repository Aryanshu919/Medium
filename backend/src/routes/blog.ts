
import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { CreateBlog,createBlogInput,updateBlog } from "@01xaryan/medium-common";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL : string,
        JWT_SECRET : string,
    },
    Variables:{
      userId : any 
    }
}>();

//-------- MIDDLEWARES ------------

blogRouter.use("/*", async (c, next) =>{
    const header = c.req.header("Authorization") || "";
    console.log("value of header" ,header)
  
    const user = await verify(header,c.env.JWT_SECRET);

    if(user){
        c.set("userId", user.id);
        await next();
    }
    else{
      c.status(403); 
      return c.json({
          msg : "unauthorized"
      })
    }

})


// create a blog 
blogRouter.post('/', async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const body = await c.req.json();
      const { success } = createBlogInput.safeParse(body);

      if(!success){
        return c.json({
          msg : "Invalid parmater"
        })
      }
      const userId = c.get("userId");

      try {
        console.log("creating a blog");
        const blog = await prisma.post.create({
          data:{
              title: body.title,
              content: body.content,
              authorId: userId,
          }
  
        })
        
        return c.json({
          id: blog.id
        })
        
      } catch (error) {
        console.log(error);
        return c.json({
          msg : "not able to create blog"
        })
      }

})
// updat a post 
blogRouter.put('/', async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const body = await c.req.json();
      const { success } = updateBlog.safeParse(body);

     const blog = await prisma.post.update({
          where:{
            id:body.id
          },
          data:{
            title: body.title,
            content: body.title,
          },

      })
      
      return c.json({
        id: blog.id
      })
})
// get post in bulk
blogRouter.get("/bulk", async (c, next) =>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
      select:{
        title: true,
        content: true,
        published: true,
        id: true,
        author : {
          select:{
            name: true,
          }
        }
      }
  });
  
  return c.json({
     blogs
  })
})

blogRouter.get('/:id', async (c) =>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      const id = c.req.param("id");

      const blog = await prisma.post.findFirst({
        where:{
            id: id,
        },
        select:{
            id: true,
            title: true,
            content: true,
            author:{
              select:{
                name: true,
              }
            }
        }
      })

      return c.json({
        blog
       })
})
