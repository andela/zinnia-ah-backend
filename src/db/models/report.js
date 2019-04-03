module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'article_id',
    },
    reportType: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'report_type',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {});
  Report.associate = () => {
    // associations can be defined here
  };
  return Report;
};
