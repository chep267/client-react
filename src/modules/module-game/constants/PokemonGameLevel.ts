/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { TypePokemonGameLevel } from '@module-game/types';

export const PokemonGameLevel: Readonly<Record<TypePokemonGameLevel, TypePokemonGameLevel>> = {
    easy: 'easy',
    normal: 'normal',
    hard: 'hard',
};
