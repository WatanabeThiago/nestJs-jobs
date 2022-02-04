import { Body, Controller, Post } from '@nestjs/common';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { ICreateUserDTO } from './dtos/create-user.dto';

@Controller('create-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducerService) {}
  @Post('/')
  async createUser(@Body() createUser: ICreateUserDTO) {
    console.log('mandou pro mandador pra fila');
    this.sendMailService.sendMail(createUser);
    return createUser;
  }
}
