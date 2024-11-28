/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
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
                { '!visible !z-10': data.status === PokemonGameStatus.stop },
                className
            )}
        >
            <Typography variant="h1" color="warning.main" textAlign="center">
                <FormattedMessage id={GameLanguage.component.label.gameOver} />
            </Typography>
            <Stack direction="row" gap={2}>
                <Button variant="contained" onClick={method.restartGame}>
                    <FormattedMessage id={GameLanguage.component.button.restart} />
                </Button>
                <Link to={GameRouterPath.game}>
                    <Button variant="contained" color="error">
                        <FormattedMessage id={GameLanguage.component.button.exit} />
                    </Button>
                </Link>
            </Stack>
        </Stack>
    );
}
