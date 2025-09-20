import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String) // devolvemos el token como string
  async login(@Args('loginInput') loginInput: LoginInput): Promise<string> {
    const user = await this.authService.validateUser(
      loginInput.username,
      loginInput.password,
    );
    const token = await this.authService.login(user);
    return token.access_token;
  }
}
