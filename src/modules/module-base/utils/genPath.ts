/**
 *
 * @author dongntd267@gmail.com
 *
 */

export const genPath = (root: string, ...arrPath: Array<string | number>) => {
    return `${root}${arrPath?.join('') || ''}`;
};
