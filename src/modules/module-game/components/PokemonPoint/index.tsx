/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';

/** constants */
import { GameLanguage } from '@module-game/constants/GameLanguage';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon';

export default function PokemonPoint() {
    const {
        data: { point },
    } = usePokemon();

    return (
        <Typography className="min-w-max" variant="h5" color="primary">
            <FormattedMessage id={GameLanguage.component.label.point} values={{ point }} />
        </Typography>
    );
}
