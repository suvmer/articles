'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
    await queryInterface.bulkInsert('Posts', [{
      title: "Тёмная сторона открывает путь к таким возможностям",
      body: "Которые кое-кто считает просто неестественными. Ведь это здорово - пускать молнии из рук и бросать предметы во всё, что движется. Как мне кажется, стоит присоединиться",
      createdAt: new Date(Date.now() - 2*24*60*60*1000),
      updatedAt: new Date(Date.now() - 2*24*60*60*1000)
    },
    {
      title: "This is where the fun begins",
      body: "Так сказал Энакин Скайуокер, магистр джедай, в битве при Корусанте. Его звёздный истребитель был подбит дроидами, и пришлось совершить экстренную посадку на вражеский крейсер",
      createdAt: new Date(Date.now() - 3*24*60*60*1000),
      updatedAt: new Date(Date.now() - 3*15*60*60*1000)
    },
    {
      title: "Ты был избранником, Энакин. Предрекали, что ты уничтожишь ситхов, а не примкнёшь к ним",
      body: "Если ты не со мной, значит, ты против меня. - Я выполню свой долг. *включается световой меч и начинается веселье на Мустафаре*",
      createdAt: new Date(Date.now() - 6*24*60*60*1000),
      updatedAt: new Date(Date.now() - 4*13*57*60*1000)
    },
    {
      title: "А где Падьме?",
      body: "Похоже, в порыве ярости ты её уничтожил. - Неет!. На самом деле, можно вечно цитировать Звёздные Войны. Пожалуй, займусь этим для следующих сидов:)",
      createdAt: new Date(Date.now() - 5*24*60*60*1000),
      updatedAt: new Date(Date.now() - 4*12*55*60*1000)
    }
  ], {});
  await queryInterface.bulkInsert('Comments', [{
    body: "Это правда, я видел своими глазами, как молния подожгла стол",
    post_id: 1,
    createdAt: new Date(Date.now() - 2*24*60*60*990),
    updatedAt: new Date(Date.now() - 2*24*60*60*990)
  },
  {
    body: "А у меня друг ситх",
    post_id: 1,
    createdAt: new Date(Date.now() - 2*24*60*60*980),
    updatedAt: new Date(Date.now() - 2*24*60*60*980)
  },
  {
    body: "Спустя день, наконец, добрался до комментариев. В общем, продам гараж",
    post_id: 1,
    createdAt: new Date(Date.now() - 1*24*60*60*980),
    updatedAt: new Date(Date.now() - 1*24*60*59*980)
  },
  {
    body: "Я единственный, кто прокомментирует этот пост. Потому что все остальные не любят джедаев",
    post_id: 2,
    createdAt: new Date(Date.now() - 3*24*60*60*990),
    updatedAt: new Date(Date.now() - 3*15*60*60*990)
  },
  {
    body: "Дарт Вейдер хорошим был ситхом. Жалко, поздно вернулся на светлую сторону. Люк жареный",
    post_id: 4,
    createdAt: new Date(Date.now() - 6*24*60*60*900),
    updatedAt: new Date(Date.now() - 4*13*57*60*900)
  },
  {
    body: "Есс, минус три!",
    post_id: 4,
    createdAt: new Date(Date.now() - 5*24*60*60*988),
    updatedAt: new Date(Date.now() - 4*12*55*60*988)
  }
], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Posts', null, {});
  }
};
