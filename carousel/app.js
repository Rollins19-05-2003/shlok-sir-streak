const prev = document.getElementById('prev-btn')
const next = document.getElementById('next-btn')
const list = document.getElementById('item-list')

const itemWidth = 150

prev.addEventListener('click',()=>{
  list.scrollLeft -= itemWidth
})

next.addEventListener('click',()=>{
  list.scrollLeft += itemWidth
})
