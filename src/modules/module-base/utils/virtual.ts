/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** types */
import type { TypeId, TypeOrderType, TypeVirtualItemData } from '@module-base/types';

export const sortTableData = <T = any>(payload: {
    data?: Readonly<Array<T>>;
    orderType: TypeOrderType;
    orderBy: string;
}): Readonly<Array<T>> => {
    const { data, orderType = OrderType.asc, orderBy } = payload;
    if (!data) return AppDefaultValue.emptyArray;

    const parseValue = (value?: TypeId) => {
        if (typeof value === 'number') return value;
        if (typeof value === 'string' && !isNaN(Number(value))) return Number(value);
        return String(value);
    };

    return data.toSorted((a, b) => {
        const valueA = typeof a === 'string' || typeof a === 'number' ? a : a?.[orderBy];
        const valueB = typeof b === 'string' || typeof b === 'number' ? b : b?.[orderBy];
        const formattedA = parseValue(valueA);
        const formattedB = parseValue(valueB);
        if (formattedA < formattedB) return orderType === OrderType.asc ? -1 : 1;
        if (formattedA > formattedB) return orderType === OrderType.asc ? 1 : -1;
        return 0;
    });
};

export const getId = (item: TypeVirtualItemData) => {
    return typeof item === 'string' || typeof item === 'number' ? item : item?.id;
};
