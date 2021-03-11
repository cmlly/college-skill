import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { CommodityModule } from './logical/commodity/commodity.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { RedisModule } from 'nestjs-redis'
import { ArticleModule } from './logical/article/article.module';
import { PublicModule } from './logical/public/public.module';
import { CourseModule } from './logical/course/course.module';

@Module({
  imports:
    [
      UserModule,
      AuthModule,
      CommodityModule,
      MailerModule.forRoot({
        transport: {
          host: "smtp.163.com",
          port: "465",
          auth: {
            user: "mlchencheerup@163.com",
            pass: "MSJHKKZZOYNLQRWN"
          }
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        from: '"mlchen" <mlchencheerup@163.com>'
      }),
      RedisModule.register({
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 0
      }),
      ArticleModule,
      PublicModule,
      CourseModule
    ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
