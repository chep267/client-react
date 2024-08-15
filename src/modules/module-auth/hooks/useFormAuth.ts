/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

/** constants */
import { AppKey } from '@module-base/constants/AppKey.ts';

/** utils */
import { authFormSchema } from '@module-auth/utils/authFormSchema.ts';

/** types */
import type { TypeFormAuth } from '@module-auth/types';

export function useFormAuth({ type }: { type: 'signin' | 'register' | 'recover' }) {
    // @ts-ignore
    const email = Cookies.get(AppKey.email) as string;

    return useForm<TypeFormAuth>({
        defaultValues: {
            email: type === 'signin' ? email || 'dong.nguyenthanh@powergatesoftware.com' : '',
            password: type === 'register' ? '' : type === 'recover' ? 'chep_react@2024' : 'Midom@2024',
            confirm_password: type === 'register' ? '' : 'chep_react@2024',
        },
        mode: 'onSubmit',
        resolver: yupResolver(authFormSchema),
    });
}
