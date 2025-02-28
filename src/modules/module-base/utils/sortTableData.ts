/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

/** types */
import type { TypeOrderType } from '@module-base/types';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (!orderBy) {
        return 0;
    }
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = <T>(payload: { orderType: TypeOrderType; orderBy: keyof T }): ((a: T, b: T) => number) => {
    const { orderType, orderBy } = payload;
    return orderType === OrderType.desc
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

export const sortTableData = <T>(payload: { data?: T[]; orderType: TypeOrderType; orderBy: keyof T }) => {
    const { data, orderType, orderBy } = payload;
    if (!data) {
        return [];
    }
    return data.sort(getComparator({ orderType, orderBy }));
};
