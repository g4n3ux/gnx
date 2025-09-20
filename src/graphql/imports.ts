import { Module } from "@nestjs/common";
import { GlobalsModule } from "src/graphql/globals/globals.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        GlobalsModule,
        UsersModule,
    ]
})
export class ImportsModule {}