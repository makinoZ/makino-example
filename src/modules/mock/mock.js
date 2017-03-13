import Mock from 'mockjs'

// 商品卡片的模拟数据
let products = (function() {
    let arr = []
    for (let i = 0; i < 8; i++) {
        arr.push({
            name: Mock.mock('@cword(5)'),
            unit: '500g/份',
            discount: Mock.mock('@float(1,100,2,2)'),
            unifiedMerchandiseId: Mock.mock('@id'),
            // stallsId: 102,
            number: Mock.mock('@int(0,1)'),
            image: Math.random() > 0.3 ? Mock.mock('@img(290x290,@color)') : ''
        })
    }
    return arr
})()

//商品详情轮播图模拟数据
let picList = (function() {
    let arr = [];
    for (let i = 0; i < 8; i++) {
        arr.push({
            littlePic: Mock.mock('@img(68x68,@color)'),
            largePic: Mock.mock('@img(550x550,@color)'),
            isActive: false
        });
    }
    return arr;
})()

//小banner轮播图模拟数据
let litBanPicList = (function() {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push(Mock.mock('@img(660x410,@color)'));
    }
    return arr;
})()



//banner轮播图模拟数据
let slideList = (function() {
    let arr = [];
    for (let i = 0; i < 5; i++) {
        arr.push({
            image: Mock.mock('@img(660x410,@color)'),
            // clickUrl: ''
        });
    }
    return arr;
})()


export {
    products,
    picList,
    litBanPicList,
    slideList
}