import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize';
import sequelize from '../../database/sequelize';
import { makeSalt, encryptPassword } from '../../utils/cryptogram';
import { getRandomCode, getRandomUser } from '../../utils/random';
import { MailerService } from '@nestjs-modules/mailer';
import { CacheService } from '../../database/cache.service';

@Injectable()
export class UserService {
  constructor(private mailerService: MailerService, private cacheService: CacheService) {
  }

  /**
   * 查询是否有该用户
   * @param email 邮箱
   */
  async findOne(email: string): Promise<any | undefined> {
    const sql = `
      SELECT
         id, name, username, password,password_salt salt, email, role_id roleId
      FROM
        user
      WHERE
        email = '${email}'
    `;
    try {
      return (await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, //查询
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台，默认为 true
        })
      )[0];
    } catch (e) {
      console.log(e);
      return void 0;
    }
  }

  /**
   * 注册
   * @param requestBody 请求体
   */
  async register(requestBody: any): Promise<any> {
    const username = getRandomUser();
    const { name, password, repassword, email, code } = requestBody;
    const result = await this.cacheService.get('emailCode');
    if (code != result) {
      return {
        code: 400,
        msg: '验证码错误',
      };
    }
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(email);
    if (user) {
      return {
        code: 400,
        msg: '该邮箱已存在',
      };
    }
    const salt = makeSalt(); //制作密码salt
    const hashPwd = encryptPassword(password, salt); // 加密密码
    const registerSql = `
      INSERT INTO user
        (name, username, password, email, password_salt, role_id, creator_id, avatar, status, deleted )
      VALUES
        ('${name}', '${username}', '${hashPwd}', '${email}', '${salt}', 'user', 'admin', 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png', 1, 0 )
    `;
    try {
      await sequelize.query(registerSql, { logging: false });
      return {
        code: 200,
        msg: '注册成功',
      };
    } catch (e) {
      return {
        code: 500,
        msg: e,
      };
    }
  }

  /**
   * 邮箱发送验证码并验证
   */
  async getEmailCode(email: any): Promise<any> {
    // const randomCode = getRandomCode()
    // await this.cacheService.set('emailCode', randomCode, 600)
    // **********************测试环境，不发送真的验证码*******************
    await this.cacheService.set('emailCode', 123456, 600);
    return {
      code: 200,
      msg: '发送成功，测试验证码为123456',
    };
    // **********************测试环境，不发送真的验证码*******************
    // try {
    //   await this
    //           .mailerService
    //           .sendMail({
    //             to: email.email,
    //             from: 'mlchencheerup@163.com',
    //             subject: '请查收您的验证码',
    //             html: `
    //                     <div>
    //                       <span>您的验证码为:</span>
    //                       <span style="color: #722ED1;font-size: 16px">${randomCode}<div>
    //                     </div>
    //                     <div style="text-align: right; color: #222222">--来自大学生技能培训官方</div>
    //                   `
    //           })
    //   return {
    //     code: 200,
    //     msg: '验证码发送成功，请注意查收'
    //   }
    // }catch (err) {
    //   throw err;
    // }
  }

  // 获取用户信息
  async getUserInfo(email: string): Promise<any> {
    const sql = `
      SELECT
         id, name, username, avatar, email, role_id roleId, role
      FROM
        user
      WHERE
        email = '${email}'
    `;
    try {
      const res = await sequelize.query(sql, {
        logging: false,
        type: Sequelize.QueryTypes.SELECT, //查询
        raw: true, // 是否使用数组组装的方式展示结果
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const roleId = res[0].roleId;
      const roleSql = `
          SELECT
            id, name, 'describe', status, creator_id creatorId, deleted, permissions
          FROM
            role
          WHERE
            id = '${roleId}'
        `;
      try {
        const roleRes = await sequelize.query(roleSql, {
          logging: false,
          type: Sequelize.QueryTypes.SELECT, //查询
          raw: true, // 是否使用数组组装的方式展示结果
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res[0].role = roleRes[0];
        return {
          code: 200,
          msg: '查询成功',
          result: res[0],
        };
      } catch (e) {
        return {
          code: 500,
          msg: e,
        };
      }
    } catch(e) {
    return {
      code: 500,
      msg: e,
    };
  }
}

  // 获取用户列表
  async getUserList(body: any): Promise<any> {
    const { pageIndex = 1, pageSize= 10, classify } = body;
    const currentIndex = ( pageIndex - 1 ) * pageSize < 0 ? 0 : ( pageIndex - 1 ) * pageSize;
    const sql =  `SELECT * FROM user LIMIT ${currentIndex}, ${pageSize}`
    const list = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })
    // 总条数
    const countSql = `
        SELECT
          COUNT(*) AS total
        FROM
          course
      `
    const count: any = (
      await sequelize.query(countSql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false
      })
    )[0]
    return {
      code: 200,
      result: {
        data: list,
        total: count.total,
        pageNo: pageIndex,
        lastPageNo: Math.ceil(count.total / pageSize)
      },
      msg: '查询成功'
    }
  }

}
