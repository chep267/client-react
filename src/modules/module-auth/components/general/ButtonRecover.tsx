/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';

/** constants */
import { AuthLanguage } from '@module-auth/constants/AuthLanguage';

/** hooks */
import { useRecover } from '@module-auth/hooks/useAuth';

/** types */
import type { AxiosError } from 'axios';
import type { ButtonProps } from '@mui/material/Button';
import type { UseFormHandleSubmit, SubmitHandler } from 'react-hook-form';

type TypeFormData = {
    email: string;
};
interface TypeButtonRecover extends ButtonProps {
    handleSubmit: UseFormHandleSubmit<TypeFormData>;
    onSubmitError: (error: AxiosError) => void;
}

export default function ButtonRecover(props: TypeButtonRecover) {
    const {
        type = 'button',
        size = 'large',
        variant = 'contained',
        className,
        handleSubmit,
        onSubmitError,
        ...btnProps
    } = props;

    const hookRecover = useRecover();

    const onSubmit = React.useCallback<SubmitHandler<TypeFormData>>((data) => {
        hookRecover.mutate(data, {
            onError: onSubmitError,
        });
    }, []);

    return (
        <Button
            type={type}
            size={size}
            variant={variant}
            className={clsx('bg-tw-primary font-bold tracking-normal capitalize', 'w-full', 'xs:w-1/3', className)}
            loading={hookRecover.isPending}
            onClick={handleSubmit(onSubmit)}
            {...btnProps}
        >
            <FormattedMessage id={AuthLanguage.component.button.recover} />
        </Button>
    );
}
