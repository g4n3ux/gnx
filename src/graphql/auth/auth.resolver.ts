import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String, { description: 'Login de usuario. Devuelve JWT' })
  async login(
    @Args('user_name') user_name: string,
    @Args('password') password: string,
  ): Promise<string> {
    const user = await this.authService.validateUser(user_name, password);
    const token = await this.authService.login(user);
    return token.access_token;
  }
}
