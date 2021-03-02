import { Controller, Post, Body, UseGuards, UsePipes, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
// import { ValidationPipe } from '../../pipe/validation.pipe';
import { GetEmailCodDTO, RegisterInfoDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}

  // JWT验证 - Step 1: 用户请求登录
  @Post('login')
  async login(@Body() loginParams: any) {
    const authResult = await this.authService.validateUser(
      loginParams.email,
      loginParams.password
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: '账号或密码不正确'
        };
      default:
        return {
          code: 600,
          result: '',
          msg: '系统检测到您尚未注册'
        }
    }
  }

  @Post('findOne')
  findOne(@Body() body: any) {
    return this.userService.findOne(body.username);
  }

  // 注册
  // @UseGuards(AuthGuard('jwt'))
  // @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) {
    return await this.userService.register(body)
  }

  // 获取验证码
  @Post('getEmailCode')
  async getEmailCode(@Body() body: GetEmailCodDTO) {
    return await this.userService.getEmailCode(body)
  }

  // 获取用户信息
  @UseGuards(AuthGuard('jwt'))
  @Post('userInfo')
  async getUserInfo(@Request() req) {
    return await this.userService.getUserInfo(req.user.email)
  }
}
