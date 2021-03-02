import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from '../../utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  // JWT验证 - Step 2: 校验用户信息
  async validateUser(email: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');
    const user = await this.userService.findOne(email);
    if(user) {
      const hashedPassword = user.password;
      const salt = user.salt;
      // 通过密码盐，加密传参，再与数据库里的比较，判断是否相等
      const hashPassword = encryptPassword(password, salt);
      if (hashedPassword === hashPassword) {
        //密码匹配
        return {
          code: 1,
          user
        };
      } else {
        return {
          code: 2,
          user: null
        };
      }
    }
    // 查无此人
    return {
      code: 3,
      user: null
    }
  }

  // JWT验证 - Step 3: 处理 jwt 签证
  async certificate(user: any) {
    const payload = {
      email: user.email,
      username: user.username
    };
    console.log('JWT验证 - Step 3: 处理 jwt 签证');
    try {
      const token = await this.jwtService.sign(payload);
      return {
        code: 200,
        result: { token },
        msg: '登录成功'
      }
    } catch (e) {
      return {
        code: 600,
        msg: '账号或密码错误'
      }
    }
  }
}
