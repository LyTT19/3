import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { RolesModule } from "./roles/roles.module"
import { UsersModule } from "./users/users.module"
import { APP_GUARD } from "@nestjs/core"
import { RolesGuard } from "./roles/roles.guard"

@Module({
  imports: [AuthModule, RolesModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
