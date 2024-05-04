import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { CurrentToken, CurrentUser } from './interfaces';
import { Token, User } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy ) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto){
    return this.client.send('auth.register.user',registerUserDto).pipe(catchError(error=>{
      throw new RpcException(error);
    }))
  }
  @Post('login')
  loginUser(@Body() loginuserDto: LoginUserDto){
    return this.client.send('auth.login.user',loginuserDto).pipe(catchError(error=>{
      throw new RpcException(error);
    }))
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@User() user: CurrentUser, @Token() token: CurrentToken){

    // const user = req['user'];
    // const token = req['token'];
     return {user, token}
  
    return this.client.send('auth.verify.user',{}).pipe(catchError(error=>{
      throw new RpcException(error);
    }))
  }
}
