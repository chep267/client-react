/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** constants */
import { BaseLanguage } from '@module-base/constants/BaseLanguage';

/** components */
import IconBase from '@module-base/components/IconBase';
import ButtonRetry from './ButtonRetry';

/** types */
import type { FallbackDefaultProps } from '@module-base/types';

/** lazy components */
const Particle = React.lazy(() => import('@module-base/components/Particles'));

/** styles */
const useStyles = makeStyles(({ zIndex }) => ({
    fallback: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: zIndex.modal,
        '& img': {
            width: 'auto',
            height: 150,
            borderRadius: '50%',
        },
    },
}));

export default function FallbackDefault(props: FallbackDefaultProps) {
    const { isAutoReload } = props;
    const classes = useStyles();

    return (
        <Stack className={classes.fallback}>
            <Stack className={classes.content}>
                <IconBase name="error" width={237} height={213} />
                <Typography className="text-3xl md:text-5xl" fontWeight={600} color="error.main">
                    <FormattedMessage id={BaseLanguage.component.label.error.fallback.title} />
                </Typography>
                <Typography className="text-xl md:text-2xl" fontWeight={600} py={2} color="error.main">
                    <FormattedMessage id={BaseLanguage.component.label.error.fallback.content} />
                </Typography>
                <ButtonRetry isAutoReload={isAutoReload} />
            </Stack>
            <React.Suspense fallback={null}>
                <Particle />
            </React.Suspense>
        </Stack>
    );
}
