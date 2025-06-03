/**
 *
 * @author dongntd267@gmail.com
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
