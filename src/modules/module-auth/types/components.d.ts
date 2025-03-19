/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { Control, FieldPath, FieldValues, UseFormSetFocus, UseFormReturn } from 'react-hook-form';

export declare type TypeAuthBreadcrumbsItem = {
    title: string;
    path: string;
    append?: string;
    hidden?: boolean;
};

export declare type AuthButtonSubmitProps = {
    loading?: boolean;
    type: 'signin' | 'register' | 'recover';
};

export declare type FieldEmailProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    error?: boolean;
    errorMessage?: string;
    clearErrors: UseFormReturn<T>['clearErrors'];
};

export declare type FieldPasswordProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    error?: boolean;
    errorMessage?: string;
    setFocus: UseFormSetFocus<T>;
    isConfirm?: boolean;
    clearErrors: UseFormReturn<T>['clearErrors'];
};
