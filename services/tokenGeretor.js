const generateTokens = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result1 = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < 15; i += 1) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result1;
};

// console.log(generateRandomString(16));
module.exports = { generateTokens };