/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/** constants */
import { GameRouterPath } from '@module-game/constants/GameRouterPath';
import { PokemonGameStatus } from '@module-game/constants/PokemonGameStatus';
import { GameLanguage } from '@module-game/constants/GameLanguage';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon';

export default function PokemonGameOver() {
    const { data, method } = usePokemon();

    return (
        <Stack
            className={clsx(
                'invisible absolute top-0 right-0 bottom-0 left-0 -z-1 items-center justify-center gap-2 bg-black/70',
                { 'visible z-1': data.status === PokemonGameStatus.stop }
            )}
        >
            <Typography variant="h1" color="warning" textAlign="center">
                <FormattedMessage id={GameLanguage.component.label.gameOver} />
            </Typography>
            <Stack direction="row" gap={2}>
                <Button variant="contained" onClick={method.restartGame}>
                    <FormattedMessage id={GameLanguage.component.button.restart} />
                </Button>
                <Button component={Link} variant="contained" color="error" to={GameRouterPath.game}>
                    <FormattedMessage id={GameLanguage.component.button.exit} />
                </Button>
            </Stack>
        </Stack>
    );
}
