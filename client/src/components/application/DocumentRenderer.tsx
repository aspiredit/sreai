import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import { Card, CardContent } from '@/components/ui/card';

interface DocumentRendererProps {
  content: string;
  type: 'markdown' | 'diagram' | 'mixed';
}

// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
});

const MermaidDiagram = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.render('mermaid-diagram-' + Math.random().toString(36).substr(2, 9), chart)
        .then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        })
        .catch((error) => {
          console.error('Mermaid rendering error:', error);
          if (ref.current) {
            ref.current.innerHTML = `<div class="text-red-500 p-4 border border-red-200 rounded">Error rendering diagram: ${error.message}</div>`;
          }
        });
    }
  }, [chart]);

  return <div ref={ref} className="mermaid-diagram flex justify-center" />;
};

export default function DocumentRenderer({ content, type }: DocumentRendererProps) {
  // Extract mermaid diagrams from content
  const renderContent = () => {
    if (type === 'diagram' || content.includes('```mermaid')) {
      const parts = content.split(/```mermaid\n([\s\S]*?)\n```/);
      
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is a mermaid diagram
          return (
            <Card key={index} className="my-4">
              <CardContent className="p-6">
                <MermaidDiagram chart={part.trim()} />
              </CardContent>
            </Card>
          );
        } else {
          // This is regular markdown
          return part.trim() ? (
            <div key={index} className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-foreground">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 text-foreground">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-medium mb-2 text-foreground">{children}</h3>,
                  p: ({ children }) => <p className="mb-3 text-muted-foreground leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-muted-foreground">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-muted-foreground">{children}</ol>,
                  li: ({ children }) => <li className="ml-2">{children}</li>,
                  code: ({ children, className }) => {
                    const isInline = !className;
                    if (isInline) {
                      return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
                    }
                    return (
                      <Card className="my-4">
                        <CardContent className="p-4">
                          <pre className="text-sm overflow-x-auto">
                            <code className="font-mono">{children}</code>
                          </pre>
                        </CardContent>
                      </Card>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <Card className="my-4">
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full">{children}</table>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
                  th: ({ children }) => <th className="px-4 py-2 text-left font-medium">{children}</th>,
                  td: ({ children }) => <td className="px-4 py-2 border-t">{children}</td>,
                }}
              >
                {part}
              </ReactMarkdown>
            </div>
          ) : null;
        }
      });
    }

    // Regular markdown rendering
    return (
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 text-foreground">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mb-3 text-foreground">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-medium mb-2 text-foreground">{children}</h3>,
            p: ({ children }) => <p className="mb-3 text-muted-foreground leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1 text-muted-foreground">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-muted-foreground">{children}</ol>,
            li: ({ children }) => <li className="ml-2">{children}</li>,
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
              }
              return (
                <Card className="my-4">
                  <CardContent className="p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code className="font-mono">{children}</code>
                    </pre>
                  </CardContent>
                </Card>
              );
            },
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-muted-foreground">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <Card className="my-4">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">{children}</table>
                  </div>
                </CardContent>
              </Card>
            ),
            thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
            th: ({ children }) => <th className="px-4 py-2 text-left font-medium">{children}</th>,
            td: ({ children }) => <td className="px-4 py-2 border-t">{children}</td>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  return <div className="document-content">{renderContent()}</div>;
}