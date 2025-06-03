/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
export type TypePokemonGameLevel = 'easy' | 'normal' | 'hard';

export type TypePokemonItemStatus = 'select' | 'success' | 'error';

export type TypePokemonGameStatus = 'pending' | 'start' | 'stop' | 'next';

export type TypePokemonItem = {
    x: number;
    y: number;
    value: number;
};

export type PokemonContextProps = {
    data: {
        boardGame: TypePokemonItem[][];
        items: TypePokemonItem[];
        level: TypePokemonGameLevel;
        second: number;
        duration: number;
        status: TypePokemonGameStatus;
        point: number;
    };
    method: {
        startGame(level: TypePokemonGameLevel): void;
        stopGame(): void;
        restartGame(): void;
        nextGame(): void;
        chooseItem(item: TypePokemonItem): void;
        getItemStatus(item: TypePokemonItem): TypePokemonItemStatus | undefined;
    };
};
