window.addEventListener("DOMContentLoaded", () => {
    const savollar_javob = savollar
    const start = getElement(".start")
    let start_btn = getElement(".start_btn")
    let start_text = getElement(".start_text")
    let start_index = 5


    let game = getElement(".game")
    game.classList.add("none")
    let game_text_start = getElement(".game_text_start")
    let template = getElement("template").content
    let result = getElement(".result")
    let idx = 0
    let tugri = 0
    let notugri = 0
    const handleRenderSavol = arr => {
        result.innerHTML = null
        for(let i = 0; i<arr.length; i++){
            let clone = template.cloneNode(true)
            let savol = clone.querySelector(".savol_text")
            let savollar_ul = clone.querySelector(".savollar_ul")
            savol.textContent = arr[i].savol
            let variantlar = arr[i].variantlar
            for(let si = 0; si<variantlar.length; si++){
                let li = createTag("li")
                li.className = "variant_li"
                li.textContent = variantlar[si].variant
                savollar_ul.appendChild(li)
            }
            result.appendChild(clone)
        }
    }
    const handleClearStart = () => {
        start.classList.add("none")
        start.classList.remove("d-flex")
        game.classList.add("d-flex")
        setTimeout(() => {
            game_text_start.classList.add("none")
            handleRenderSavol([savollar_javob[idx]])
        }, 3000)
    }
    const handleStart = event => {
        event.target.disabled = true
        let start_timer = setInterval(() => {
            if(start_index >= 1){
                start_index --
                start_text.textContent = start_index
            }else{
                clearInterval(start_timer)
                handleClearStart()
            }
        }, 1000)
    }
    start_btn.addEventListener("click", handleStart)
    const handleTrue = (trues) => {
        document.body.innerHTML = null
        let h1 = document.createElement("h1")
        h1.appendChild(document.createTextNode(`Sizda tug'ri javoblar ${trues} taga teng va siz alochisiz`))
        h1.classList.add("text-light")
        document.body.appendChild(h1)
    }
    const handleFalse = (falses) => {
        document.body.innerHTML = null
        let h1 = document.createElement("h1")
        h1.appendChild(document.createTextNode(`Sizda noto'ri javoblar ${falses} taga teng va siz bilimsizsiz`))
        h1.classList.add("text-light")
        document.body.appendChild(h1)  
    }
    const handleNext = (true_variant, false_variant) => {
        if(savollar_javob.length-1 > idx){
            idx++
            setTimeout(() => {
                handleRenderSavol([savollar_javob[idx]])
            }, 500)
        }else{
            if(savollar_javob.length / 2 <= true_variant ){
                handleTrue(true_variant)
            }else{
                handleFalse(false_variant)
            }
        }
    }
    const handleCilck = (event) => {
        if(event.target.matches(".variant_li")){
            if(savollar_javob[idx].javob === event.target.textContent){
                event.target.classList.add("true")
                tugri++
            }else{
                notugri++
                event.target.classList.add("false")
            }
            handleNext(tugri, notugri)
        }
    }
    window.addEventListener("click", handleCilck)
})