import { useState } from "react";
import { WelkIconButton } from "@welkui/react";

const tokenPattern =
  /(\/\*[\s\S]*?\*\/|\/\/[^\r\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z_$][\w$.-]*|\/?>|\b[A-Za-z_$][\w$]*\b|\b\d+(?:\.\d+)?\b|\s+|.)/g;

const keywords = new Set([
  "async",
  "await",
  "const",
  "default",
  "else",
  "export",
  "from",
  "function",
  "if",
  "import",
  "let",
  "new",
  "return",
  "throw",
  "try",
  "type",
  "var",
]);

const dartKeywords = new Set([
  ...keywords,
  "class",
  "extends",
  "false",
  "final",
  "null",
  "override",
  "package",
  "required",
  "super",
  "this",
  "true",
  "void",
]);

function highlightCode(source: string, language: string) {
  const languageKeywords = language === "Dart" ? dartKeywords : keywords;
  const jsx = language === "React / TSX";
  const dart = language === "Dart";
  const tokens = Array.from(source.matchAll(tokenPattern), ([token]) => token)
    // Outside JSX, `<Name` is a generic type argument, not a tag.
    .flatMap((token) =>
      !jsx && /^<\/?[A-Za-z_$]/.test(token)
        ? [token.match(/^<\/?/)![0], token.replace(/^<\/?/, "")]
        : [token],
    );
  const nextToken = (index: number) =>
    tokens.slice(index + 1).find((token) => !/^\s+$/.test(token));
  let inJsxTag = false;
  let jsxExpressionDepth = 0;

  return tokens.map((token, index) => {
    let tokenClass: string | undefined;

    if (jsx && /^<\/?[A-Za-z_$]/.test(token)) {
      inJsxTag = true;
      tokenClass = "syntax-tag";
    } else if (/^["'`]/.test(token)) {
      tokenClass = "syntax-string";
    } else if (/^(\/\/|\/\*)/.test(token)) {
      tokenClass = "syntax-comment";
    } else if (/^\d/.test(token)) {
      tokenClass = "syntax-number";
    } else if (inJsxTag && token === "{") {
      jsxExpressionDepth += 1;
    } else if (inJsxTag && token === "}" && jsxExpressionDepth > 0) {
      jsxExpressionDepth -= 1;
    } else if (
      inJsxTag &&
      (token === ">" || token === "/>") &&
      jsxExpressionDepth === 0
    ) {
      inJsxTag = false;
    } else if (
      inJsxTag &&
      jsxExpressionDepth === 0 &&
      /^[A-Za-z_$][\w$]*$/.test(token)
    ) {
      tokenClass = "syntax-attribute";
    } else if (languageKeywords.has(token)) {
      tokenClass = "syntax-keyword";
    } else if (dart && token === "@") {
      tokenClass = "syntax-keyword";
    } else if (dart && /^_?[A-Z][\w$]*$/.test(token)) {
      tokenClass = "syntax-type";
    } else if (dart && /^[a-z_$][\w$]*$/.test(token)) {
      const next = nextToken(index);
      tokenClass =
        next === "("
          ? "syntax-function"
          : next === ":"
            ? "syntax-attribute"
            : "syntax-identifier";
    } else if (/^[A-Za-z_$][\w$]*$/.test(token)) {
      tokenClass = "syntax-identifier";
    }

    return tokenClass ? (
      <span className={tokenClass} key={index}>
        {token}
      </span>
    ) : (
      token
    );
  });
}

export function Code({
  children,
  language = "React / TSX",
  theme = "monokai",
}: {
  children: string;
  language?: string;
  theme?: "monokai" | "dracula";
}) {
  const [copyState, setCopyState] = useState<
    "idle" | "copying" | "copied" | "error"
  >("idle");

  async function copy() {
    if (!navigator.clipboard?.writeText) {
      setCopyState("error");
      return;
    }
    setCopyState("copying");
    try {
      await navigator.clipboard.writeText(children);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className={`codeBlock codeBlock-${theme}`}>
      <div className="codeToolbar">
        <span>{language}</span>
        <WelkIconButton
          label={copyState === "copied" ? "Copy code again" : "Copy code"}
          disabled={copyState === "copying"}
          onClick={copy}
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {copyState === "copied" ? (
                <path d="m5 12 4 4L19 6" />
              ) : (
                <>
                  <rect x="8" y="8" width="12" height="13" rx="2" />
                  <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                </>
              )}
            </svg>
          }
        />
      </div>
      <pre className="code">
        <code>{highlightCode(children, language)}</code>
      </pre>
      <p
        className="copyFeedback finePrint"
        role={copyState === "error" ? "alert" : "status"}
      >
        {copyState === "error"
          ? "Could not copy code. Allow clipboard access or select and copy the code manually."
          : copyState === "copied"
            ? "Code copied!"
            : ""}
      </p>
    </div>
  );
}
