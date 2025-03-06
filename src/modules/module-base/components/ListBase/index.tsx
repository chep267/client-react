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
import ListLoading from './ListLoading';

/** types */
import type { ListBaseProps } from '@module-base/types';

export default function ListBase<T>(props: ListBaseProps<T>) {
    const { ref, data, className, classNameContainer, classNameLoading, loading, emptyText, renderItem, ...listProps } =
        props;

    const listRef = React.useRef<HTMLUListElement | null>(null);

    React.useImperativeHandle(ref, () => {
        return {
            scrollTop: () => {
                listRef.current?.scrollTo({ top: 0 });
            },
        };
    }, []);

    return (
        <Stack className={classnames('relative h-full w-full', classNameContainer)}>
            <ListLoading className={classNameLoading} loading={loading} empty={!data?.length} emptyText={emptyText} />
            <List
                ref={listRef}
                className={classnames(
                    'scrollbar-custom absolute top-0 right-0 bottom-0 left-0 overflow-x-hidden overflow-y-auto',
                    className
                )}
                {...listProps}
            >
                {data?.map((item, index) => renderItem?.(item, index))}
            </List>
        </Stack>
    );
}
