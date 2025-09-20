import { Module } from "@nestjs/common";
import { GlobalsModule } from "src/graphql/globals/globals.module";

@Module({
    imports: [
        GlobalsModule
    ]
})
export class ImportsModule {}