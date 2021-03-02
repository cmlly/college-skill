// JWT的验证策略
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }
  // JWT调用
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(payload: any) {
    console.log('JWT验证 - Step 4: 被守卫调用');
    return {
      email: payload.email,
      username: payload.username,
    };
  }

}
