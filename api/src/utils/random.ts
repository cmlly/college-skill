// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getRandomUser() {
  const nums = ["0","1","2","3","4","5","6","7","8","9"];
  const letters = ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"];
  let num = ""
  for (let i = 0; i <= 7; i++) {
    const id = Math.ceil(Math.random() * 9);
    num += nums[id]
  }
  let letter = ""
  for (let i = 0; i <= 1; i++) {
    const id = Math.ceil(Math.random() * 23);
    letter += letters[id]
  }
  return letter + num;
}

export function getRandomCode() {
  const nums = ["0","1","2","3","4","5","6","7","8","9"];
  let num = ""
  for (let i = 0; i <= 5; i++) {
    const id = Math.ceil(Math.random() * 9);
    num += nums[id]
  }
  return num;
}
