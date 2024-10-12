import { Module, forwardRef } from "@nestjs/common"
import { RolesService } from "./roles.service"
import { RolesGuard } from "./roles.guard"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [RolesService, RolesGuard],
  exports: [RolesService],
})
export class RolesModule {}
