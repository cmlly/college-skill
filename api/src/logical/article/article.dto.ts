import { IsNotEmpty } from 'class-validator';

export class ArticleDto {
  @IsNotEmpty({ message: '标题不能为空' })
  readonly title: string;
  @IsNotEmpty({ message: '新闻摘要不能为空' })
  readonly description: string;
  @IsNotEmpty({  message: '新闻分类不能为空' })
  readonly classify: string;
  @IsNotEmpty({ message: '创建者不能为空' })
  readonly createBy: string;
  @IsNotEmpty({ message: '封面照片不能为空' })
  readonly cover: string;
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string;
}
