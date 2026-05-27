import type { WorkflowNode } from "@h-gpt/types";
import { findOutgoingEdges } from "../edge-engine";
import type { NodeExecutor, NodeExecutionResult } from "../node-engine";
import type { WorkflowDefinition } from "../schema";

export class WorkflowExecutor {
  constructor(private readonly runNode: NodeExecutor) {}

  async run(workflow: WorkflowDefinition, startNodeId?: string) {
    const firstNode = startNodeId
      ? workflow.nodes.find((node) => node.id === startNodeId)
      : workflow.nodes[0];

    if (!firstNode) {
      return [];
    }

    const results: NodeExecutionResult[] = [];
    await this.walk(workflow, firstNode, undefined, results);
    return results;
  }

  private async walk(
    workflow: WorkflowDefinition,
    node: WorkflowNode,
    input: unknown,
    results: NodeExecutionResult[]
  ) {
    const result = await this.runNode(node, input);
    results.push(result);

    const nextEdges = findOutgoingEdges(workflow.edges, node.id);
    for (const edge of nextEdges) {
      const nextNode = workflow.nodes.find((item) => item.id === edge.target);
      if (nextNode) {
        await this.walk(workflow, nextNode, result.output, results);
      }
    }
  }
}
