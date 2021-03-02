import { Module } from '@nestjs/common';
// import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CacheService } from '../../database/cache.service';

@Module({
  // controllers: [UserController],
  providers: [UserService, CacheService],
  exports: [UserService]
})
export class UserModule {}
