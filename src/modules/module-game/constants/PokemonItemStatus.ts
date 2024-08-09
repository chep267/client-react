/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypePokemonItemStatus } from '@module-game/types';

export const PokemonItemStatus: Readonly<Record<TypePokemonItemStatus, TypePokemonItemStatus>> = {
    select: 'select',
    success: 'success',
    error: 'error',
};
