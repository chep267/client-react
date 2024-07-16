/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypePokemonGameStatus } from '@module-game/types';

export const PokemonGameStatus = Object.freeze<Record<TypePokemonGameStatus, TypePokemonGameStatus>>({
    pending: 'pending',
    start: 'start',
    stop: 'stop',
    next: 'next',
});
