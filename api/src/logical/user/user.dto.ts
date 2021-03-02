import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterInfoDTO {
  @IsNotEmpty({ message: '邮箱不能为空' })
  readonly email: string;
  @IsNotEmpty({ message: '真实姓名不能为空' })
  @IsString({ message: '真实姓名必须是 String 类型' })
  readonly name: string;
  @IsNotEmpty({  message: '密码不能为空' })
  readonly password: string;
  @IsNotEmpty({ message: '重复密码不能为空' })
  readonly repassword: string;
}

export class GetEmailCodDTO {
  @IsNotEmpty({ message: "邮箱不能为空" })
  readonly email: string;
}
