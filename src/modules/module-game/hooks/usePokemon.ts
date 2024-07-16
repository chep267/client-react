/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { PokemonContext } from '@module-game/contexts/PokemonContext.ts';

export const usePokemon = () => React.useContext(PokemonContext);
