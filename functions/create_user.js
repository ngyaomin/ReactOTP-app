 const admin = require('firebase-admin');

module.exports = function(req, res) {
  // verify user provided a phone
  if (!req.body.phone) {
    return res.status(422).send({ error: 'bad input' });
  }

  // format phone number to remove unwanted shit
  const phone = String(req.body.phone).replace(/[^\d]/g);

  // create new user account using that phone number
  admin.auth().createUser({ uid: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));

  // response to user request
}
