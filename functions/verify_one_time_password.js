const admin = require('firebase-admin');

module.exports = function(req, res) {
  if (!req.body.phone || !req.body.code) {
    return res.status(422).send({ error: 'phone and code must be provided' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');
  const code = parseInt(code);

  admin.auth().getUser(phone)
    .then(() => {
      admin.database().ref('users/' + phone).on('value', snapshot => {
        const user = snapshot.val();

        if (user.code !=== code || !user.codeValid) {
          return res.status(422).send({ error: 'code is not valid' });
        }


      });
    })
    .catch((err) => res.status(422).send({ error: err }))
}
