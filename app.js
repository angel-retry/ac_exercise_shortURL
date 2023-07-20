const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.use(express.static('public'))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

//創建一個專門放URL的陣列
let URL_box = []

//建立亂數function，引數(length)為此亂數字串
function getRandomNumber(length) {
  //宣告characters接收大小寫英文及數字字串
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //宣告randomString接收亂數
  let randomString = ""
  for (let i = 0; i < length; i++) {
    //宣告randomIndex接收亂數的位置
    let randomIndex = Math.floor(Math.random() * characters.length)
    //randomString接收亂數
    randomString += characters[randomIndex]
  }
  //回傳結果
  return randomString
}

//渲染首頁
app.get('/', (req, res) => {
  res.render('index')
})


//渲染產出短網址畫面
app.get('/shortener', (req, res) => {

  //抓取表單送出的關鍵字
  const keyword = req.query.keyword

  //防呆使用者沒輸入網址
  if (!keyword) {
    res.send('<script>alert("請輸入網址"); window.location.href = "/"; </script>')
  }

  //建立URL_obj，之後來render
  let URL_obj = ""

  //宣告isBeenUrl專門檢查是否原本就有存在此網址
  const isBeenUrl = URL_box.find(url => url.url === keyword) //使用find檢查，回傳一個值

  //檢查isBeenUrl是否有值
  if (isBeenUrl) {
    //有的話，URL_obj = isBeenUrl，之後來做render
    URL_obj = isBeenUrl
  } else {
    //沒有的話，創一個亂碼給他
    const randomString = getRandomNumber(5)//宣告變數接收5個亂數

    //宣告新的URL_obj資料
    const new_URL_obj = {
      url: keyword, //接收前面的keyword
      shortUrl: randomString //接收產生的亂數
    }

    //把新建立的物件加入至URL_box陣列
    URL_box.push(new_URL_obj)

    //並且URL_obj接收此新物件，之後來做render
    URL_obj = new_URL_obj
  }

  //render URL_obj(前面決定render舊的或是新的)
  res.render('shortener', { URL_obj, port })


})

//連接到短網址去
app.get('/:shortUrl', (req, res) => {
  //宣告shortUrl接收req的shortUrl值
  const shortUrl = req.params.shortUrl
  //宣告url如果URL_box陣列裡的url裡等於shortUrl，回傳此值
  const url = URL_box.find(url => url.shortUrl === shortUrl)
  //導向url網址
  res.redirect(`${url.url}`)

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})