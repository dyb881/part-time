import { ApiProperty } from '@nestjs/swagger';

/**
 * 文件限制配置
 */
export class FileLimitItem {
  name: string; // 文件类型名称
  maxSizeMB: number; // 最大尺寸 M
  suffixs: string[]; // 后缀名
}

/**
 * 文件限制列表
 */
export class FileLimit {
  [key: string]: FileLimitItem;
}

/**
 * 文件上传数据
 */
export class UploadDto {
  @ApiProperty({ description: '上传文件', type: 'string', format: 'binary' })
  file: any;
}

/**
 * 上传后响应数据
 */
export class UploadResDto {
  @ApiProperty({ description: '访问地址' })
  url: string;
}

/**
 * OSS 临时授权配置
 */
export class OSSSTSOptionsDto {
  accessKeyId: string;
  accessKeySecret: string;
  stsToken: string;
  region: string;
  bucket: string;
}

/**
 * OSS 验证属性
 */
export class OSSValidateDto {
  @ApiProperty({ description: '文件名' })
  name: string;

  @ApiProperty({ description: '文件大小' })
  size: number;
}

/**
 * OSS 上传对象属性
 */
export class OSSPutObjectDto extends UploadResDto {
  @ApiProperty({ description: 'OSS对象名称' })
  name: string;
}
