'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(
        models.User,
        {
          foreignKey:"userId",
          onDelete: 'CASCADE',
          hooks: true,
        }
      );
      Booking.belongsTo(
        models.Spot,
        {
          foreignKey: "spotId",
          onDelete: 'CASCADE',
          hooks: true
        }
      );
      
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      // validate: {
      //   isNotBeforeToday(value){
      //     if (value < new Date()) {
      //       throw new Error('endDate cannot be on or before startDate')
      //     }
      //   }
      // }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isNotBeforeStart(value) {
          if (value < this.startDate) {
            throw new Error('endDate cannot be on or before startDate')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};

