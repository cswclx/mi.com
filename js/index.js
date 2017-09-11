const transition = prefixStyle('transition')
const transform = prefixStyle('transform')

// header-nav商品变换
const navLis = document.querySelectorAll('#header-nav-ul .nav-li')
const headerGoodsWrapper = document.querySelector('#header-goods-wrapper')
let headerTimer
for(let i = 0; i < navLis.length; i++) {
    navLis[i].addEventListener('mouseenter', () => {
        if (headerTimer) {
            clearTimeout(headerTimer)
            return
        }
        headerTimer = setTimeout(() => {
            headerGoodsWrapper.style.height = '229px'
            headerTimer = null
        }, 300)
    })
    navLis[i].addEventListener('mouseleave', () => {
        headerTimer = setTimeout(() => {
            headerGoodsWrapper.style.height = 0
            headerTimer = null
        }, 300)
    })
}


// 导航滑入加延迟   start
const subMenu = document.querySelector('#sub-menu') // 子菜单容器
const sliderNav = document.querySelector('#slider-nav') // 父菜单容器
const sliderLis = sliderNav.querySelectorAll('.slider-left-li')
let activeLi // 定义变量保存一级菜单
let activeSubMenu // 定义变量保存二级菜单
let timer
let isMouseInSub = false
let mouseTrack = []  // 保存鼠标位置

// 一级菜单添加，mouseenter事件
sliderNav.addEventListener('mouseenter', (e) => {
    removeClass(subMenu, 'none')
    document.addEventListener('mouseover', moveHandler)
})
// 一级菜单添加，mouseleave事件
sliderNav.addEventListener('mouseleave', (e) => {
    addClass(subMenu, 'none')
    if (activeLi) {
        removeClass(activeLi, 'active')
        activeLi = null
    }
    if (activeSubMenu) {
        addClass(activeSubMenu, 'none')
        activeSubMenu = null
    }
    document.removeEventListener('mousemove', moveHandler)
})
// 记录鼠标位置
function moveHandler(e) {
    mouseTrack.push({
        x: e.pageX,
        y: e.pageY
    })
    if (mouseTrack.length > 3) {
        mouseTrack.shift()
    }
}
// 二级菜单绑定事件
subMenu.addEventListener('mouseenter', () => {
    isMouseInSub = true
})
subMenu.addEventListener('mouseleave', () => {
    isMouseInSub = false
})
// 每个二级菜单mouseenter事件
for(let sliderLi of sliderLis) {
    sliderLi.addEventListener('mouseenter', function() {
        if (!activeLi){
            activeLi = this
            sliderLiChange(this)
            return
        }
        if (timer) {
            clearTimeout(timer)
        }
        let currMousePos = mouseTrack[mouseTrack.length - 1]
        let prevMousePos = mouseTrack[mouseTrack.length - 2]

        let delay = needDelay(subMenu, prevMousePos, currMousePos)
        if (delay) {
            timer = setTimeout(() => {
                if (isMouseInSub) {
                    return
                }
                removeClass(activeLi, 'active')
                addClass(activeSubMenu, 'none')
                activeLi = this
                sliderLiChange(this)
                timer = null
            }, 300)
        } else {
            let prevActiveLi = activeLi
            let prevActiveSubMenu = activeSubMenu
            removeClass(prevActiveLi, 'active')
            addClass(prevActiveSubMenu, 'none')
            activeLi = this
            sliderLiChange(this)
        }
    })
}
function sliderLiChange(el) {
    addClass(el, 'active')
    let id = el.getAttribute('data-id')
    activeSubMenu = document.querySelector(`#c-${id}`)
    removeClass(activeSubMenu, 'none')
}
// 导航滑入加延迟   end


// slider变化 start
const sliderDots = document.querySelector('#slider-dots')
const sliderDotLis = sliderDots.querySelectorAll('li')
const sliderImgUl = document.querySelector('#slider-img-ul')
const sliderImgUlLis = sliderImgUl.querySelectorAll('li')
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
let index = 0
let length = sliderDotLis.length
let autoPlay
prev.addEventListener('click', (e) => {
    duration(e, 0)
})
next.addEventListener('click', function(e) {
    duration(e, 1)
})
function duration(e, type){
    if (autoPlay) clearInterval(autoPlay)
    if (e) e.preventDefault();
    if (type) {
        index++
        index %= length
    } else {
        index--
        if (index < 0) {
            index = length - 1
        }
    }
    changeSlider(index)
    autoPlay = setInterval(() => {
        duration(null, 1)
    }, 5000)
}

