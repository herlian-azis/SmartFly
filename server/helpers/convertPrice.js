const convertToNumber = (param) => {
  let price1 = param
  let price2 = price1.split("")
  let price3 = []

  for (let i = 0; i < price2.length; i++) {
    if (Number(price2[i]) == price2[i] && price1[i] != " ") {
      price3.push(price2[i])
    }
  }
  return Number(price3.join(""))
}

module.exports= convertToNumber