/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import { Button } from '@mui/material';

/** constants */
import { PokemonLogo } from '@module-game/constants/PokemonLogo.ts';
import { PokemonItemStatus } from '@module-game/constants/PokemonItemStatus.ts';

/** types */
import type { TypePokemonItem, TypePokemonItemStatus } from '@module-game/types';

/** styles */
const useStyles = makeStyles(({ palette }) => ({
    '@keyframes success': {
        '0%': {
            transform: 'scale(1)',
        },
        '50%': {
            transform: 'scale(0.9)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
    '@keyframes error': {
        '10%, 90%': {
            transform: 'translate3d(-1px, 0, 0)',
        },
        '20%, 80%': {
            transform: 'translate3d(2px, 0, 0)',
        },
        '30%, 50%, 70%': {
            transform: 'translate3d(-4px, 0, 0)',
        },
        '40%, 60%': {
            transform: 'translate3d(4px, 0, 0)',
        },
    },
    item: {
        width: 50,
        height: 70,
        borderRadius: 2,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        '&:hover': {
            opacity: 0.8,
        },
    },
    itemEmpty: {
        '&:hover': {
            background: 'unset',
            cursor: 'default',
        },
    },
    itemSelected: {
        position: 'relative',
        opacity: 0.6,
        '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            border: '4px solid',
            borderColor: palette.success.main,
            opacity: 2,
        },
    },
    itemError: {
        animation: '$error 1s linear infinite',
        '&:after': {
            borderColor: palette.error.main,
        },
    },
    itemSuccess: {
        opacity: '1 !important',
        animation: '$success 1s linear infinite',
    },
}));

type PokemonItemProps = {
    id: string;
    status?: TypePokemonItemStatus;
    item: TypePokemonItem;
    onSelect(): void;
};

export default function PokemonItem(props: PokemonItemProps) {
    const { id, status, item, onSelect } = props;
    const classes = useStyles();
    const isEmpty = item.value === 0;

    const itemStyle = React.useMemo(() => {
        return isEmpty ? {} : { backgroundImage: `url(${PokemonLogo[item.value]})` };
    }, [isEmpty]);

    return (
        <Button
            id={id}
            disabled={isEmpty}
            className={classnames(
                classes.item,
                { [classes.itemEmpty]: isEmpty },
                {
                    [classes.itemSelected]: status in PokemonItemStatus,
                },
                { [classes.itemError]: status === PokemonItemStatus.error },
                { [classes.itemSuccess]: status === PokemonItemStatus.success }
            )}
            style={itemStyle}
            onClick={onSelect}
        />
    );
}
