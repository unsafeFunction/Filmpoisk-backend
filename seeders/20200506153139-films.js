const { groupTypes } = require("../../src/utils/constants");

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Film",
      [
        {
          meetingId: 1,
          blockId: 1,
          name: "Backlog",
          groupType: groupTypes[1],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Film", null, {})
};
