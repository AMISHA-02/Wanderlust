const bcrypt = require('bcrypt');

(async () => {
  const newPassword = 'MyNewSecurePassword';
  const hashed = await bcrypt.hash(newPassword, 10);
  console.log(hashed);
})();
