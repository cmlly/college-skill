import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize';
import * as Sequelize from 'sequelize';

@Injectable()
export class CourseService {

  // 查询课程分类
  async courseClassify(): Promise<any> {
    const sql = `SELECT * FROM course_classify`;
    const classify = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })
    return {
      code: 200,
      result: { classify },
      msg: '查询成功'
    }
  }
}
