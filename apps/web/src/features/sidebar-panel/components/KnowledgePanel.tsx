import { Database, FileUp, Plus, Search } from "lucide-react";
import { knowledgeBases } from "../../../mock/workbench";

export function KnowledgePanel() {
  return (
    <div className="panel-section">
      <div className="panel-header-row">
        <div>
          <h2>知识库</h2>
          <p>绑定到当前会话用于 RAG 检索。</p>
        </div>
        <button className="icon-button" type="button" aria-label="Create knowledge base">
          <Plus size={17} />
        </button>
      </div>

      <label className="panel-search">
        <Search size={16} />
        <input placeholder="检索测试" />
      </label>

      <div className="kb-list">
        {knowledgeBases.map((kb) => (
          <article className="kb-item" key={kb.id}>
            <Database size={18} />
            <div>
              <strong>{kb.name}</strong>
              <span>
                {kb.fileCount} 文件 · {kb.chunkCount} chunks
              </span>
            </div>
            <em>{kb.status === "ready" ? "完成" : "索引中"}</em>
          </article>
        ))}
      </div>

      <div className="upload-zone">
        <FileUp size={20} />
        <strong>上传文档</strong>
        <span>PDF、Word、Markdown、表格均可接入解析队列。</span>
      </div>

      <table className="mini-table">
        <thead>
          <tr>
            <th>文件</th>
            <th>状态</th>
            <th>分片</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Agent需求说明.pdf</td>
            <td>完成</td>
            <td>128</td>
          </tr>
          <tr>
            <td>接口清单.docx</td>
            <td>解析中</td>
            <td>42</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
