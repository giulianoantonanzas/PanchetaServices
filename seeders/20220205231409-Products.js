"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    // Poner nombre de tabla
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Muñeca Doll",
          price: 200,
          description: "Esta es una muñeca endemoñada",
          stock: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Muñeca de Kitty",
          price: 500,
          description: "Kitty es adorable",
          stock: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Muñeca de tela",
          price: 1200,
          description:
            "Consectetur ut excepteur elit ullamco ad ex non Lorem amet eu. Culpa in pariatur et veniam exercitation. Tempor dolor nisi reprehenderit cupidatat reprehenderit amet eiusmod Lorem anim culpa ea magna ad.",
          stock: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
