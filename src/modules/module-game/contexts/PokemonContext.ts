/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue.ts';
import { PokemonGameLevel } from '@module-game/constants/PokemonGameLevel.ts';
import { PokemonGameStatus } from '@module-game/constants/PokemonGameStatus.ts';
import { PokemonItemStatus } from '@module-game/constants/PokemonItemStatus.ts';

/** utils */
import { PokemonService } from '@module-game/utils/PokemonService.ts';

/** types */
import type { PokemonContextProps } from '@module-game/types';

export const defaultPokemonState: PokemonContextProps['data'] = {
    boardGame: AppDefaultValue.emptyArray,
    items: AppDefaultValue.emptyArray,
    status: PokemonGameStatus.pending,
    level: PokemonGameLevel.easy,
    duration: PokemonService.GameLevel[PokemonGameLevel.easy].duration,
    gameKey: 1,
    point: 0,
};

export const PokemonContext = React.createContext<PokemonContextProps>({
    data: defaultPokemonState,
    method: {
        initGame: AppDefaultValue.emptyFunction,
        stopGame: AppDefaultValue.emptyFunction,
        restartGame: AppDefaultValue.emptyFunction,
        nextGame: AppDefaultValue.emptyFunction,
        chooseItem: AppDefaultValue.emptyFunction,
        getItemStatus: () => PokemonItemStatus.select,
    },
});
