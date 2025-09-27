import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { colors, spacing, borderRadius } from '@/lib/design-system';
import { Heading, Text, Container } from '@/components/ui/styled-components';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Container size="md" className="py-20">
          <div className="text-center">
            <div 
              className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${colors.feature.red}20` }}
            >
              <AlertTriangle 
                className="w-10 h-10" 
                style={{ color: colors.feature.red }}
              />
            </div>
            
            <Heading as="h2" size="2xl" weight="bold" className="mb-4">
              Oops! Something went wrong
            </Heading>
            
            <Text size="lg" color="muted" className="mb-8 max-w-2xl mx-auto">
              We encountered an unexpected error. Don't worry, our team has been notified 
              and we're working to fix this issue.
            </Text>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div 
                className="mb-8 p-4 text-left bg-muted/50 border border-border overflow-auto"
                style={{ borderRadius: borderRadius.lg }}
              >
                <Text size="sm" weight="medium" className="mb-2">
                  Error Details (Development Only):
                </Text>
                <pre className="text-xs text-muted-foreground whitespace-pre-wrap">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={this.handleRetry}
                className="btn-primary hover-lift"
                style={{
                  padding: `${spacing[3]} ${spacing[6]}`,
                  borderRadius: borderRadius.lg
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={this.handleGoHome}
                variant="outline"
                className="btn-secondary hover-lift"
                style={{
                  padding: `${spacing[3]} ${spacing[6]}`,
                  borderRadius: borderRadius.lg
                }}
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </div>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Hook version for functional components
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  };

  return handleError;
};

// Async error boundary for handling promise rejections
export const AsyncErrorBoundary: React.FC<Props> = ({ children, ...props }) => {
  React.useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      // Prevent the default browser behavior
      event.preventDefault();
      
      // In production, send to error reporting service
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to error reporting service
        // errorReportingService.captureException(new Error(event.reason));
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return <ErrorBoundary {...props}>{children}</ErrorBoundary>;
};