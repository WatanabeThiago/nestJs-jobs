import {
  InjectQueue,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { ICreateUserDTO } from 'src/create-user/dtos/create-user.dto';

import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';
@Processor('sendMail-queue')
class SendMailConsumerService {
  constructor(private mailService: MailerService) {}
  @Process('sendMail-job')
  async sendMailJob(job: Job<ICreateUserDTO>) {
    const { data } = job;
    console.log('vai enviar');
    await this.mailService.sendMail({
      to: data.email,
      from: 'Equipe Code/Drops <codedrops@codedrops.com.br>',
      subject: 'Seja bem vindo(a)!',
      text: `Olá ${data.name}, seu cadastro foi realizado com sucesso. Seja bem vindo(a)!`,
    });
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Email: ${job.data.email} enviado`);
  }

  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`Email: ${job.data.email} em progresso`);
  }

  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`Email: ${job.data.email} em ativo`);
  }
}

export { SendMailConsumerService };
