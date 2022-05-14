import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e9f519ebf9fbe5",
    pass: "cfae859664b45c"
  }
});


export class NodemailerMailAdapter implements MailAdapter {
  async sendMain({ subject, body }: SendMailData): Promise<void> {
    await transport.sendMail({
    from: 'Feedback Team <feedback@team.com>',
    to: 'Larissa Oliveira<oliveir5uwm@gmail.com>',
    subject,
    html: body,
  });
  }
}
