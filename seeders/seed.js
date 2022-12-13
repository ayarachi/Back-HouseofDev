const properties = require("../utils/propiedades.json");
const { Property } = require("../models");

const crearPropiedades = () => {
  Property.bulkCreate(properties).then(() =>
    console.log("propiedades creadas")
  );
};
crearPropiedades();
