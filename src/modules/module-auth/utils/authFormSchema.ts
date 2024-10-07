/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as yup from 'yup';

/** constants */
import { Regex } from '@module-auth/constants/Regex';
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

export const authFormSchema = yup
    .object({
        email: yup.string().required(AuthLanguage.status.email.empty).email(AuthLanguage.status.email.invalid),
        password: yup
            .string()
            .required(AuthLanguage.status.password.empty)
            .matches(Regex.password, AuthLanguage.status.password.invalid),
        confirm_password: yup
            .string()
            .required(AuthLanguage.status.password.empty)
            .matches(Regex.password, AuthLanguage.status.password.invalid),
    })
    .required();
