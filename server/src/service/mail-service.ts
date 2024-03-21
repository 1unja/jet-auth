import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import dotenv from 'dotenv'

class mailService {
    private readonly transporter: nodemailer.Transporter;
    
    constructor() {
        dotenv.config()
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || '' ,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || '',
                pass: process.env.SMTP_PASSWORD || ''
            }
        } )
    }
    
    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({ 
            from: process.env.SMPT_USER,
            to,
            subject: 'Acount activation' + process.env.API_URL,
            text: 'link: ' + link,
            html:
                `
                    <div>
                        <h1> For activation follow the link</h1>
                        <a href="${link}">${link} </a>
                    </div>

                `
        })
    }
}

export default new mailService