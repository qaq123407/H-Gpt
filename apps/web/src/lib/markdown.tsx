import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

type MarkdownRendererProps = {
  content: string;
  onCopy?: (value: string) => void;
};

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>
      )}
    </>
  );
}

function CodeBlock({ code, onCopy }: { code: string; onCopy?: (value: string) => void }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    void navigator.clipboard?.writeText(code);
    setCopied(true);
    onCopy?.("代码已复制");
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>code</span>
        <button className="icon-button subtle" type="button" onClick={copy}>
          {copied ? <Check size={15} /> : <Clipboard size={15} />}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function renderMarkdownBlock(block: string, index: number) {
  const lines = block.split("\n").filter(Boolean);

  if (!lines.length) {
    return null;
  }

  if (lines[0].startsWith("#")) {
    const level = lines[0].startsWith("###") ? "h3" : "h2";
    const text = lines[0].replace(/^#+\s*/, "");
    const Heading = level;
    return <Heading key={index}>{text}</Heading>;
  }

  if (lines.length > 1 && lines[0].includes("|") && lines[1].includes("---")) {
    const headers = lines[0].split("|").map((cell) => cell.trim()).filter(Boolean);
    const rows = lines.slice(2).map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean));
    return (
      <table className="markdown-table" key={index}>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    );
  }

  if (lines.every((line) => line.trim().startsWith("- "))) {
    return (
      <ul key={index}>
        {lines.map((line) => (
          <li key={line}>
            <InlineText text={line.replace(/^- /, "")} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index}>
      <InlineText text={lines.join(" ")} />
    </p>
  );
}

export function MarkdownRenderer({ content, onCopy }: MarkdownRendererProps) {
  const pieces = content.split(/```(?:\w+)?\n?/g);

  return (
    <div className="markdown-body">
      {pieces.map((piece, index) => {
        if (index % 2 === 1) {
          return <CodeBlock key={index} code={piece.trim()} onCopy={onCopy} />;
        }

        return piece
          .split(/\n{2,}/)
          .map((block, blockIndex) => renderMarkdownBlock(block, index * 100 + blockIndex));
      })}
    </div>
  );
}
