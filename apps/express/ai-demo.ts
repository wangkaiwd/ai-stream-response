import express from 'express'
import { OpenAI } from 'openai'
import 'dotenv/config'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.deepseek.com',
})

const app = express()
app.use(express.static('public'))

app.get('/chat', async function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })
  const stream = await client.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: '你是谁？' }],
    stream: true,
  })
  for await (const chunk of stream) {
    const content = chunk.choices[0].delta.content
    res.write(`data: ${JSON.stringify({ content })}\n\n`)
  }
  res.write(`data: [DONE]\n\n`)
  res.end()
})

app.listen(3000, () => console.log(`
SSE app listening on port 3000
Open http://localhost:3000/sse-ai.html in your browser to access page.
`))
