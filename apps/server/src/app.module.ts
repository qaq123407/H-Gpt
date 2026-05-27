import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AgentModule } from "./modules/agent/agent.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ChatModule } from "./modules/chat/chat.module";
import { FileModule } from "./modules/file/file.module";
import { KnowledgeModule } from "./modules/knowledge/knowledge.module";
import { WorkflowModule } from "./modules/workflow/workflow.module";
import { HealthController } from "./common/health.controller";
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ["../../.env", ".env"],
      isGlobal: true
    }),
    DatabaseModule,
    AuthModule,
    AgentModule,
    WorkflowModule,
    KnowledgeModule,
    FileModule,
    ChatModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
