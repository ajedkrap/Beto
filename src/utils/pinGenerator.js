
const char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


const generate = () => {
  let pin = "2"
  let x = (Math.floor(Math.random() * (999 - 0 + 1)) + 0).toString()
  if (x.length === 2) {
    x += "0"
  } else if (x.length === 1) {
    x += "00"
  }
  pin += x
  for (let i = 0; i < 4; i++) {
    pin += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  return pin
}

module.exports = () => {
  let getPin = generate()
  return getPin
}