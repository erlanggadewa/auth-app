import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async login(loginDto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username: loginDto.username },
      });
      if (!user) throw new BadRequestException('User not found');
      const isMatch = await bcrypt.compare(loginDto.password, user.password);
      if (!isMatch) throw new BadRequestException('Invalid password');
      return { status: true, message: 'Login successful' };
    } catch (error) {
      throw error;
    }
  }
}
