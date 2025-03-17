/**
 *
 * @author dongntd267@gmail.com on 26/07/2024.
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';

/** types */
import { TypeDataKey, TypeOrderType, TypeTableData } from '@module-base/types';

export const sortTableData = <D extends TypeTableData>(payload: {
    data?: Readonly<Array<D>>;
    orderType: TypeOrderType;
    orderBy: TypeDataKey<D>;
}): Readonly<Array<D>> => {
    const { data, orderType = OrderType.asc, orderBy } = payload;
    if (!data) return AppDefaultValue.emptyArray;

    const parseValue = (item: any, key?: TypeDataKey<D>) => {
        if (typeof item === 'number') return item;
        if (typeof item === 'string') {
            if (!isNaN(Number(item))) return Number(item);
            return item;
        }
        return parseValue(item[key], key);
    };

    return data.toSorted((a, b) => {
        const formattedA = parseValue(a, orderBy);
        const formattedB = parseValue(b, orderBy);
        if (formattedA < formattedB) return orderType === OrderType.asc ? -1 : 1;
        if (formattedA > formattedB) return orderType === OrderType.asc ? 1 : -1;
        return 0;
    });
};

export const getId = (item: any, key: string) => {
    return item[key];
};
