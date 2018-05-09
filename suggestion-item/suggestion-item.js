(function(){
  const thisDoc = document.currentScript.ownerDocument
  const tmpl = thisDoc.querySelector('template')

  class SuggestionItem extends HTMLElement {
    constructor(){
      super()

      this.front = true
      this.shadow = this.attachShadow({mode: 'open'})
      this.shadow.appendChild(document.importNode(tmpl.content, true))
    }

    connectedCallback(){
      console.log('connected')
    }


  }

  customElements.define('suggestion-item', SuggestionItem)
})()