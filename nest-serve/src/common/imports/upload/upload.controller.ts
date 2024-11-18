import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiResponse, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UploadDto, UploadResDto } from './upload.dto';
import { UploadService } from './upload.service';

@ApiTags('上传文件')
@Controller('upload')
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
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadServer(@UploadedFile() file) {
    await this.uploadService.verify(file);
    const url = this.uploadHost + file.path.split('uploads')[1];
    return { url };
  }
}
