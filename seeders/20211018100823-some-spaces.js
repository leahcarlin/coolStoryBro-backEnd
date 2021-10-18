"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("spaces", [
      {
        title: "My Cool Space",
        description: "This is where I come to destress",
        backgroundColor: "#B6C649",
        color: "#2C4251",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: "Welcome to My World",
        description: "I will tell you all about my life",
        backgroundColor: "#D16666",
        color: "#2C4251",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
