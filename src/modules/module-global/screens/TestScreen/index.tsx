/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Chance from 'chance';

/** components */
import TableBase from '@module-base/components/VirtualTable';
// import TableBase from '@module-base/components/TableBase';

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

    const data = Array.from({ length: 100 }, (_, index) => createData(`${index}`));

    const columns: App.ModuleBase.Component.VirtualTableProps<TypeData>['columns'] = [
        {
            label: 'ID',
            dataKey: 'id',
            hasSort: true,
            className: 'w-1/6',
        },
        {
            label: 'First Name',
            dataKey: 'firstName',
            hasSort: true,
            className: 'w-1/6',
        },
        {
            label: 'Last Name',
            dataKey: 'lastName',
            hasSort: true,
            className: 'w-1/6',
        },
        {
            label: 'Age',
            dataKey: 'age',
            hasSort: true,
            className: 'w-1/6',
        },
        {
            label: 'State',
            dataKey: 'state',
            hasSort: true,
            className: 'w-1/6',
        },
        {
            label: 'Phone Number',
            dataKey: 'phone',
            hasSort: true,
            className: 'w-1/6',
        },
    ];

    return <TableBase data={data} columns={columns} hasCheckbox={true} dataKeyForCheckbox="id" loading={false} />;
}
