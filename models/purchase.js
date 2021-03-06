'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Use models.Person instead of doing a 
      // require('./person).
      // This avoids "circular imports"
      Purchase.belongsTo(models.Person, {
        foreignKey: 'personId'
      });
      Purchase.belongsTo(models.Item, {
        foreignKey: 'itemId'
      });

      models.Person.belongsToMany(models.Item, {
        through: Purchase,
        foreignKey: 'personId'
      });

      models.Item.belongsToMany(models.Person, {
        through: Purchase,
        foreignKey: 'itemId'
      });

    }
  };
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
  return Purchase;
};