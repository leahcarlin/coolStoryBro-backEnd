"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("stories", [
      {
        name: "My first story",
        content: "Let me tell you about my life. It is great!",
        imgUrl:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fstock-photo%2Fhappy_girl.html&psig=AOvVaw1VhkzuLmYVoghhK17ceFmZ&ust=1634638625404000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDlwMjd0_MCFQAAAAAdAAAAABAD",
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 1,
      },
      {
        name: "Stay fit & motivated in the fall and winter!",
        content:
          "Find a sports buddy: Motivating each other is also a very good thing. I train regularly with my sister. We have a deal to work out together at least three times a week. When one of us (or both of us) isn't in the mood, we cheer each other up and all think of reasons why it would be stupid not to go. And that helps, because we always end up going!",
        imgUrl:
          "https://us.123rf.com/450wm/supernam/supernam1909/supernam190900095/130645319-photo-of-happy-two-athletes-men-shaking-hands-on-sports-field-on-summer-day.jpg?ver=6",
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 1,
      },
      {
        name: "No more takeout! Make this easy lo mein at home",
        content:
          "The main difference between lo mein and chow mein are the noodles used. Lo mein noodles are thicker and chewier and chow mein noodles are thinner and crisper.",
        imgUrl:
          "https://iamafoodblog.b-cdn.net/wp-content/uploads/2020/09/easy-soy-sauce-fried-chow-mein_7219.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 2,
      },
      {
        name: "Together, we’re building a world without homelessness",
        content:
          "We’ve now built 26 holistic communities in four countries. In nearly all of them, we’ve experimented with new housing solutions. However, there are a few parts of our process that we always practice when we build: trusted partners, inclusive design, and local sourcing.",
        imgUrl:
          "https://images05.military.com/sites/default/files/styles/full/public/media/money/va-loans/2017/08/army-habitat-humanity-build-home.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
        spaceId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
