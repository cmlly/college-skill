import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('classify')
  async getClassify() {
    return await this.courseService.courseClassify()
  }


  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  async addCourse(@Body() body: any) {
    return await this.courseService.createCourse(body)
  }

  @Post('list')
  async courseList(@Body() body:any) {
    return await this.courseService.courseList(body)
  }

  @Post('detail')
  async courseDetail(@Body() body:any) {
    return await this.courseService.courseDetail(body)
  }

  @Post('edit')
  @UseGuards(AuthGuard('jwt'))
  async editCourse(@Body() body: any) {
    return await this.courseService.editCourse(body)
  }

  @Post('delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteCourse(@Body() body: any) {
    return await this.courseService.deleteCourse(body)
  }
}
