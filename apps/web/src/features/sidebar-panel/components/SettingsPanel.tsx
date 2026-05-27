import { BarChart3, Download, KeyRound, Moon, Sun, Trash2, UserRound } from "lucide-react";

export function SettingsPanel() {
  return (
    <div className="panel-section">
      <div className="settings-list">
        <article>
          <UserRound size={18} />
          <div>
            <strong>个人信息</strong>
            <span>Agent Admin · admin@h-gpt.dev</span>
          </div>
        </article>
        <article>
          <Sun size={18} />
          <div>
            <strong>主题</strong>
            <span>Light / Dark</span>
          </div>
          <button className="icon-button subtle" type="button">
            <Moon size={16} />
          </button>
        </article>
        <article>
          <KeyRound size={18} />
          <div>
            <strong>API 配置</strong>
            <span>OpenAI、Claude、DeepSeek、Qwen keys</span>
          </div>
        </article>
        <article>
          <BarChart3 size={18} />
          <div>
            <strong>Token 消耗</strong>
            <span>今日 24.8K · 本月 1.2M</span>
          </div>
        </article>
      </div>

      <div className="panel-actions">
        <button type="button">
          <Download size={16} />
          导出聊天
        </button>
        <button type="button">
          <Trash2 size={16} />
          清空数据
        </button>
      </div>
    </div>
  );
}
