# People purchasing Items!

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

### Modify `Purchase.init()`

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