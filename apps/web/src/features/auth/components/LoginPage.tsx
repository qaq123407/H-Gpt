import { Bot, Eye, EyeOff, LockKeyhole, Mail, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import type { AuthMode } from "../../../types/workbench";
import { useWorkbenchStore } from "../../../store/useWorkbenchStore";

export function LoginPage() {
  const login = useWorkbenchStore((state) => state.login);
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);

  const isRegister = mode === "register";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login();
  }

  return (
    <main className="auth-page">
      <div className="auth-background" />
      <section className="auth-panel" aria-label="H-Gpt account">
        <div className="auth-brand">
          <span className="brand-icon">
            <Bot size={24} />
          </span>
          <div>
            <strong>H-Gpt</strong>
            <span>Multi-model Agent Workspace</span>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-heading">
            <h1>{isRegister ? "创建账号" : "欢迎回来"}</h1>
            <p>{isRegister ? "注册后即可管理 Agent、知识库和模型路由。" : "登录后进入三栏 Agent 工作台。"}</p>
          </div>

          <label className="field-label">
            用户名
            <span className="input-shell">
              <Mail size={18} />
              <input name="username" placeholder="admin@h-gpt.dev" autoComplete="username" required />
            </span>
          </label>

          <label className="field-label">
            密码
            <span className="input-shell">
              <LockKeyhole size={18} />
              <input name="password" type={showPassword ? "text" : "password"} placeholder="请输入密码" autoComplete="current-password" required />
              <button className="icon-button subtle" type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password">
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>

          {isRegister ? (
            <label className="field-label">
              确认密码
              <span className="input-shell">
                <LockKeyhole size={18} />
                <input name="confirmPassword" type="password" placeholder="再次输入密码" autoComplete="new-password" required />
              </span>
            </label>
          ) : null}

          <button className="primary-button auth-submit" type="submit">
            {isRegister ? <UserPlus size={18} /> : <Bot size={18} />}
            {isRegister ? "注册并进入" : "登录"}
          </button>

          <button className="text-button" type="button" onClick={() => setMode(isRegister ? "login" : "register")}>
            {isRegister ? "已有账号，返回登录" : "没有账号，创建一个"}
          </button>
        </form>
      </section>
    </main>
  );
}
