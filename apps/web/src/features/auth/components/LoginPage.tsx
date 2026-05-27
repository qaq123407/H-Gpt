import { ArrowRight, Building2, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserPlus } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { AuthMode } from "../../../types/workbench";
import { useWorkbenchStore } from "../../../store/useWorkbenchStore";

type AccessRole = "admin" | "member";

const roles: Array<{ id: AccessRole; label: string; description: string }> = [
  { id: "admin", label: "管理员", description: "成员、Agent、知识库管理" },
  { id: "member", label: "成员", description: "会话、文件与工作流使用" }
];

export function LoginPage() {
  const login = useWorkbenchStore((state) => state.login);
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("admin@h-gpt.dev");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<AccessRole>("member");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const isRegister = mode === "register";

  const passwordScore = useMemo(() => {
    return [password.length >= 8, /[A-Z]/.test(password), /\d/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
  }, [password]);

  function validate() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "请输入有效的邮箱";
    }

    if (password.length < 8) {
      return "密码至少需要 8 位";
    }

    return "";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = validate();
    setError(message);

    if (!message) {
      login();
    }
  }

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError("");
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-label="H-Gpt account">
        <aside className="auth-showcase">
          <div className="auth-logo-row">
            <img src="/h-gpt-logo.svg" alt="H-Gpt" />
            <div>
              <strong>H-Gpt</strong>
              <span>Enterprise Agent Workspace</span>
            </div>
          </div>
          <p className="auth-slogan">
            让复杂工作，变得简单。H-Gpt 将知识、工具和模型协同起来，让 AI 成为你的工作搭档。从一个问题开始，把想法变成可执行的结果，让每一次提问都更接近答案，简化流程，放大创造力。
          </p>
        </aside>

        <section className="auth-panel">
          <div className="auth-tabs" role="tablist" aria-label="Auth mode">
            <button className={!isRegister ? "active" : ""} type="button" onClick={() => switchMode("login")}>
              登录
            </button>
            <button className={isRegister ? "active" : ""} type="button" onClick={() => switchMode("register")}>
              注册
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-heading">
              <h2>{isRegister ? "创建账号" : "欢迎回来"}</h2>
              <p>{isRegister ? "完成安全校验后进入 H-Gpt 工作台。" : "使用邮箱继续访问 H-Gpt。"}</p>
            </div>

            <label className="field-label">
              邮箱
              <span className="input-shell">
                <Mail size={18} />
                <input value={email} type="email" placeholder="name@company.com" autoComplete="email" onChange={(event) => setEmail(event.target.value)} required />
              </span>
            </label>

            <label className="field-label">
              密码
              <span className="input-shell">
                <LockKeyhole size={18} />
                <input
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button className="icon-button subtle" type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password">
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
            </label>

            <div className="password-policy" aria-label="Password strength">
              <span style={{ width: `${Math.max(passwordScore, 1) * 25}%` }} />
            </div>

            <fieldset className="role-entry">
              <legend>
                <Building2 size={16} />
                权限入口
              </legend>
              {roles.map((item) => (
                <label className={role === item.id ? "active" : ""} key={item.id}>
                  <input type="radio" name="role" value={item.id} checked={role === item.id} onChange={() => setRole(item.id)} />
                  <span>
                    <strong>{item.label}</strong>
                    <em>{item.description}</em>
                  </span>
                </label>
              ))}
            </fieldset>

            <div className="auth-options">
              <label>
                <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
                记住此设备
              </label>
              <button type="button">忘记密码？</button>
            </div>

            {error ? <div className="auth-error">{error}</div> : null}

            <button className="primary-button auth-submit" type="submit">
              {isRegister ? <UserPlus size={18} /> : <ShieldCheck size={18} />}
              {isRegister ? "创建账号" : "安全登录"}
              <ArrowRight size={18} />
            </button>

            <button className="text-button" type="button" onClick={() => switchMode(isRegister ? "login" : "register")}>
              {isRegister ? "已有账号，返回登录" : "没有账号，创建账号"}
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}
