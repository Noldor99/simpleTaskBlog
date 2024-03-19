import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'
import * as sharp from 'sharp'
import { isURL } from 'class-validator'

export enum FileType {
  USER = 'userImg',
  ABOUT = 'aboutImg',
}

const isDevelopment = process.env.NODE_ENV === 'development'

@Injectable()
export class FilesService {
  async createPostImage(type: FileType, image): Promise<string> {
    try {
      if (isURL(image)) {
        return image;
      }
      const fileName = `${uuid.v4()}.${image.mimetype.split('/')[1]}`
      const filePath = path.resolve(__dirname, '..', 'static', type)
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }
      const resizedImageBuffer = await sharp(image.buffer)
        .resize({
          width: 1500,
          height: 1500,
          fit: 'cover',
          withoutEnlargement: true,
        })
        .toBuffer()

      fs.writeFileSync(path.join(filePath, fileName), resizedImageBuffer)

      const baseUrl = isDevelopment
        ? `http://localhost:${process.env.PORT}/api`
        : `${process.env.PRODACTION_URL}/api`

      return `${baseUrl}/${type}/${fileName}`
    } catch (e) {
      throw new HttpException('File error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async updatePostImage(
    fileUrl: string,
    fileType: FileType,
    newImage,
  ): Promise<string> {
    try {

      let fileName

      if (!fileUrl) {
        fileName = uuid.v4() + '.jpg';
      } else if (fileUrl.startsWith('http')) {
        fileName = uuid.v4() + '.jpg';
      } else {
        fileName = fileUrl.split('/').pop()
      }

      const filePath = path.resolve(__dirname, '..', 'static', fileType)

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }

      const resizedImageBuffer = await sharp(newImage.buffer)
        .resize({
          width: 1500,
          height: 1500,
          fit: 'cover',
          withoutEnlargement: true,
        })
        .toBuffer()

      fs.writeFileSync(path.join(filePath, fileName), resizedImageBuffer)

      const baseUrl = isDevelopment
        ? `http://localhost:${process.env.PORT}/api`
        : `${process.env.PRODACTION_URL}/api`

      return `${baseUrl}/${fileType}/${fileName}`
    } catch (e) {
      throw new HttpException('File error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteFile(fileUrl: string, fileType: FileType): Promise<void> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static', fileType)
      const fileName = fileUrl.split('/').pop()
      const fileFullPath = path.join(filePath, fileName)

      if (fs.existsSync(fileFullPath)) {
        fs.unlinkSync(fileFullPath)
      }
    } catch (e) {
      console.error(`Error deleting ${fileType} file:`, e.message)
    }
  }
}
