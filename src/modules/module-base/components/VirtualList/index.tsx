/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { Virtuoso } from 'react-virtuoso';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** types */
import type { TypeVirtualItemData, VirtualListProps } from '@module-base/types';

export default function VirtualList<D extends TypeVirtualItemData, C>(props: VirtualListProps<D, C>) {
    const { className, slotProps, components, headerContent, footerContent, ...listProps } = props;

    const customComponents = React.useMemo<VirtualListProps<D, C>['components']>(() => {
        const { listItem: listItemProps } = slotProps || AppDefaultValue.emptyObject;
        return {
            List: React.forwardRef((props, listRef) => <List component="div" ref={listRef} {...props} />),
            Item: ({ style, ...defaultProps }) => (
                <ListItem style={{ ...style, ...listItemProps?.style }} {...defaultProps} {...listItemProps} />
            ),
            Header: headerContent || (() => null),
            Footer: footerContent || (() => null),
            ...components,
        };
    }, [components, slotProps]);

    return <Virtuoso className={classnames('h-full w-full', className)} components={customComponents} {...listProps} />;
}
