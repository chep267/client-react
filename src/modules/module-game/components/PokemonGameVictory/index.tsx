/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Stack, Typography, Button } from '@mui/material';

/** constants */
import { PokemonGameStatus } from '@module-game/constants/PokemonGameStatus.ts';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon.ts';

/** types */
type PokemonTimerProps = {
    className?: string;
};

export default function PokemonGameOver(props: PokemonTimerProps) {
    const { className } = props;

    const { data, method } = usePokemon();

    return (
        <Stack
            className={classnames(
                'absolute items-center justify-center -z-10 top-0 left-0 right-0 bottom-0 invisible gap-2 bg-black bg-opacity-70',
                { '!visible !z-10': data.status === PokemonGameStatus.next },
                className
            )}>
            <Typography variant="h1" color="warning.main" textAlign="center">
                <FormattedMessage id="module.game.pokemon.text.victory" />
            </Typography>
            <Stack direction="row" gap={2}>
                <Button variant="contained" onClick={method.restartGame}>
                    <FormattedMessage id="module.game.pokemon.button.restart" />
                </Button>
                <Button variant="contained" color="success" onClick={method.nextGame}>
                    <FormattedMessage id="module.game.pokemon.button.next" />
                </Button>
            </Stack>
        </Stack>
    );
}
