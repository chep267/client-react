/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const checkString = (root = '', searchKey = '') => {
    if (!searchKey) {
        return true;
    }
    const str = root.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const text = searchKey.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return str.includes(text);
};
