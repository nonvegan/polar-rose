const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const divRanges = document.getElementById('div')
const divButtons = document.getElementById('divButtons')
const button = document.createElement('button')
const nRange = document.createElement('input')
const dRange = document.createElement('input')
const sizeRange = document.createElement('input')
const switchSlider = document.createElement('label')
const nRangeLabel = document.createElement('label')
const sizeRangeLabel = document.createElement('label')
const dRangeLabel = document.createElement('label')
const switchSliderLabel = document.createElement('label')
const infoLabels = document.createElement('label')
nRange.setAttribute("type", "range")
dRange.setAttribute("type", "range")
sizeRange.setAttribute("type", "range")
nRange.setAttribute("min", "1")
dRange.setAttribute("min", "1")
nRange.setAttribute("max", "9")
dRange.setAttribute("max", "9")
nRange.setAttribute("value", "2")
dRange.setAttribute("value", "1")

button.innerHTML = "<span>Reset</span> Button"
nRangeLabel.innerText = "N"
dRangeLabel.innerText = "D"
sizeRangeLabel.innerText = "Size"
switchSliderLabel.innerText = "n++"
switchSlider.className = "switch"
switchSlider.innerHTML = "<input type=\"checkbox\"><span class =\"slider round\"></span>"
switchSlider.firstChild.checked = false

button.addEventListener('click', () => {
    nRange.value = 2
    dRange.value = 1
    sizeRange.value = 50
    n = nRange.value
    d = dRange.value
    α = sizeRange.value * 4
    k = n / d
})
nRange.addEventListener('input', () => {
    n = nRange.value
})
dRange.addEventListener('input', () => {
    d = dRange.value
})
sizeRange.addEventListener('input', () => {
    α = sizeRange.value * 4
})

switchSlider.firstChild.addEventListener('change', () => {
    if (!switchSlider.firstChild.checked) {
        k = n / d
    }
})

divRanges.appendChild(nRangeLabel)
divRanges.appendChild(nRange)
divRanges.appendChild(dRangeLabel)
divRanges.appendChild(dRange)
divRanges.appendChild(sizeRangeLabel)
divRanges.appendChild(sizeRange)
divButtons.appendChild(button)
divButtons.appendChild(switchSliderLabel)
divButtons.appendChild(switchSlider)
divButtons.appendChild(infoLabels)

const width = Math.round(window.screen.height / 1.8)
const height = Math.round(window.screen.height / 1.8)
const center = new Vector(Math.round(width / 2), Math.round(height / 2))
canvas.width = width
canvas.height = height
let n = 2
let d = 1
let α = sizeRange.value * 4
let k = 0

function clear() {
    ctx.clearRect(0, 0, width, height)
}

function draw() {
    ctx.fillStyle = Color.PINK.hex()
    if (switchSlider.firstChild.checked)
        k += 0.005
    else
        k = n / d
    for (let a = 0; a < Math.PI * 2 * d; a += 1 / k / α) {
        let point = center.clone().addPolar(a, α * Math.cos(k * a))
        ctx.fillRect(point.x, point.y, 1, 1)
    }
    infoLabels.innerText = `k=${Math.trunc(k)} ` + ` n=${Math.trunc(n)},d=${Math.trunc(d)}`
}



setInterval(() => {
    clear()
    draw()
}, getMs(60));