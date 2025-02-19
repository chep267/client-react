/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** constants */
import { GameRouterPath } from '@module-game/constants/GameRouterPath';
import { GameLanguage } from '@module-game/constants/GameLanguage';

/** utils */
import PokemonLogo from '@module-game/assets/images/pokemon_logo.png';

/** styles */
const useStyles = makeStyles(({ palette }: any) => ({
    gameItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:hover': {
            '& > .MuiStack-root': {
                backgroundColor: palette.divider,
            },
            '& > .MuiTypography-root': {
                color: palette.primary.main,
            },
        },
    },
    gameLogo: {
        backgroundColor: 'transparent',
        borderRadius: 6,
        width: 60,
        height: 60,
        backgroundSize: '50px 50px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
}));

export default function GameScreen() {
    const classes = useStyles();

    const games = React.useRef([
        {
            id: GameRouterPath.pokemon,
            path: `${GameRouterPath.game}${GameRouterPath.pokemon}`,
            name: <FormattedMessage id={GameLanguage.component.label.router} />,
            icon: PokemonLogo,
        },
    ]).current;

    return (
        <Stack className="h-full w-full flex-row gap-5 p-5">
            {games.map((game) => {
                return (
                    <Link key={game.id} to={game.path} className={classes.gameItem}>
                        <Stack className={classes.gameLogo} style={{ backgroundImage: `url(${game.icon})` }} />
                        <Typography variant="body1" pt={1}>
                            {game.name}
                        </Typography>
                    </Link>
                );
            })}
        </Stack>
    );
}