addClass(sliderDotLis[0].firstChild, 'active')
sliderImgUlLis[0].style.opacity = 1
for (let i = 0; i < length; i++) {
    let dotLi = sliderDotLis[i];
    dotLi.addEventListener('click', (e) => {
        e.preventDefault()
        index = i
        changeSlider(index)
    })
    dotLi.addEventListener('mouseenter', () => {
        if (autoPlay) {
            clearInterval(autoPlay)
        }
    })
    dotLi.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            duration(null, 1)
        }, 5000)
    })
}
function changeSlider(index) {
    for (let j = 0; j < length; j++) {
        removeClass(sliderDotLis[j].firstChild, 'active')
        sliderImgUlLis[j].style.opacity = 0
    }
    addClass(sliderDotLis[index].firstChild, 'active')
    sliderImgUlLis[index].style.opacity = 1
}
autoPlay = setInterval(() => {
    duration(null, 1)
}, 5000)
// slider变化 end



// banner变换 start
const bannerList = document.querySelector('.banner-list')
const shadow = bannerList.querySelector('.shadow')
const boxMiddle = bannerList.querySelector('.middle')
const boxRight = bannerList.querySelector('.right')
const siteTop = document.querySelector("#site-top")
const siteHeight = siteTop ? +siteTop.clientHeight : 0

let boundingClient = bannerList.getBoundingClientRect()
let clientWidth = boundingClient.width
let clientHeight = boundingClient.height
let offsetLeft = boundingClient.left
let offSetTop = Math.max(boundingClient.top, 170 + siteHeight)


bannerList.addEventListener('mouseenter', function() {
    this.style[transition] = '0s'
    shadow.style[transition] = '0s'
    boxMiddle.style[transition] = '0s'
    boxRight.style[transition] = '0s'
    shadow.style.opacity = 1
    document.addEventListener('mousemove', bannerMouseMove)
})
bannerList.addEventListener('mouseleave', function() {
    document.removeEventListener('mousemove', bannerMouseMove)
    this.style[transform] = ''
    this.style[transition] = '.3s'
    shadow.style.opacity = 0
    shadow.style[transition] = '.3s'
    shadow.style[transform] = ''
    boxMiddle.style[transform] = ''
    boxMiddle.style[transition] = '.3s'
    boxRight.style[transform] = ''
    boxRight.style[transition] = '.3s'
})

function bannerMouseMove(e) {
    let x = e.pageX
    let y = e.pageY
    const deg = 3
    let deltaX = (x - offsetLeft - clientWidth / 2) / clientWidth
    let deltaY = (y - offSetTop - clientHeight / 2) / clientHeight
    bannerList.style[transform] = `rotateX(${-deltaY * deg}deg) rotateY(${deltaX * deg * 1.5}deg)`
    shadow.style[transform] = `translate3d(${-deltaX * deg * 20}px,${-deltaY * deg * 20}px,0)`
    boxMiddle.style[transform] = `translate3d(${-deltaX * deg}px, ${-deltaY / 5 * deg}px, 0)`
    boxRight.style[transform] = `translate3d(${deltaX * deg * 1.5}px, ${deltaY * deg / 5 * 1.5}px, 0)`
}
// banner变换 end


// plain变换  start
const plainControlsWrapperList = document.querySelectorAll('.plain-controls-wrapper')
for (let i = 0; i < plainControlsWrapperList.length; i++){
    plainChange(plainControlsWrapperList[i])
}

