/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { Control, FieldPath, FieldValues, UseFormSetFocus } from 'react-hook-form';

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

export type InputEmailProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<FieldValues, any>;
    error?: boolean;
    errorMessage?: string;
};

export type InputPasswordProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<FieldValues, any>;
    error?: boolean;
    errorMessage?: string;
    setFocus: UseFormSetFocus<T>;
    isConfirm?: boolean;
};
