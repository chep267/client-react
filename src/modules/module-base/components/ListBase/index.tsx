/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';

/** components */
import TableLoading from '@module-base/components/TableBase/TableLoading';
import TableEmpty from '@module-base/components/TableBase/TableEmpty';

export default function ListBase<Data>(props: App.ModuleBase.Component.ListBaseProps<Data>) {
    const { ref, data, className, classNameContainer, loading, emptyContent, itemContent, ...listProps } = props;

    const listRef = React.useRef<HTMLUListElement | null>(null);

    React.useImperativeHandle(ref, () => {
        return {
            scrollTop: () => {
                listRef.current?.scrollTo({ top: 0 });
            },
        };
    }, []);

    return (
        <Stack className={clsx('relative h-full w-full overflow-hidden', classNameContainer)}>
            {loading ? <TableLoading /> : null}
            {loading || data?.length ? null : <TableEmpty emptyContent={emptyContent} />}
            <List
                ref={listRef}
                className={clsx('absolute top-0 right-0 bottom-0 left-0 overflow-auto', className)}
                {...listProps}
            >
                {data?.map((item, index) => itemContent?.(item, index))}
            </List>
        </Stack>
    );
}
