import { ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface DemoBreadcrumbProps {
  items: BreadcrumbItem[];
  onBackToMarketing?: () => void;
  showBackButton?: boolean;
}

export default function DemoBreadcrumb({ 
  items, 
  onBackToMarketing, 
  showBackButton = true 
}: DemoBreadcrumbProps) {
  return (
    <div className="bg-background border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm">
          <div className="flex items-center space-x-2">
            <Home className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">unQuery Demo</span>
          </div>
          
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              {item.current ? (
                <span className="font-medium text-foreground">{item.label}</span>
              ) : (
                <button
                  onClick={() => item.href && console.log(`Navigate to ${item.href}`)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Back to Marketing Button */}
        {showBackButton && onBackToMarketing && (
          <Button
            onClick={onBackToMarketing}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            data-testid="breadcrumb-back-to-marketing"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Button>
        )}
      </div>
    </div>
  );
}