'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async t => {
      await queryInterface.bulkInsert('Posts', [{
        title: 'My First Post',
        body: 'First post body content',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'My Second Post',
        body: 'Second post body content',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);

      const posts = await queryInterface.sequelize.query(
        `SELECT id from "Posts";`
      );

      const postRows = posts[0];

      for (const post of postRows) {
        await queryInterface.bulkInsert('Comments', [{
          comment: "Here is a comment",
          name: "John Doe",
          postId: post.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
