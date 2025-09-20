import { Module } from "@nestjs/common";
import { GlobalsModule } from "src/graphql/globals/globals.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./roles/roles.module";

@Module({
    imports: [
        GlobalsModule,
        UsersModule,
        AuthModule,
        RolesModule,
        
    ]
})
export class ImportsModule {}