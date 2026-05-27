import { Controller, Get } from "@nestjs/common";
import { WorkflowService } from "./workflow.service";

@Controller("workflows")
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get()
  findAll() {
    return this.workflowService.findAll();
  }
}
