/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Chance from 'chance';

/** components */
import VirtualTable from '@module-base/components/VirtualTable';
import { VirtualTableProps } from '@module-base/types';

export default function TestScreen() {
    const chance = new Chance();
    const columns: VirtualTableProps['columns'] = [
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

    function createData(id: string): any {
        return {
            id,
            firstName: chance.first(),
            lastName: chance.last(),
            age: chance.age(),
            phone: chance.phone(),
            state: chance.state({ full: true }),
        };
    }

    const rows: any[] = Array.from({ length: 10000 }, (_, index) => createData(`${index}`));

    return <VirtualTable data={rows} columns={columns} hasCheckbox />;
}
