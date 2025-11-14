import express from 'express'

const app = express()
app.use(express.static('public'))

app.get('/countdown', function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })
  let timer: NodeJS.Timeout | null = null
  let count = 10
  timer = setInterval(() => {
    if (count >= 0) {
      res.write('data: ' + count + '\n\n')
      count--
      return
    }
    // count 小于0时，停止响应
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    res.write('data: [DONE]\n\n')
    res.end()
  }, 1000)
})

app.listen(3000, () => console.log(`
SSE app listening on port 3000
Open http://localhost:3000/sse.html in your browser to access page.
`))
