import { Injectable, Inject, forwardRef } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UsersService } from "../users/users.service"

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
    token: string,
  ): Promise<any> {
    try {
      const decodedToken = this.jwtService.verify(token)
      if (!decodedToken) {
        throw new Error("Invalid token")
      }
    } catch (error) {
      throw new Error("Invalid token")
    }

    const user = await this.usersService.validateUser(username, password)
    if (user) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
