import express from 'express'
import bodyParser from "body-parser"
import getPostsLinks from './lib/getPostsLinks'
import getPostByLink from './lib/getPostByLink'

const PORT = process.env.PORT || 3000 

const app = express()
app.use(bodyParser.json())

app.get("/all", async (req:any, res:any) => {
    const postsLinks = await getPostsLinks(".cnvs-block-section")
    const posts = []
    
    for(let index = 0; index < 4; index++) {
        try {
            const post = await getPostByLink(postsLinks[index])
            posts.push(post)
        }
        catch (err) {
            console.log("Nada")
        }
    }

    res.status(200).send({"posts": posts}).end()
})


app.get("/mostread", async (req:any, res:any) => {
    const postsLinks = await getPostsLinks(".cnvs-block-section-1587397232048")
    const posts = []
    
    for(let index = 0; index < 4; index++) {
        try {
            const post = await getPostByLink(postsLinks[index])
            posts.push(post)
        }
        catch (err) {
            console.log("Nada")
        }
    }

    res.status(200).send({"posts": posts}).end()
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
