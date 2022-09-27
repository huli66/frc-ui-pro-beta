import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

// import code component
export const ImportCode = ({ code }: { code: string }) => (
  <ReactMarkdown
    children={code}
    components={{
      code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, "")}
            style={tomorrow}
            language={"ts"}
            PreTag="div"
            {...props}
          />
        );
      },
    }}
  />
);
