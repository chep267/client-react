/**
 *
 * @author dongntd267@gmail.com
 *
 */

import * as React from 'react';

export function useWhyDidYouUpdate(name: string, props: Record<string, any>) {
    const previousProps = React.useRef(props);

    React.useEffect(() => {
        console.log(`[mounted] ${name}`);
    }, []);

    React.useEffect(() => {
        const changedProps: Record<string, any> = {};
        Object.keys(props).forEach((key) => {
            if (previousProps.current[key] !== props[key]) {
                changedProps[key] = {
                    from: previousProps.current[key],
                    to: props[key],
                };
            }
        });

        if (Object.keys(changedProps).length > 0) {
            console.log(`[why-did-you-update] ${name}`, changedProps);
        }

        previousProps.current = props;
    }, [props]);
}
