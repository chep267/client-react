/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** types */
export declare type TypePokemonGameLevel = 'easy' | 'normal' | 'hard';

export declare type TypePokemonItemStatus = 'select' | 'success' | 'error';

export declare type TypePokemonGameStatus = 'pending' | 'start' | 'stop' | 'next';

export declare type TypePokemonItem = {
    x: number;
    y: number;
    value: number;
};

export declare type PokemonContextProps = {
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
