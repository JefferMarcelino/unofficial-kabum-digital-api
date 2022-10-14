import express from 'express'
import bodyParser from "body-parser"
import getPostsLinks from './lib/getPostsLinks'
import getPostByLink from './lib/getPostByLink'

const PORT = process.env.PORT || 3000 

const app = express()
app.use(bodyParser.json())


app.get("/latest-news", async (req:any, res:any) => {
    const postsLinks = await getPostsLinks()
    console.log("Posts Links already got.")
    const posts = []
    
    for(let index = 0; index < 4; index++) {
        console.log(`Getting post ${index} by link`)
        const post = await getPostByLink(postsLinks[index])
        posts.push(post)
    }

    res.status(200).send({"posts": posts}).end()
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
