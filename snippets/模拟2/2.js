document.querySelector("#sign_in_btn").addEventListener("click", () => {
  const today = new Date().getDate();
  [...document.querySelector("#days").children].find(item => 
      item.textContent === String(today)).classList.add("active")
  document.querySelector("#sign_in_btn").classList.add("no-active")
  document.querySelector("#sign_in_btn").textContent = "明天也要记得来哦"
})
