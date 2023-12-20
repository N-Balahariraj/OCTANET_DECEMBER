const Arrow = document.getElementById("Arrow")
const SidePane = document.getElementById("SidePane")

const Expand = ()=>{
    Arrow.classList.toggle("Collapse")
    SidePane.classList.toggle("Expand")
}

Arrow.addEventListener("click",Expand)