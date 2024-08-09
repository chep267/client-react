/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypePokemonGameStatus } from '@module-game/types';

export const PokemonGameStatus: Readonly<Record<TypePokemonGameStatus, TypePokemonGameStatus>> = {
    pending: 'pending',
    start: 'start',
    stop: 'stop',
    next: 'next',
} as const;
