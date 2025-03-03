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
            children: 'ID',
            dataKey: 'id',
            hasSort: true,
        },
        {
            children: 'First Name',
            dataKey: 'firstName',
            hasSort: true,
        },
        {
            children: 'Last Name',
            dataKey: 'lastName',
            hasSort: true,
        },
        {
            children: 'Age',
            dataKey: 'age',
            hasSort: true,
        },
        {
            children: 'State',
            dataKey: 'state',
            hasSort: true,
        },
        {
            children: 'Phone Number',
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

    const rows: any[] = Array.from({ length: 10 }, (_, index) => createData(`${index}`));

    return <VirtualTable data={rows} columns={columns} hasCheckbox={true} />;
}
