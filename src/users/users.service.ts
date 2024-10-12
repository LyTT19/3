import { Injectable, BadRequestException } from "@nestjs/common"
import * as bcrypt from "bcrypt"

export interface User {
  username: string
  password: string
  role: string
}

@Injectable()
export class UsersService {
  private readonly users: User[] = []

  async createUser(
    username: string,
    password: string,
    role: string,
  ): Promise<User> {
    const existingUser = this.users.find((user) => user.username === username)
    if (existingUser) {
      throw new BadRequestException("Username já está em uso.")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: User = { username, password: hashedPassword, role }
    this.users.push(newUser)
    return newUser
  }

  async findAll(): Promise<User[]> {
    return this.users
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username)
    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return null
    }

    return user
  }
}
