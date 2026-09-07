import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SURAKSHA Client Runtime Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col items-center justify-center p-6 font-mono">
          <div className="max-w-lg w-full bg-[#0c111d] border border-red-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertOctagon className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <h1 className="text-lg font-bold">SURAKSHA EOC Runtime Alert</h1>
                <p className="text-xs text-slate-400">Client state encountered an unexpected exception</p>
              </div>
            </div>

            <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-xl text-xs text-red-300 overflow-x-auto">
              <code>{this.state.error?.message || 'Unknown Application Error'}</code>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Reload Command Center
              </button>
              <a
                href="/"
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
              >
                Return to Overview
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
