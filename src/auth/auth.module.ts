import { Module, forwardRef } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"
import { UsersModule } from "../users/users.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthController } from "./auth.controller"

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRATION") },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
