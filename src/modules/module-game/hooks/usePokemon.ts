/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { PokemonContext } from '@module-game/contexts/PokemonContext';

export const usePokemon = () => React.useContext(PokemonContext);
