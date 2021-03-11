import { Injectable } from '@nestjs/common';
import sequelize from '../../database/sequelize';
import * as Sequelize from 'sequelize';

@Injectable()
export class ArticleService {
  // 查询文章列表
  async articleList(body: any): Promise<any> {
    const { pageIndex = 1, pageSize = 10  } = body;
    // 分页查询
    const currentIndex = ( pageIndex - 1 ) * pageSize < 0 ? 0 : ( pageIndex - 1 ) * pageSize;
    const sql = `
        SELECT
          id, title, description, classify, create_by createBy, cover, content,
           DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime
        FROM  
          article
        ORDER BY
          id
        LIMIT ${currentIndex}, ${pageSize}
     `;
    const articleList: any[] = await sequelize.query(sql,{
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })

    // 总条数
    const countSql = `
        SELECT
          COUNT(*) AS total
        FROM
          article
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
        data: articleList,
        total: count.total,
        pageNo: pageIndex,
        lastPageNo: Math.ceil(count.total / pageSize)
      },
      msg: '查询成功'
    }

  }


  // 新增文章接口
  async addArticle(body: any): Promise<any> {
    const { title, description, classify, cover, content } = body;
    const sql = `
      INSERT INTO article
        (title, description, classify, create_by, cover, content)
      VALUES
        ('${title}', '${description}', '${classify}', '大学生神秘小楚', '${cover}', '${content}')  
     `;
    await sequelize.query(sql, { logging: false })
    return {
      code: 200,
      msg: '新增文章成功'
    }
  }

  // 查看文章详情
  async articleDetail(body: any): Promise<any> {
    const { id } = body;
    const sql = `
        SELECT
          id, title, description, classify, create_by createBy, cover, content,
           DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') createTime
        FROM
          article
        WHERE
          id = ${id}
      `;
      const detail = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: false
      });
      return {
        code: 200,
        result: detail[0],
        msg: '查询成功'
      }
  }

  // 编辑文章
  async editArticle(body: any): Promise<any> {
    const { id, title, description, classify, cover, content } = body;
    const sql = `
        UPDATE
          article
        SET
          title = '${title}',
          description = '${description}',
          classify = '${classify}',
          cover = '${cover}',
          content = '${content}'
        WHERE
          id = ${id}
      `;
    // const transaction = await sequelize.transaction()
    await sequelize.query(sql, { logging: false });
    return {
      code: 200,
      msg: '编辑文章成功'
    }
  }

  // 删除文章
  async deleteArticle(body: any): Promise<any> {
    const { id } = body;
    const sql = `
        DELETE FROM
         article
        WHERE
          id = ${id}
      `;
    await sequelize.query(sql, { logging: false })
    return {
      code: 200,
      msg: '删除成功'
    }
  }

  // 文章分类接口
  async articleClassify(): Promise<any> {
    const sql =
      `
        SELECT
          name
        FROM
          article_classify     
      `;
    const classify = await sequelize.query(sql, {
      type: Sequelize.QueryTypes.SELECT,
      raw: true,
      logging: false
    })
    return {
      code: 200,
      result: {
        classify
      },
      msg: '查询成功'
    }
  }

}
