import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Headers,
  Get,
} from "@nestjs/common"
import { AuthService } from "../auth/auth.service"
import { Roles } from "../roles/roles.decorator"
import { RolesGuard } from "../roles/roles.guard"
import { UsersService, User } from "./users.service"

@Controller("users")
@UseGuards(RolesGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post("create")
  // @Roles("admin")
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body("username") username: string,
    @Body("password") password: string,
    @Body("role") role: string,
  ) {
    const newUser = await this.usersService.createUser(username, password, role)

    return {
      message: "User created successfully",
      user: {
        username: newUser.username,
        role: newUser.role,
      },
    }
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body("username") username: string,
    @Body("password") password: string,
  ) {
    const user = await this.usersService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    return this.authService.login(user)
  }

  @Get("list")
  async listUsers(): Promise<User[]> {
    const users = await this.usersService.findAll()
    return users
  }
}
