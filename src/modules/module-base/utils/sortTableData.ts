/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** types */
import type { TypeOrderType } from '@module-base/types';

const parseValue = (value: unknown) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && !isNaN(Number(value))) return Number(value);
    return String(value);
};

export const sortTableData = <T>(payload: { data?: T[]; orderType: TypeOrderType; orderBy: keyof T }) => {
    const { data, orderType = OrderType.asc, orderBy } = payload;
    if (!data) return [];
    return data.toSorted((a, b) => {
        const valueA = a[orderBy];
        const valueB = b[orderBy];
        const formattedA = parseValue(valueA);
        const formattedB = parseValue(valueB);
        if (formattedA < formattedB) return orderType === OrderType.asc ? -1 : 1;
        if (formattedA > formattedB) return orderType === OrderType.asc ? 1 : -1;
        return 0;
    });
};
