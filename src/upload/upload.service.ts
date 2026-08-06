import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class UploadService {
  constructor(private readonly minioService: MinioService) {}
  async generateUploader(filename: string) {
    const bucket = process.env.MINIO_BUCKET!;
    const extension = filename.split('.').pop();
    const objectName = `${randomUUID()}.${extension}`;
    const uploadUrl = await this.minioService
      .getClient()
      .presignedPutObject(bucket, objectName, 600);
    return {
      objectName,
      uploadUrl,
    };
  }
}
