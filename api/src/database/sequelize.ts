import { Sequelize } from 'sequelize-typescript';
import db from '../../config/db'


const sequelize = new Sequelize(
  db.mysql.database,
  db.mysql.user,
  db.mysql.password || null,
  {
    host: db.mysql.host,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    port: db.mysql.port,
    dialect: 'mysql',
    pool: {
      max: db.mysql.connectionLimit,
      min: 0,
      acquire: 30000,
      idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    },
    timezone: '+08:00' // 东八时区
  }
)
sequelize
  .authenticate()
  .then(() => {
      console.log('数据库连接成功');
    })
  .catch((err: any) => {
    console.log(err);
    throw err;
  });

export default sequelize;
