import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('presigned-url')
  generateUploadUrl(@Body('filename') filename: string) {
    return this.uploadService.generateUploader(filename);
  }
}