function plainChange(dom) {
    const prev = dom.querySelector('.prev')
    const next = dom.querySelector('.next')
    const plainList = dom.parentNode.parentNode.querySelector('.plain-list')
    const width = plainList.clientWidth
    const length = width / 1226 | 0
    let index = 0
    prev.addEventListener('click', (e) => {
        e.preventDefault()
        if (index === 0) {
            return
        }
        index--
        if (index === 0) {
            addClass(prev, 'default')
            removeClass(next, 'default')
        }
        removeClass(next, 'default')
        plainList.style[transform] = `translate3d(${- width / length * index}px, 0, 0)`
    })
    next.addEventListener('click', (e) => {
        e.preventDefault()
        if (index === length - 1) {
            return
        }
        index++
        if (index === length - 1) {
            addClass(next, 'default')
            removeClass(prev, 'default')
        }
        removeClass(prev, 'default')
        plainList.style[transform] = `translate3d(${- width / length * index}px, 0, 0)`
    })
}
// plain变换  end

// main商品变换 start
const houseHoldList = document.querySelectorAll('.house-hold-controls li')
const intelligenceHoldList = document.querySelectorAll('.intelligence-hold-controls li')
const collocationHoldList = document.querySelectorAll('.collocation-hold-controls li')
const partsHoldList = document.querySelectorAll('.parts-hold-controls li')
const peripheryHoldList = document.querySelectorAll('.periphery-hold-controls li')

~function (){
    mainChange(houseHoldList)
    mainChange(intelligenceHoldList)
    mainChange(collocationHoldList)
    mainChange(partsHoldList)
    mainChange(peripheryHoldList)
}()

function mainChange(el) {
    for(let i = 0; i < el.length; i++) {
        el[i].addEventListener('mouseenter', function() {
            for(let j = 0; j < el.length; j++) {
                removeClass(el[j], 'active')
            }
            addClass(this, 'active')
            let goodsList = this.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.good-list')
            for (let k = 0; k < goodsList.length; k++) {
                addClass(goodsList[k], 'none')
                removeClass(goodsList[i], 'none')
            }
        })
    }
}

let itemList = document.querySelectorAll('.item-active')
for(let i = 0; i < itemList.length; i++) {
    itemList[i].addEventListener('mouseenter', function() {
        let article = this.querySelector('.article')
        if (article) {
            article.style.height = '76px'
        }
    })
    itemList[i].addEventListener('mouseleave', function() {
        let article = this.querySelector('.article')
        if (article) {
            article.style.height = 0
        }
    })
}
// main商品变换 end

// content 内容变换 start
let itemControls = document.querySelectorAll('.item-controls')
for(let i = 0; i < itemControls.length; i++) {
    itemChange(itemControls[i])
}
function itemChange(dom) {
    const prev = dom.querySelector('.prev')
    const next = dom.querySelector('.next')
    const changeList = dom.parentNode.querySelector('.change-list')
    const changeLis = changeList.querySelectorAll('li')
    const dots = dom.parentNode.querySelector('.dots-wrapper').querySelectorAll('li')
    const width = changeList.clientWidth
    const length = changeLis.length
    let index = 0 // 当前显示的index
    // next 点击事件
    next.addEventListener('click', (e) => {
        e.preventDefault()
        if (index === length - 1) {
            return
        }
        index++
        nextCursorChange()
        prev.style.cursor = 'pointer'
        changeTransform()
    })
    // prev 点击事件
    prev.addEventListener('click', (e) => {
        e.preventDefault()
        if (index === 0) {
            return
        }
        index--
        prevCursorChange()
        next.style.cursor = 'pointer'
        changeTransform()
    })

    // dot点击事件
    for(let i = 0; i < dots.length; i++) {
        dots[i].querySelector('span').addEventListener('click', () => {
            index = i
            nextCursorChange()
            prevCursorChange()
            changeTransform()
        })
    }
    // dot和轮播变化
    function changeTransform() {
        for (let i = 0; i < dots.length; i++) {
            removeClass(dots[i].querySelector('span'), 'active')
        }
        addClass(dots[index].querySelector('span'), 'active')
        changeList.style.marginLeft = `${-width / length * index}px`
    }

    // next按钮cursor变化
    function nextCursorChange() {
        if (index === length - 1) {
            next.style.cursor = 'default'
        } else {
            next.style.cursor = 'pointer'
        }
    }

    // prev按钮cursor变化
    function prevCursorChange() {
        if (index === 0) {
            prev.style.cursor = 'default'
        } else {
            prev.style.cursor = 'pointer'
        }
    }
}
// content 内容变换 end
