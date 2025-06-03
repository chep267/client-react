/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { PropsWithChildren } from 'react';
import type { Control, FieldPath, FieldValues, UseFormSetFocus, UseFormReturn } from 'react-hook-form';

export type TypeAuthProviderProps = PropsWithChildren;

export type TypeAuthBreadcrumbsItem = {
    title: string;
    path: string;
    append?: string;
    hidden?: boolean;
};

export type TypeAuthButtonSubmitProps = {
    loading?: boolean;
    type: 'signin' | 'register' | 'recover';
};

export type TypeFieldEmailProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    error?: boolean;
    errorMessage?: string;
    clearErrors: UseFormReturn<T>['clearErrors'];
};

export type TypeFieldPasswordProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    error?: boolean;
    errorMessage?: string;
    setFocus: UseFormSetFocus<T>;
    isConfirm?: boolean;
    clearErrors: UseFormReturn<T>['clearErrors'];
};
