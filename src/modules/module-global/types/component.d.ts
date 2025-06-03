/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ReactNode } from 'react';

export interface TypeAppItem {
    path: string;
    name: ReactNode;
    icon: ReactNode;
    onClick(): void;
}

export interface ListAppProps {
    hasTooltip: boolean;
}

export interface AppItemProps {
    item: TypeAppItem;
    isSelected: boolean;
    hasTooltip: boolean;
}
