/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** constants */
import { GameRouterPath } from '@module-game/constants/GameRouterPath';
import { GameLanguage } from '@module-game/constants/GameLanguage';

/** utils */
import PokemonLogo from '@module-game/assets/images/pokemon_logo.png';

export default function GameScreen() {
    const games = React.useMemo(() => {
        return [
            {
                id: GameRouterPath.pokemon,
                path: `${GameRouterPath.game}${GameRouterPath.pokemon}`,
                name: <FormattedMessage id={GameLanguage.component.label.router} />,
                icon: PokemonLogo,
            },
        ];
    }, []);

    return (
        <Stack className="h-full w-full flex-row gap-5 p-5">
            {games.map((game) => {
                return (
                    <Stack
                        component={Link}
                        key={game.id}
                        to={game.path}
                        className="items-center gap-1"
                        sx={{
                            '&:hover': {
                                '& > .MuiStack-root': {
                                    backgroundColor: 'divider',
                                },
                                '& > .MuiTypography-root': {
                                    color: 'primary.main',
                                },
                            },
                        }}
                    >
                        <Stack
                            className="h-15 w-15 rounded-lg"
                            sx={{
                                backgroundImage: `url(${game.icon})`,
                                backgroundSize: '50px 50px',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Typography variant="body1">{game.name}</Typography>
                    </Stack>
                );
            })}
        </Stack>
    );
}
