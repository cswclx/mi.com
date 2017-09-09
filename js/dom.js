// 添加类名
function addClass(el, className) {
    if(!el || hasClass(el, className)) {
        return
    }
    let newClassName = el.className.split(' ')
    newClassName.push(className)
    el.className = newClassName.join(' ')
}
// 删除类名
function removeClass(el, className) {
    if (!el || !hasClass(el, className)) {
        return
    }
    let newClassName = el.className.split(' ')
    let index = newClassName.findIndex(val => val === className)
    newClassName.splice(index, 1)
    el.className = newClassName.join(' ')
}

// 判断是否存在类名
function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

/* 浏览器transform检测 */
let elementStyle = document.createElement('div').style
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }
    for (let key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }
    return false
})()

/* 给style加前缀 */
function prefixStyle(style) {
    if (vendor === false) {
        return false
    }
    if (vendor === 'standard') {
        return style
    }
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

