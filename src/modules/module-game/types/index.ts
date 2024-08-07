/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
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
        duration: number;
        status: TypePokemonGameStatus;
        gameKey: number;
        point: number;
    };
    method: {
        initGame(level: TypePokemonGameLevel): void;
        stopGame(): void;
        restartGame(): void;
        nextGame(): void;
        chooseItem(item: TypePokemonItem): void;
        getItemStatus(item: TypePokemonItem): TypePokemonItemStatus | undefined;
    };
};
