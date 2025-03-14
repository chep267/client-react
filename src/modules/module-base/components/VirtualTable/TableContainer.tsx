/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Paper from '@mui/material/Paper';
import TableContainerLib from '@mui/material/TableContainer';

/** components */
import TableLoading from '@module-base/components/VirtualTable/TableLoading';

/** types */
import type { VirtualTableContainerProps } from '@module-base/types';

export default function TableContainer(props: VirtualTableContainerProps) {
    const { loading, className, children, ...otherProps } = props;
    return (
        <TableContainerLib
            component={Paper}
            className={classnames('relative', { ['overflow-hidden']: loading }, className)}
            {...otherProps}
        >
            <TableLoading loading={loading} />
            {children}
        </TableContainerLib>
    );
}
