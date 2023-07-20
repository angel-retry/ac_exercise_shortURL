const text_copy = document.querySelector('.text-copy').innerHTML
const text_btn = document.querySelector('.btn-copy')
const alert_copy = document.querySelector('.alert-copy')



//使用bootstrap alert功能
function alert(message, type) {
  //宣告wrapper建立一個div
  const wrapper = document.createElement('div')

  //在wrapper裡面建立innerHTML
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  //alert_copy新增此內容
  alert_copy.append(wrapper)
}

//btn建立監聽器
text_btn.addEventListener('click', function copyText() {

  //使用 Clipboard API達成複製貼上功能
  navigator.clipboard.writeText(text_copy)

    .then(() => {
      alert('網址已複製!', 'success') //呼叫alert function
    })
    .catch(err => {
      alert('網址無法複製! 請改手動複製!', 'warning')
    })

})


