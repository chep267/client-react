/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material/TextField';

export type TypeAuthBreadcrumbsItem = {
    title: string;
    path: string;
    append?: string;
    hidden?: boolean;
};

export type TypeAuthBreadcrumbsProps = {
    name?: 'signin' | 'register' | 'recover';
};

export type TypeAuthTitleProps = {
    className?: string;
} & TypeAuthBreadcrumbsProps;

export type TypeAuthButtonSubmitProps = {
    loading?: boolean;
} & TypeAuthBreadcrumbsProps;

export interface TypeFormTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps<'outlined'>, 'variant'> {
    name: FieldPath<T>;
    control: Control<T>;
}
