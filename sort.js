// 冒泡排序
const bubbleSort = arr => {
  for (let i = 1; i < arr.length; i++){
    for(let j = 1; j < arr.length - i; j++){
      if(arr[j] > arr[j + 1]){
        arr[j] = [arr[j + 1], arr[j + 1] = arr[j]][0]
      }
    }
  }
}
// 快速排序
const quickSort = arr => {
  if (arr.length < 2) { return arr }
  let left = []
  let right = []
  let privot = arr.splice(Math.floor(arr.length / 2), 1)[0]
  arr.forEach( element => {
    element < privot ? left.push(element) : right.push(element)
  })
  return [...quickSort(left), privot, ...quickSort(right)]
}
// 插入排序
const insertSort = arr => {
  arr.forEach( (element, index) => {
    let preIndex = index - 1
    let current = element
    while(preIndex >= 0 && current < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = current
  })
}