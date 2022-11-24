const s = requiere ("sequelize")
const db = require("../config/db ");

class Property extends s.Model {}
Property.init(
  {
    name: {
      type: s.STRING,
      allowNull: false,
    },
    number_rooms: {
      type: s.STRING,
      allowNull: false,
    },
    image: {
      type: s.STRING,
    },
    
  },
  { sequelize: db, modelName: "property" }
  )

  module.exports= Property