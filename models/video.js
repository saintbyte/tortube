'use strict';
module.exports = (sequelize, DataTypes) => {
  var Video = sequelize.define('Video', {
      video_uid: { type: DataTypes.STRING, unique: true },
      title: DataTypes.STRING,
      width: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      duration: DataTypes.INTEGER
  }, {});
  Video.associate = (models) => {
    // associations can be defined here
  };
  return Video;
};