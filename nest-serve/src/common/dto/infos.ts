import { DtoParam } from '../tools';
import { INFOS_STATUS } from '../entity/infos';

// ------------------------ 基础信息 ------------------------ //

export class BasicInfoQueryDto {
  @DtoParam('标题', { required: false })
  title?: string;

  @DtoParam('状态', { enum: INFOS_STATUS, isInt: true, required: false })
  status?: number;
}

export class BasicInfoCreateDto {
  @DtoParam('标题')
  title: string;

  @DtoParam('图标', { required: false })
  icon?: string;

  @DtoParam('优先级', { isInt: true, required: false })
  priority: number;

  @DtoParam('状态', { enum: INFOS_STATUS, isInt: true })
  status: number;
}

export class BasicInfoUpdateDto extends BasicInfoCreateDto {}

// ------------------------ 基础信息 ------------------------ //

// ------------------------ 信息分类 ------------------------ //

export class CategoryInfoQueryDto extends BasicInfoQueryDto {
  @DtoParam('上级ID', { required: false })
  parentId?: string;
}

export class CategoryInfoCreateDto extends BasicInfoCreateDto {
  @DtoParam('上级ID', { required: false })
  parentId?: string;
}

export class CategoryInfoUpdateDto extends CategoryInfoCreateDto {}

// ------------------------ 信息分类 ------------------------ //

// ------------------------ 文章信息 ------------------------ //

export class ArticleInfoQueryDto extends BasicInfoQueryDto {
  @DtoParam('简介', { required: false })
  summary?: string;

  @DtoParam('内容', { required: false })
  content?: string;
}

export class ArticleInfoCreateDto extends BasicInfoCreateDto {
  @DtoParam('图组', { required: false })
  pictureGroup?: string[];

  @DtoParam('简介', { required: false })
  summary?: string;

  @DtoParam('内容', { required: false })
  content?: string;

  @DtoParam('热度', { isInt: true, required: false })
  hot: number;
}

export class ArticleInfoUpdateDto extends ArticleInfoCreateDto {}

// ------------------------ 文章信息 ------------------------ //