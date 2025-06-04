/**
 *
 * @author dongntd267@gmail.com
 *
 */

export type TypeItemIds = string[];

export type TypeItems<Data = any> = Record<string, Data>;

export type TypeStorageName = 'localStorage' | 'sessionStorage';

export type TypeStorageValue = string | null;
