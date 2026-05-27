import { Activity, Bot, Database, GitBranch } from "lucide-react";
import { StatCard } from "../components/StatCard";

const stats = [
  { title: "智能体", value: "12", icon: Bot },
  { title: "工作流", value: "8", icon: GitBranch },
  { title: "知识库", value: "5", icon: Database },
  { title: "今日请求", value: "1,284", icon: Activity }
];

export function DashboardPage() {
  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>控制台</h1>
          <p>统一管理智能体、知识库、工作流和模型调用。</p>
        </div>
      </header>
      <div className="stat-grid">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>
      <div className="workspace-panel">
        <h2>初始化完成</h2>
        <p>当前项目已经具备前端、后端、模型网关、worker 和公共包的基础工程结构。</p>
      </div>
    </section>
  );
}
