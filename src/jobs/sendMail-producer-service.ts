import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ICreateUserDTO } from 'src/create-user/dtos/create-user.dto';
import { Queue } from 'bull';

@Injectable()
class SendMailProducerService {
  constructor(
    @InjectQueue('sendMail-queue')
    private queue: Queue,
  ) {}
  async sendMail(createUserDTO: ICreateUserDTO) {
    console.log('fila recebeu');
    await this.queue.add('sendMail-job', createUserDTO, {
      delay: 5000,
    });
  }
}

export { SendMailProducerService };
