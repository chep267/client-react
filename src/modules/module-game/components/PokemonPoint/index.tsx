/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import { Typography } from '@mui/material';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon.ts';

/** types */
type PokemonTimerProps = {
    className?: string;
};

export default function PokemonPoint(props: PokemonTimerProps) {
    const { className } = props;

    const {
        data: { point },
    } = usePokemon();

    return (
        <Typography className={className} variant="h5" color="primary.main">
            <FormattedMessage id="module.game.pokemon.text.point" values={{ point }} />
        </Typography>
    );
}
