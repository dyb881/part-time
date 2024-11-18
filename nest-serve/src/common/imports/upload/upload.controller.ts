import { Controller, Get, Post, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UploadDto, UploadResDto, OSSSTSOptionsDto, OSSValidateDto, OSSPutObjectDto } from './upload.dto';
import { UploadService } from './upload.service';

@ApiTags('上传文件')
@Controller()
export class UploadController {
  uploadHost: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly uploadService: UploadService,
  ) {
    this.uploadHost = this.configService.get('uploadHost');
  }

  @ApiOperation({ summary: '上传到服务器' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDto })
  @ApiResponse({ status: 200, type: UploadResDto })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadServer(@UploadedFile() file) {
    this.uploadService.verify(file);
    const url = this.uploadHost + file.path.split('uploads')[1];
    return { url };
  }

  @ApiOperation({ summary: '获取临时授权(15分钟有效期，尽量在14分钟内获取新的授权)' })
  @ApiResponse({ status: 200, type: OSSSTSOptionsDto })
  @Get('oss/sts')
  getSTS() {
    return this.uploadService.getSTS();
  }

  @ApiOperation({ summary: '获取OSS上传对象' })
  @ApiResponse({ status: 200, type: OSSPutObjectDto })
  @Get('oss/put/object')
  async getPutObject(@Query() { name, size }: OSSValidateDto) {
    this.uploadService.verify({ name, size });
    return this.uploadService.getPutObject(name);
  }
}
