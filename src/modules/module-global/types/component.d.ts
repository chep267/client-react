/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { ReactNode } from 'react';

export declare interface TypeAppItem {
    path: string;
    name: ReactNode;
    icon: ReactNode;
    onClick(): void;
}

export declare interface ListAppProps {
    hasTooltip: boolean;
}

export declare interface AppItemProps {
    item: TypeAppItem;
    isSelected: boolean;
    hasTooltip: boolean;
}
