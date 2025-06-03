/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import clsx from 'clsx';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

export default function StartLoading() {
    return (
        <Stack className="absolute top-0 right-0 bottom-0 left-0 items-center justify-center">
            <Stack className="absolute top-1/2 left-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-transparent shadow-lg">
                <div
                    className={clsx(
                        'animate-start-anim absolute inset-0 rounded-full border-3 border-transparent shadow-lg',
                        'border-t-blue-500 border-r-blue-500',
                        'dark:border-t-amber-500 dark:border-r-amber-500'
                    )}
                />
                <Typography variant="h5" className={clsx('tracking-wide uppercase', 'text-blue-500', 'dark:text-amber-500')}>
                    <FormattedMessage id={BaseLanguage.component.label.start} />
                </Typography>
                <Stack className="animate-loading-anim absolute top-[calc(50%-2px)] left-1/2 h-1 w-1/2 origin-left bg-transparent">
                    <div
                        className={clsx(
                            'absolute -top-1.5 -right-2 h-4 w-4 rounded-full shadow-lg',
                            'bg-blue-500',
                            'dark:bg-amber-500'
                        )}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}
