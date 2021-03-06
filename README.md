# People purchasing Items!

Use the Sequelize ORM (Object-Relational Mapper) to conveniently communicate with our PostgreSQL database.

An ORM translates JavaScript Objects to/from Relational Databases (like PostgreSQL).

## Tables

- Persons
    - name
- Items
    - name
- Purchases
    - personId
    - itemId

## Database speak

- a Person has many Purchases
- Purchases belong to many Persons
- an Item has many Purchases
- Purchases belong to many Items

## Sequelize calls

Setting up the models

```sh
npx sequelize model:generate --name Person --attributes name:string
npx sequelize model:generate --name Item --attributes name:string
npx sequelize model:generate --name Purchase --attributes 'personId:integer, itemId:integer'
```

## How to handle Sequelize's automatic pluralization?

Or: "when do I say People and when do I say Person"?

- Use `Person` in any code file that is not a migration.
- Use `People` in Beekeeper or in a migration file.

## Set up Foreign Keys and associations in our Junction Table

Two steps to do this:

1. Modify the `Purchase.init()` to tell Sequelize what Tables the Foreign Keys _reference_.
2. Add function calls to the `associate()` function.
    - `Purchase.belongsTo(Person)`
    - `Purchase.belongsTo(Item)`

### 1. Modify `Purchase.init()`

For each foreign key:
- change the value to an object
- gave it a `type` property
- gave it a `references` property

```js
  Purchase.init({
    personId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Person',
        key: 'id'
      }
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Item',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Purchase',
  });
```


### 2. Add association calls inside the `associate()` function

```js
    static associate(models) {
      // Use models.Person instead of doing a 
      // require('./person).
      // This avoids "circular imports"
      Purchase.belongsTo(models.Person, {
        foreignKey: 'personId'
      });
      Purchase.belongsTo(models.Item, {
        foreignKey: 'itemId'
      });

    }
```

## Magic methods!

You would use these in your express controller functions to efficiently get related information. You then `res.render()` a template that can display that information.

```js
const p = await Person.findByPk(1);
const items = await p.getItems();
// items will be an Array of Item model objects.
// One item for every entry in the Purchases table
// where personId is 1

const i = await Item.findByPk(1);
const people = await i.getPeople();

```