import { Globe2, Image, PenLine } from "lucide-react";

type WelcomeStateProps = {
  onPrompt: (prompt: string) => void;
};

const promptActions = [
  { label: "生成图片", prompt: "帮我生成一张产品宣传图。", icon: Image },
  { label: "撰写或编辑", prompt: "帮我优化这段文案。", icon: PenLine },
  { label: "查找资料", prompt: "帮我整理这个主题的关键资料。", icon: Globe2 }
];

export function WelcomeState({ onPrompt }: WelcomeStateProps) {
  return (
    <section className="welcome-state">
      <h1>你在忙什么？</h1>
      <div className="welcome-actions">
        {promptActions.map((action) => {
          const Icon = action.icon;
          return (
            <button key={action.label} type="button" onClick={() => onPrompt(action.prompt)}>
              <Icon size={18} />
              {action.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
