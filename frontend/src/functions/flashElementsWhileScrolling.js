export function flashElementsWhileScrolling(elements) {  
  elements.map(el => {
    const divPosition = el?.getBoundingClientRect().top;

    if(divPosition < (window.outerHeight - 200)) {
      el.classList.add("pop-up")
      el.classList.remove("opacity-0")
    }
  })
}