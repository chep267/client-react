/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import { Stack } from '@mui/material';

/** constants */
import { PokemonLine } from '@module-game/constants/PokemonLine.ts';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon.ts';

/** styles */
import useStyles from './styles';

/** types */
type PokemonTimerProps = {
    className?: string;
};

export default function PokemonLineAnimation(props: PokemonTimerProps) {
    const { className } = props;
    const classes = useStyles();

    const [start, setStart] = React.useState(false);

    const {
        data: { point },
    } = usePokemon();

    React.useEffect(() => {
        if (point > 0) {
            setStart(true);
            setTimeout(() => setStart(false), 1500);
        }
    }, [point]);

    const offsets = document.getElementById('pokemon-item-0-0')?.getBoundingClientRect();

    const itemStyle = React.useMemo(() => {
        return { backgroundImage: `url(${PokemonLine.vertical})`, top: offsets?.top };
    }, [offsets]);

    return <Stack className={classnames(classes.line, { [classes.lineShow]: start }, className)} style={itemStyle} />;
}
