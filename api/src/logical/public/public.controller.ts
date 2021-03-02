import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import  { join } from 'path'

@Controller('public')
export class PublicController {
  // 上传图片
  @Post('uploadPic')
  @UseInterceptors(FileInterceptor('pic'))
  async uploadPic(@UploadedFile() file, @Body() body) {
    const writeImage = await createWriteStream(join(__dirname, '..', '../../public/upload', `${file.originalname}`))
    writeImage.write(file.buffer)
    return {
      code: 200,
      msg: '上传成功',
      result: {
        pic: writeImage.path
      }
    }
  }
}
