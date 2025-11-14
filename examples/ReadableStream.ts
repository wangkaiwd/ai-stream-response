let mockData = `This is a sample string that will be streamed in chunks.`

let timer: any = null
const step = 4

const stream = new ReadableStream({
  start (controller) {
    timer = setInterval(() => {
      const chunk = mockData.slice(0, step)
      // 删除已经写入的字符
      mockData = mockData.slice(step)
      if (!mockData) {
        // 字符处理完成后，停止写入
        controller.close()
      }
      // 添加字符到 stream
      controller.enqueue(chunk)
    }, 1000)
  },
  cancel () {
    clearInterval(timer)
  },
})
