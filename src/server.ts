import express from 'express'
import bodyParser from "body-parser"
import getPostsLinks from './lib/getPostsLinks'
import getPostByLink from './lib/getPostByLink'

const PORT = process.env.PORT || 3000 

const app = express()
app.use(bodyParser.json())

function generateRandomInteger(max:number) {
    return Math.floor(Math.random() * max) + 1;
}

app.get("/random", async (req, res) => {
    const postsLinks = await getPostsLinks("all")
    const alreadyFetched: number[] = []
    const posts = []

    if (postsLinks?.length) {
        while (alreadyFetched.length < 4) {
            const index = generateRandomInteger(postsLinks.length)
            try {
                if (!alreadyFetched.includes(index)) {
                    const post = await getPostByLink(postsLinks[index])
                    posts.push(post)
                    alreadyFetched.push(index)
                }
            }
            catch (err) {
                console.log("Nada")
            }
        }
    }

    res.status(200).send({"posts": posts}).end()
})

app.get("/all", async (req, res) => {
    const postsLinks = await getPostsLinks("all")

    res.status(200).send({"postsLinks": postsLinks}).end()
})

app.get("/mostread", async (req, res) => {
    const postsLinks = await getPostsLinks("mostread")

    res.status(200).send({"posts": postsLinks}).end()
})

app.get("/post/:id", async (req, res) => {
    const postLink = req.params.id
    try {
        const post = await getPostByLink("https://kabum.digital/" + postLink)
        res.status(200).send({"post": post}).end()
    } catch (err) {
        res.status(404).send({"error": "Not found"})
    }
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
