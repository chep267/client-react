/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { Control, FieldPath, FieldValues, UseFormSetFocus, UseFormReturn } from 'react-hook-form';

export type TypeAuthBreadcrumbsItem = {
    title: string;
    path: string;
    append?: string;
    hidden?: boolean;
};

export type AuthButtonSubmitProps = {
    loading?: boolean;
    type: 'signin' | 'register' | 'recover';
};

export type FieldEmailProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    error?: boolean;
    errorMessage?: string;
    clearErrors: UseFormReturn<T>['clearErrors'];
};

export type FieldPasswordProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    error?: boolean;
    errorMessage?: string;
    setFocus: UseFormSetFocus<T>;
    isConfirm?: boolean;
    clearErrors: UseFormReturn<T>['clearErrors'];
};

export type TypeFormAuth = {
    email: string;
    password: string;
    confirm_password: string;
};
