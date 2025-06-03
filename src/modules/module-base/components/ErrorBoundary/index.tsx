/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** types */
import type { ErrorInfo } from 'react';

/** lazy components */
const FallbackDefault = React.lazy(() => import('@module-base/components/ErrorBoundary/FallbackDefault'));
const NotifyBoundary = React.lazy(() => import('@module-base/components/NotifyBoundary'));

class ErrorBoundary extends React.Component<
    App.ModuleBase.Component.ErrorBoundaryProps,
    App.ModuleBase.Component.ErrorBoundaryStates
> {
    constructor(props: App.ModuleBase.Component.ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        console.log('ErrorBoundary: ', error, '\n--\n', errorInfo, '\n--');
    }

    render() {
        const { children, fallback: FallBack = FallbackDefault, isAutoReload } = this.props;
        const { hasError } = this.state;

        return (
            <React.Suspense fallback={null}>
                {hasError ? <FallBack isAutoReload={isAutoReload} /> : children}
                <NotifyBoundary />
            </React.Suspense>
        );
    }
}

export default ErrorBoundary;
