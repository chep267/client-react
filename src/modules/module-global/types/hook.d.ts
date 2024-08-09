/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { PropsWithChildren } from 'react';

export type SiderProviderProps = PropsWithChildren;

export type TypeSiderState = 'collapse' | 'expand' | 'hidden' | 'force';

export type TypeSiderContext = {
    data: {
        siderState: TypeSiderState;
    };
    method: {
        toggleSider(): void;
    };
};
