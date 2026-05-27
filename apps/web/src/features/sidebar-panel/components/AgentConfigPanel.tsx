import { BrainCircuit, Globe2, Wrench } from "lucide-react";

export function AgentConfigPanel() {
  return (
    <div className="panel-section">
      <div className="panel-header-row">
        <div>
          <h2>Agent 配置</h2>
          <p>系统 Prompt、采样参数和工具能力。</p>
        </div>
        <BrainCircuit size={22} />
      </div>

      <label className="config-field">
        System Prompt
        <textarea rows={6} defaultValue="你是 H-Gpt 工作台中的高级 Agent，擅长任务拆解、工具调用、知识库检索和代码实现。" />
      </label>

      <label className="config-field">
        Temperature
        <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" />
      </label>

      <label className="config-field">
        Max Tokens
        <input type="number" defaultValue={4096} min={256} step={256} />
      </label>

      <label className="config-field">
        绑定知识库
        <select defaultValue="kb-1">
          <option value="kb-1">产品文档库</option>
          <option value="kb-2">研发规范库</option>
          <option value="kb-3">客户案例库</option>
        </select>
      </label>

      <div className="toggle-list">
        <label>
          <input type="checkbox" defaultChecked />
          <span>
            <Wrench size={16} />
            工具调用
          </span>
        </label>
        <label>
          <input type="checkbox" />
          <span>
            <Globe2 size={16} />
            联网搜索
          </span>
        </label>
      </div>
    </div>
  );
}
