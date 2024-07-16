/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
import type { TypePokemonGameLevel } from '@module-game/types';

export const PokemonGameLevel = Object.freeze<Record<TypePokemonGameLevel, TypePokemonGameLevel>>({
    easy: 'easy',
    normal: 'normal',
    hard: 'hard',
});
