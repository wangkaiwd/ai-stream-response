// iteration protocols
// 1. iterable protocol
// 2. iterator protocol

function makeIterableObj (array: any[]) {
  return {
    [Symbol.iterator] () {
      let nextIndex = 0
      return {
        next () {
          if (nextIndex <= array.length) {
            return { value: array[nextIndex++], done: false }
          }
          return { done: true }
        },
      }
    },
  }
}

const iterableObj = makeIterableObj(['one', 'two'])

const iterator = iterableObj[Symbol.iterator]()
while (true) {
  const { value, done } = iterator.next()
  if (done) {
    break
  }
  console.log('value', value)
}

for (const item of iterableObj) {
  console.log('item', item)
}
