import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileLimit } from './upload.dto';
import { promises as fs } from 'fs';
import { findKey } from 'lodash';
import { extname } from 'path';

export type verifyOptions = {
  originalname?: string;
  name?: string; // 文件名
  size: number; // 文件大小
  path?: string; // 文件路径
};

/**
 * 文件上传
 */
@Injectable()
export class UploadService {
  fileLimit: FileLimit; // 文件限制配置

  constructor(private readonly configService: ConfigService) {
    this.fileLimit = this.configService.get<FileLimit>('fileLimit');
  }

  /**
   * 验证文件
   */
  verify({ originalname, name = originalname, size, path }: verifyOptions) {
    let error;

    if (!name) error = '请上传有效文件';

    const suffix = extname(name).slice(1);
    const fileLimitKey = findKey(this.fileLimit, { suffixs: [suffix] });
    if (!fileLimitKey) error = '禁止上传该类型文件';

    const fileLimit = this.fileLimit[fileLimitKey];
    if (size > fileLimit.maxSizeMB * 1024 * 1024) error = `${fileLimit.name}文件大小不能大于 ${fileLimit.maxSizeMB} MB`;

    if (error) {
      path && this.delete(path);
      throw new UnsupportedMediaTypeException(error);
    }
  }

  /**
   * 删除文件
   */
  async delete(path: string) {
    try {
      await fs.unlink(path);
    } catch {}
  }
}
