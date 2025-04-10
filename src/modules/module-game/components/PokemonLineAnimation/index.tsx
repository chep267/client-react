/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import clsx from 'clsx';
import Stack from '@mui/material/Stack';

/** constants */
import { PokemonLine } from '@module-game/constants/PokemonLine';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon';

/** utils */
import { delay } from '@module-base/utils/delay';

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
            delay(1500, () => setStart(false)).then();
        }
    }, [point]);

    const offsets = document.getElementById('pokemon-item-0-0')?.getBoundingClientRect();

    const itemStyle = React.useMemo(() => {
        return { backgroundImage: `url(${PokemonLine.vertical})`, top: offsets?.top };
    }, [offsets]);

    return <Stack className={clsx(classes.line, { [classes.lineShow]: start }, className)} style={itemStyle} />;
}
