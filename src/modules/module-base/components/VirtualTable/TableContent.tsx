/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import TableCell from '@mui/material/TableCell';

/** components */
import CheckboxColumn from '@module-base/components/VirtualTable/CheckboxColumn';

/** utils */
import { getId } from '@module-base/utils/virtual';

/** types */
import { VirtualTableContentProps, ContentColumnsProps } from '@module-base/types';

const ContentColumns = React.memo<ContentColumnsProps>(function HeaderColumns(props) {
    const { indexRow, item, columns, onSelect } = props;

    return columns?.map((column, indexCell) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { dataKey, renderItem, hasSort, ...cellProps } = column;
        const value = item[dataKey];
        return (
            <TableCell key={dataKey} variant="body" onClick={onSelect} {...cellProps}>
                {typeof renderItem === 'function' ? renderItem({ item, dataKey, value, indexRow, indexCell }) : value}
            </TableCell>
        );
    });
});

const TableContent = React.memo<VirtualTableContentProps>((props) => {
    const { indexRow, item, columns, hasCheckbox, checked, onSelect } = props;

    const handleSelect = React.useCallback(() => (hasCheckbox ? onSelect?.(getId(item)) : undefined), [hasCheckbox, item]);

    return (
        <React.Fragment>
            <CheckboxColumn id={getId(item)} hasCheckbox={hasCheckbox} checked={Boolean(checked)} onClick={handleSelect} />
            <ContentColumns columns={columns} indexRow={indexRow} item={item} onSelect={handleSelect} />
        </React.Fragment>
    );
});

export default TableContent;
