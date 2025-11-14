const createStream = () => {
  let mockData = `This is a sample string that will be streamed in chunks.`

  let timer: any = null
  const threshold = 4

  const stream = new ReadableStream({
    start (controller) {
      timer = setInterval(() => {
        // 字符处理完成后，停止写入
        if (!mockData) {
          controller.close()
          if (timer) {
            clearInterval(timer)
            timer = null
          }
          return
        }
        const chunk = mockData.slice(0, threshold)
        // 删除已经写入的字符
        mockData = mockData.slice(threshold)
        // 一点点添加字符到 stream
        controller.enqueue(chunk)
      }, 400)
    },
    cancel () {
      clearInterval(timer)
    },
  })
  return stream
}
const demo1 = async () => {
  const stream = createStream()

  for await (const chunk of stream) {
    console.log('chunk', chunk)
  }
}

const demo2 = async () => {
  const stream = createStream()
  const reader = stream.getReader()
  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }
    console.log('value', value)
  }
}

// demo1()
demo2()
