/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** types */
import type { TypeOrderType } from '@module-base/types';

export const sortTableData = <T>(payload: { data?: T[]; orderType: TypeOrderType; orderBy: keyof T }) => {
    const { data, orderType = OrderType.asc, orderBy } = payload;
    if (!data) return [];
    return data.sort((a, b) => {
        const valueA = a[orderBy];
        const valueB = b[orderBy];
        if (valueA < valueB) return orderType === OrderType.asc ? -1 : 1;
        if (valueA > valueB) return orderType === OrderType.asc ? 1 : -1;
        return 0;
    });
};
