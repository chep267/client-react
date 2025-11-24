/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { OrderType } from '@module-base/constants/OrderType';

export const sortTableData = <D extends App.ModuleBase.Component.TableData>(payload: {
    data?: Readonly<Array<D>>;
    orderType: App.ModuleBase.Component.OrderType;
    orderBy: App.ModuleBase.Component.DataKey<D>;
}): Readonly<Array<D>> => {
    const { data, orderType = OrderType.asc, orderBy } = payload;
    if (!data) return [];

    const parseValue = (item: any, key?: App.ModuleBase.Component.DataKey<D>) => {
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
