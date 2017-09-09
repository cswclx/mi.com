// 节流函数
function debounce(func, delay) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

// 向量
function vector(a, b) {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}

// 向量叉乘公式
function vectorProduct(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y
}

// 判断点是否在三角形内
function isPointInTrangle(p, a, b, c) {
    let pa = vector(p, a)
    let pb = vector(p, b)
    let pc = vector(p, c)

    let abProduct = vectorProduct(pa, pb)
    let bcProduct = vectorProduct(pb, pc)
    let acProduct = vectorProduct(pc, pa)

    return sameSign(abProduct, bcProduct) && sameSign(bcProduct, acProduct)
}

// 判断符号是否相同
function sameSign(a, b) {
    return (a ^ b) >= 0
}

function needDelay(el, prevMousePos, currMousePos) {
    if (prevMousePos === undefined || currMousePos == undefined) return
    let boundingClient = el.getBoundingClientRect();
    let offsetTop = Math.max(boundingClient.top, 730 + siteHeight)
    let topLeft = {
        x: boundingClient.left,
        y: offsetTop
    }
    let bottomLeft = {
        x: boundingClient.left,
        y: offsetTop + boundingClient.height
    }
    return isPointInTrangle(currMousePos, prevMousePos, topLeft, bottomLeft)
}
