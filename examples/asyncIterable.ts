interface IResult {
  done: boolean
  value?: any
}

const sleep = (result: IResult) => {
  return new Promise<IResult>((resolve) => {
    setTimeout(() => {
      resolve(result)
    }, 1000)
  })
}

function makeIterableObj (array: any[]) {
  return {
    [Symbol.asyncIterator] () {
      let nextIndex = 0
      return {
        next () {
          if (nextIndex <= array.length) {
            return sleep({ value: array[nextIndex++], done: false })
          }
          return sleep({ done: true, value: undefined })
        },
      }
    },
  }
}

// 手动迭代
const iterateManually = async () => {
  const asyncIterableObj = makeIterableObj(['one', 'two'])
  const iterator = asyncIterableObj[Symbol.asyncIterator]()
  while (true) {
    const { value, done } = await iterator.next()
    if (done) {
      break
    }
    console.log('value', value)
  }
}

// iterateManually()

const iterateAutomatically = async () => {
  for await (const item of makeIterableObj(['one', 'two'])) {
    console.log('item', item)
  }
}

iterateAutomatically()
