import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error; info?: React.ErrorInfo };

export default class ErrorBoundary extends React.Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Log to console for local debugging
        console.error("Uncaught error in component tree:", error, info);

        // Optional: send to remote logging service
        // fetch("/api/logs", { method: "POST", body: JSON.stringify({ error: error.message, stack: info.componentStack }) });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
                    <div className="max-w-lg text-center">
                        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                        <p className="text-gray-300 mb-4">
                            An unexpected error occurred. Try reloading the page or come back later.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Reload
                        </button>
                        <details className="mt-4 text-left text-sm text-gray-400">
                            <summary>Technical details</summary>
                            <pre className="whitespace-pre-wrap mt-2">
                                {this.state.error?.message}
                                {"\n"}
                                {this.state.info?.componentStack}
                            </pre>
                        </details>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
