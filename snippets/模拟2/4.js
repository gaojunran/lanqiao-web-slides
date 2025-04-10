function parseContactInfo(text) {
  // TODO: 请补充代码
  const phoneRe = /(\d{11})\s/
  const nameRe = /([\u4e00-\u9fa5]{2,4})\s/
  const addressRe = /([\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9]{3,100})\s/
  text = text.replace(",", "").replace("，", "")
  text += " "
  return {
      phone: +(phoneRe.exec(text)?.[1] ?? 0),
      name: nameRe.exec(text)?.[1] ?? "",
      address: addressRe.exec(text)?.[1] ?? ""
  }
}
