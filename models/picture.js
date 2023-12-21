'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Picture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Picture.belongsToMany(models.Tag, {through: "TagForPicture", foreignKey: "PictureId"})
      Picture.belongsTo(models.User)
    }
  }
  Picture.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    uploadDate: DataTypes.DATE,
    url: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Picture',
  });
  return Picture;
};