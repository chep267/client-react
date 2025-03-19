/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { Virtuoso } from 'react-virtuoso';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TableContainer from '@mui/material/TableContainer';

/** components */
import TableLoading from '@module-base/components/TableBase/TableLoading';
import TableEmpty from '@module-base/components/TableBase/TableEmpty';

/** types */
import type { VirtualListProps } from '@module-base/types';

export default function VirtualList(props: VirtualListProps) {
    const { loading, emptyContent, itemProps, components, ...listProps } = props;

    const customComponents = React.useMemo<VirtualListProps['components']>(() => {
        return {
            Scroller: React.forwardRef<HTMLDivElement, any>((props, ref) => (
                <>
                    <TableContainer ref={ref} component={Box} {...props} />
                    {loading ? <TableLoading /> : null}
                </>
            )),
            List: React.forwardRef((props, ref) => <List ref={ref} component="div" {...props} />),
            Item: ({ style, ...defaultProps }) => (
                <ListItem {...defaultProps} {...itemProps} style={{ padding: 0, margin: 0, ...style, ...itemProps?.style }} />
            ),
            EmptyPlaceholder: () => (loading ? null : <TableEmpty emptyContent={emptyContent} />),
            ...components,
        };
    }, [components, itemProps]);

    return <Virtuoso components={customComponents} {...listProps} />;
}
