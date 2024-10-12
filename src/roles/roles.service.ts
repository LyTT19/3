import { Injectable } from "@nestjs/common"

@Injectable()
export class RolesService {
  private readonly roles = {
    admin: ["create", "read", "update", "delete"],
    user: ["read"],
  }

  getPermissions(role: string): string[] {
    return this.roles[role] || []
  }
}
