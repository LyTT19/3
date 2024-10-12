import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  forwardRef,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { AuthService } from "../auth/auth.service"
import { RolesService } from "./roles.service"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    const hasRole = () => roles.includes(user.role)
    return user && user.role && hasRole()
  }
}
