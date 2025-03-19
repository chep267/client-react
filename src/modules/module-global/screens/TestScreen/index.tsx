/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Chance from 'chance';

/** components */
import TableBase from '@module-base/components/VirtualTable';
// import TableBase from '@module-base/components/TableBase';

/** types */
import type { TableBaseProps } from '@module-base/types';

export default function TestScreen() {
    const chance = new Chance();

    type TypeData = { id: string; firstName: string; lastName: string; age: string; phone: string; state: string };

    function createData(id: string): TypeData {
        return {
            id,
            firstName: chance.first() as string,
            lastName: chance.last() as string,
            age: chance.age() as string,
            phone: chance.phone() as string,
            state: chance.state({ full: true }) as string,
        };
    }

    const data = Array.from({ length: 10000 }, (_, index) => createData(`${index}`));

    const columns: TableBaseProps<TypeData>['columns'] = [
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

    return <TableBase data={data} columns={columns} hasCheckbox={true} dataKeyForCheckbox="id" loading={false} />;
}
