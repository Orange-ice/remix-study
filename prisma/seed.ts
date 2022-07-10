import {PrismaClient} from '@prisma/client';

const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getJokes().map(joke => {
      return db.joke.create({
        data: joke,
      });
    })
  );
}

seed();

function getJokes() {
  return [
    {
      name: 'Road worker',
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      name: 'Frisbee',
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      name: 'Trees',
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
    {
      name: 'Skeletons',
      content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
    },
    {
      name: 'Hippos',
      content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
    },
    {
      name: 'Dinner',
      content: `What did one plate say to the other plate? Dinner is on me!`,
    },
    {
      name: 'Elevator',
      content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
    },
  ];
}

// 为了运行该文件（由于使用了typescript）， 安装 esbuild-register
// 然后这样运行：node --require esbuild-register prisma/seed.ts
// 为了不必每次重置数据库需要手动执行该命令，添加到 package.json 中的 prisma 字段
