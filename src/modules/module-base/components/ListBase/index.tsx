/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';

/** components */
import TableLoading from '@module-base/components/TableBase/TableLoading';
import TableEmpty from '@module-base/components/TableBase/TableEmpty';

/** types */
import type { ListBaseProps } from '@module-base/types';

export default function ListBase<D>(props: ListBaseProps<D>) {
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
        <Stack className={classnames('relative h-full w-full overflow-hidden', classNameContainer)}>
            {loading ? <TableLoading /> : null}
            {loading || data?.length ? null : <TableEmpty emptyContent={emptyContent} />}
            <List
                ref={listRef}
                className={classnames('absolute top-0 right-0 bottom-0 left-0 overflow-auto', className)}
                {...listProps}
            >
                {data?.map((item, index) => itemContent?.(item, index))}
            </List>
        </Stack>
    );
}
