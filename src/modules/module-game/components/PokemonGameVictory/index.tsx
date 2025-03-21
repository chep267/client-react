/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/** constants */
import { PokemonGameStatus } from '@module-game/constants/PokemonGameStatus';
import { GameLanguage } from '@module-game/constants/GameLanguage';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon';

export default function PokemonGameOver() {
    const { data, method } = usePokemon();

    return (
        <Stack
            className={classnames(
                'invisible absolute top-0 right-0 bottom-0 left-0 -z-10 items-center justify-center gap-2 bg-black/70',
                { 'visible z-10': data.status === PokemonGameStatus.next }
            )}
        >
            <Typography variant="h1" color="warning" textAlign="center">
                <FormattedMessage id={GameLanguage.component.label.victory} />
            </Typography>
            <Stack direction="row" gap={2}>
                <Button variant="contained" onClick={method.restartGame}>
                    <FormattedMessage id={GameLanguage.component.button.restart} />
                </Button>
                <Button variant="contained" color="success" onClick={method.nextGame}>
                    <FormattedMessage id={GameLanguage.component.button.next} />
                </Button>
            </Stack>
        </Stack>
    );
}
