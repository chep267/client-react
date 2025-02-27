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

const ListBase = React.memo(function ListBase<T>(props: ListBaseProps<T>) {
    const { listRef, data, className, containerClassName, loading, emptyText, renderItem, ...listProps } = props;

    const renderList = React.useMemo(() => {
        return data?.map((item, index) => renderItem?.(item, index));
    }, [data, renderItem]);

    return (
        <Stack className={classnames('relative h-full w-full', containerClassName)}>
            <ListLoading loading={loading} empty={!data?.length} emptyText={emptyText} />
            <List
                ref={listRef}
                className={classnames('scrollbar-custom absolute top-0 right-0 bottom-0 left-0 overflow-auto', className)}
                {...listProps}
            >
                {renderList}
            </List>
        </Stack>
    );
});

export default ListBase;
