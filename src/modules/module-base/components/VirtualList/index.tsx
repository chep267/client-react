/**
 *
 * @author dongntd267@gmail.com
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

export default function VirtualList<Data, Context>(props: App.ModuleBase.Component.VirtualListProps<Data, Context>) {
    const { loading, emptyContent, itemProps, components, ...listProps } = props;

    const customComponents = React.useMemo<
        App.ModuleBase.Component.VirtualListProps<Data, Context>['components']
    >(() => {
        return {
            Scroller: React.forwardRef<HTMLDivElement, any>((props, ref) => (
                <>
                    <TableContainer ref={ref} component={Box} {...props} />
                    {loading ? <TableLoading /> : null}
                </>
            )),
            List: React.forwardRef((props, ref) => <List ref={ref} component="div" {...props} />),
            Item: ({ style, ...defaultProps }) => (
                <ListItem
                    {...defaultProps}
                    {...itemProps}
                    style={{ padding: 0, margin: 0, ...style, ...itemProps?.style }}
                />
            ),
            EmptyPlaceholder: () => (loading ? null : <TableEmpty emptyContent={emptyContent} />),
            ...components,
        };
    }, [components, itemProps, loading, emptyContent]);

    return <Virtuoso components={customComponents} {...listProps} />;
}
