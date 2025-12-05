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
        <Stack className={clsx('absolute', 'items-center justify-center', 'top-0 right-0 bottom-0 left-0')}>
            <Stack
                className={clsx(
                    'absolute flex items-center justify-center',
                    'h-40 w-40',
                    'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
                    'rounded-full bg-transparent shadow-lg'
                )}
            >
                <div
                    className={clsx(
                        'animate-start-anim absolute',
                        'inset-0 rounded-full border-3 border-transparent shadow-lg',
                        'border-t-tw-primary border-r-tw-primary',
                        'dark:border-t-tw-warning dark:border-r-tw-warning'
                    )}
                />
                <Typography
                    variant="h5"
                    className={clsx('tracking-wide uppercase', 'text-tw-primary', 'dark:text-tw-warning')}
                >
                    <FormattedMessage id={BaseLanguage.component.label.start} />
                </Typography>
                <Stack
                    className={clsx(
                        'animate-loading-anim',
                        'absolute',
                        'origin-left bg-transparent',
                        'top-[calc(50%-2px)] left-1/2 h-1 w-1/2'
                    )}
                >
                    <div
                        className={clsx(
                            'absolute',
                            '-top-1.5 -right-2 h-4 w-4',
                            'bg-tw-primary rounded-full shadow-lg',
                            'dark:bg-tw-warning'
                        )}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}
