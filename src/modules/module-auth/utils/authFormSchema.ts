/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

import * as yup from 'yup';

/** constants */
import { Regex } from '@module-auth/constants/Regex.ts';

export const authFormSchema = yup
    .object({
        email: yup.string().required('module.auth.status.email.empty').email('module.auth.status.email.invalid'),
        password: yup
            .string()
            .required('module.auth.status.password.empty')
            .matches(Regex.password, 'module.auth.status.password.invalid'),
        confirm_password: yup
            .string()
            .required('module.auth.status.password.empty')
            .matches(Regex.password, 'module.auth.status.password.invalid'),
    })
    .required();
