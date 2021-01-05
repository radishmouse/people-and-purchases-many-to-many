const { Person, Item, Purchase } = require('./models');

async function createTestUser() {
    const newUser = await Person.create({ name: 'oakley' });
    console.log(newUser);
}

async function getOakley() {
    const p = await Person.findByPk(1);
    return p;
}

module.exports = {
    getOakley
}