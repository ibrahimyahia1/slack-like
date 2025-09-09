import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}
    
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user)
  }
 
  async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto;

    const userFromDb = await this.userRepository.findOne({ where: { email } });
    
    if (userFromDb) throw new BadRequestException("user already exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = this.userRepository.create({
      email,
      username,
      password: hashedPassword
    });

    newUser = await this.userRepository.save(newUser);

    return newUser;
  }
}
