import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDto } from './article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('create')
  async addArticle(@Body() body: ArticleDto) {
    return await this.articleService.addArticle(body)
  }

  @Post('list')
  async articleList(@Body() body: any) {
    return await this.articleService.articleList(body)
  }

  @Post('edit')
  async editArticle(@Body() body: any) {
    return await this.articleService.editArticle(body)
  }

  @Post('detail')
  async articleDetail(@Body() body: any) {
    return await this.articleService.articleDetail(body)
  }

  @Post('delete')
  async deleteArticle(@Body() body: any) {
    return await this.articleService.deleteArticle(body)
  }

  @Post('classify')
  async getClassify() {
    return await this.articleService.articleClassify()
  }
}
