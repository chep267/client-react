/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Chance from 'chance';

/** components */
// import TableBase from '@module-base/components/VirtualTable';
import TableBase from '@module-base/components/TableBase';

/** types */
import type { VirtualTableProps } from '@module-base/types';

export default function TestScreen() {
    const chance = new Chance();
    const columns: VirtualTableProps<{
        id: string;
        firstName: string;
        lastName: string;
        age: string;
        phone: string;
        state: string;
    }>['columns'] = [
        {
            label: 'ID',
            dataKey: 'id',
            hasSort: true,
        },
        {
            label: 'First Name',
            dataKey: 'firstName',
            hasSort: true,
        },
        {
            label: 'Last Name',
            dataKey: 'lastName',
            hasSort: true,
        },
        {
            label: 'Age',
            dataKey: 'age',
            hasSort: true,
        },
        {
            label: 'State',
            dataKey: 'state',
            hasSort: true,
        },
        {
            label: 'Phone Number',
            dataKey: 'phone',
            hasSort: true,
        },
    ];

    function createData(id: string) {
        return {
            id,
            firstName: chance.first(),
            lastName: chance.last(),
            age: chance.age(),
            phone: chance.phone(),
            state: chance.state({ full: true }),
        };
    }

    const rows = Array.from({ length: 100 }, (_, index) => createData(`${index}`));

    return <TableBase data={rows} columns={columns} hasCheckbox={true} dataKeyForCheckbox="id" loading={false} />;
}
