/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AppDefaultValue } from '@module-base/constants/AppDefaultValue';
import { PokemonGameLevel } from '@module-game/constants/PokemonGameLevel';
import { PokemonGameStatus } from '@module-game/constants/PokemonGameStatus';
import { PokemonItemStatus } from '@module-game/constants/PokemonItemStatus';

/** utils */
import { PokemonService } from '@module-game/utils/PokemonService';

/** types */
import type { PokemonContextProps } from '@module-game/types';

export const defaultPokemonState: PokemonContextProps['data'] = {
    boardGame: AppDefaultValue.emptyArray,
    items: AppDefaultValue.emptyArray,
    status: PokemonGameStatus.pending,
    level: PokemonGameLevel.easy,
    second: 0,
    duration: PokemonService.GameLevel[PokemonGameLevel.easy].duration,
    point: 0,
};

export const PokemonContext = React.createContext<PokemonContextProps>({
    data: defaultPokemonState,
    method: {
        startGame: AppDefaultValue.emptyFunction,
        stopGame: AppDefaultValue.emptyFunction,
        restartGame: AppDefaultValue.emptyFunction,
        nextGame: AppDefaultValue.emptyFunction,
        chooseItem: AppDefaultValue.emptyFunction,
        getItemStatus: () => PokemonItemStatus.select,
    },
});
