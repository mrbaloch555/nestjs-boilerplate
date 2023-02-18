import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/fileUpload/multer';
import { CreateUserDto } from 'src/users/dtos/creeate-user.dto';
import { UserLoginDto } from 'src/users/dtos/login-user.dto';
import { PublicUserDto } from 'src/users/dtos/user.dto';
import { AuthService } from './auth.service';
import { Serialize } from './interceptors/serialiaze-interceptor';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UseInterceptors(FileInterceptor('photoPath', multerOptions))
  register(@UploadedFile('file') file, @Body() body: CreateUserDto) {
    console.log(body);
    if (file) {
      body.photoPath = file.filename;
    }
    return this.authService.register(body);
  }

  @Post('/login')
  login(@Body() body: UserLoginDto) {
    return this.authService.login(body);
  }
}
