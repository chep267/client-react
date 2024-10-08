/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import { Stack } from '@mui/material';

/** constants */
import { PokemonGameStatus } from '@module-game/constants/PokemonGameStatus';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon';

/** types */
type PokemonTimerProps = {
    className?: string;
};

/** styles */
const useStyles = makeStyles({
    '@keyframes timing': {
        '0%': {
            width: '100%',
        },
        '100%': {
            width: '0%',
        },
    },

    line: {
        position: 'relative',
        width: '100%',
        height: 4,
        borderRadius: 20,
        backgroundImage: 'linear-gradient(to right, red,orange,yellow,green)',
        '&:before': {
            content: '""',
            position: 'absolute',
            borderRadius: 20,
            top: 0,
            left: 0,
            bottom: 0,
            animationTimingFunction: 'linear',
        },
    },
    lineStart: {
        backgroundImage: 'none',
        '&:before': {
            backgroundImage: 'linear-gradient(to right, red,orange,yellow,green)',
            animationName: '$timing',
        },
    },
    lineStop: {
        opacity: 0.2,
    },
});

export default function PokemonTimer(props: PokemonTimerProps) {
    const { className } = props;
    const classes = useStyles();

    const {
        data: { duration, status },
    } = usePokemon();

    return (
        <Stack
            className={classnames(
                classes.line,
                { [classes.lineStart]: status === PokemonGameStatus.start },
                { [classes.lineStop]: status === PokemonGameStatus.stop },
                className
            )}
            sx={{
                '&:before': {
                    animationDuration: `${duration}s`,
                },
            }}
        />
    );
}
