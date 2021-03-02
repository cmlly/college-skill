import { Body, Controller, Post, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { CommodityService } from './commodity.service';
import { AuthGuard } from '@nestjs/passport';
// import { RbacInterceptor } from '../../interceptor/rbac.interceptor';
import { roleConstants as role } from '../auth/constant';
import { RbacGuard } from '../../guards/rbac.guard';

@Controller('commodity')
export class CommodityController {
  constructor(private commodityService: CommodityService) {}

  // 查询商品列表
  @UseGuards(new RbacGuard(role.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.HUMAN)) // 调用RBAC拦截器
  @Post('list')
  async queryColumnList(@Body() body: any) {
    return await this.commodityService.queryCommodityList(body)
  }

  // 新建商品
  @UseGuards(new RbacGuard(role.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.HUMAN))
  @Post('create')
    async createCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.createCommodity(body, req.user.username);
  }

  // 修改商品
  @UseGuards(new RbacGuard(role.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.ADMIN))
  @Post('update')
  async updateCommodity(@Body() body: any, @Request() req: any) {
   return await this.commodityService.updateCommodity(body, req.user.username);
  }

  // 删除商品
  @UseGuards(new RbacGuard(role.SUPER_ADMIN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(role.SUPER_ADMIN))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commodityService.deleteCommodity(body);
  }
}
