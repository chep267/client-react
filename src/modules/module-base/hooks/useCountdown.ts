/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

export const useCountdown = (props: App.ModuleBase.Hook.UseCountdownProps) => {
    const { numberCountdown = 10, timer = 1000, callback, isContinue } = props;

    const countdownRef = React.useRef<NodeJS.Timeout>(undefined);
    const [second, setSecond] = React.useState(numberCountdown);
    const [refresh, setRefresh] = React.useState(0);

    const onStop = React.useCallback(() => clearInterval(countdownRef.current), []);

    const onRefresh = React.useCallback(
        (number = numberCountdown) => {
            onStop();
            setSecond(number);
            setRefresh((prev) => (prev + 1) % 7);
        },
        [numberCountdown]
    );

    const countdownEffect = React.useCallback(() => {
        setSecond((s) => {
            if (s <= 1) {
                callback?.();
                if (isContinue) {
                    return numberCountdown;
                }
                onStop();
            }
            return s - 1;
        });
    }, [numberCountdown, isContinue, callback]);

    React.useEffect(() => {
        countdownRef.current = setInterval(countdownEffect, timer);
        return onStop;
    }, [refresh]);

    return {
        second,
        onRefresh,
        onStop,
    };
};
