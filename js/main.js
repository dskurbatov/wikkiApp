(function(){
  const tmpl = document.querySelector('template')
  const searchBox = document.querySelector('search-box')
  const ul = document.querySelector('ul')
  
  // searchBox.addEventListener('suggestions', (e) => {

  // }
  searchBox.addEventListener('suggestions', (e) => {
    e.stopPropagation()
    if(ul.firstChild){
      removeChildren(ul)
    }

    if(!ul.classList.contains('stretch')){
      ul.classList.add('stretch')
    }

    const list = createSuggestionList(e.detail)
    ul.appendChild(list)
  })

  searchBox.addEventListener('close', (e) => {
    e.stopPropagation()

    if(ul.classList.contains('stretch')){
      ul.classList.remove('stretch')
    }

    if(ul.firstChild){
      removeChildren(ul)
    }
  })

  function removeChildren(parent){
    while(parent.firstChild){
      parent.removeChild(parent.firstChild)
    }
  }

  function createSuggestionList(list){
    const fragment = new DocumentFragment()
    let clone;
    for(let i = 0, len = list[1].length; i < len; i++){
      clone = document.importNode(tmpl.content, true)
      clone.querySelector('a').href = list[3][i]
      clone.querySelector('h1').textContent = list[1][i]
      clone.querySelector('p').textContent = list[2][i]
      fragment.appendChild(clone)
    } 

    console.log(fragment)
    return fragment
  }

  function replaceValues(parent, list, element){
    const side = parent.querySelectorAll(element)
    for(let i = 0, len = side.length; i < len; i++){
      side[i].querySelector('a').href = list[3][i]
      side[i].querySelector('h1').textContent = list[1][i]
      side[i].querySelector('p').textContent = list[2][i]
    }
    return
  }

  function flipCard(parent, degree){
    const list = parent.querySelectorAll('.card')
    list.map(item => item.style.transform = `rotateX(-${degree}deg)`)
  }

  function suggestions(){
    let degree = 180, front = false, list;
    return function(e) {
      e.stopPropagation()

      if(!ul.classList.contains('stretch')){
        ul.classList.add('stretch')
      }

      if(!ul.firstChild){
        list = createSuggestionList(e.detail)
        ul.appendChild(list)
        front = !front
      } else if(front){
        replaceValues(ul, list, '.back')
        flipCard(ul, degree)
        degree += 180
        front = !front
      } else {
        list = createSuggestionList(e.detail, '.front')
        flipCard(ul, degree)
        degree += 180
        front = !front
      }
      return;
    }
  }
})()