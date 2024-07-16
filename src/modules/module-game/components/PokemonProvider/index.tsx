/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { PokemonItemStatus } from '@module-game/constants/PokemonItemStatus.ts';
import { PokemonGameLevel } from '@module-game/constants/PokemonGameLevel.ts';
import { PokemonGameStatus } from '@module-game/constants/PokemonGameStatus.ts';

/** utils */
import { PokemonService } from '@module-game/utils/PokemonService.ts';

/** constants */
import { defaultPokemonState, PokemonContext } from '@module-game/contexts/PokemonContext.ts';

/** hooks */
import { useCountdown } from '@module-base/hooks/useCountdown.ts';

/** types */
import type { PropsWithChildren } from 'react';
import type { PokemonContextProps, TypePokemonItemStatus } from '@module-game/types';

export default function PokemonProvider(props: PropsWithChildren) {
    const { children } = props;

    const [status, setStatus] = React.useState<PokemonContextProps['data']['status']>(defaultPokemonState.status);
    const [level, setLevel] = React.useState<PokemonContextProps['data']['level']>(defaultPokemonState.level);
    const [boardGame, setBoardGame] = React.useState<PokemonContextProps['data']['boardGame']>(defaultPokemonState.boardGame);
    const [items, setItems] = React.useState<PokemonContextProps['data']['items']>(defaultPokemonState.items);
    const [itemStatus, setItemStatus] = React.useState<TypePokemonItemStatus>(PokemonItemStatus.select);
    const [point, setPoint] = React.useState<PokemonContextProps['data']['point']>(defaultPokemonState.point);
    const [gameKey, setGameKey] = React.useState<PokemonContextProps['data']['gameKey']>(defaultPokemonState.gameKey);
    const COUNT_DOWN = useCountdown({ numberCountdown: 0 });

    /** Effect init game */
    React.useEffect(() => {
        initGame(level);
        setPoint(0);
    }, [gameKey]);

    /** Effect victory game */
    React.useEffect(() => {
        if (point >= PokemonService.GameLevel[level].point) {
            setStatus(PokemonGameStatus.next);
        }
    }, [point]);

    /** Effect stop game */
    React.useEffect(() => {
        if (COUNT_DOWN.second === 0 && status === PokemonGameStatus.start) {
            setStatus(PokemonGameStatus.stop);
        }
    }, [COUNT_DOWN.second]);

    /** Effect select item */
    React.useEffect(() => {
        const statusPresent: TypePokemonItemStatus =
            items.length > 1
                ? PokemonService.hasPruneItem(boardGame, items)
                    ? PokemonItemStatus.success
                    : PokemonItemStatus.error
                : PokemonItemStatus.select;
        if (statusPresent === PokemonItemStatus.error) {
            setTimeout(() => {
                setItems([]);
            }, 1000);
        } else if (statusPresent === PokemonItemStatus.success) {
            const item1 = items[0];
            const item2 = items[1];
            setTimeout(() => {
                setBoardGame((prev) => {
                    const board = [...prev];
                    board[item1.x][item1.y].value = 0;
                    board[item2.x][item2.y].value = 0;
                    return board;
                });
                setItems([]);
            }, 1000);
        }
        setItemStatus(statusPresent);
        if (statusPresent === PokemonItemStatus.success) {
            setTimeout(() => setPoint((prev) => prev + 2), 1200);
        }
    }, [items]);

    const initGame = React.useCallback<PokemonContextProps['method']['initGame']>((level) => {
        setLevel(level);
        setBoardGame(PokemonService.genBoardGame(level));
        setStatus(PokemonGameStatus.start);
        COUNT_DOWN.onRefresh(PokemonService.GameLevel[level].duration);
    }, []);

    const restartGame = React.useCallback<PokemonContextProps['method']['restartGame']>(() => {
        setGameKey((prev) => (prev + 1) % 7);
    }, []);

    const nextGame = React.useCallback<PokemonContextProps['method']['nextGame']>(() => {
        setLevel((prev) => (prev === PokemonGameLevel.easy ? PokemonGameLevel.normal : PokemonGameLevel.hard));
        setGameKey((prev) => (prev + 1) % 7);
    }, []);

    const stopGame = React.useCallback<PokemonContextProps['method']['stopGame']>(() => {
        // do
    }, []);

    const chooseItem = React.useCallback<PokemonContextProps['method']['chooseItem']>((item) => {
        setItems((prev) => {
            if (prev.length === 2) {
                return prev;
            }
            if (PokemonService.isItemInArray(prev, item)) {
                return [];
            }
            return [...prev, item];
        });
    }, []);

    const getItemStatus: PokemonContextProps['method']['getItemStatus'] = (item) => {
        return PokemonService.isItemInArray(items, item) ? itemStatus : undefined;
    };

    const store = React.useMemo<PokemonContextProps>(
        () => ({
            data: {
                boardGame,
                items,
                status,
                level,
                duration: PokemonService.GameLevel[level].duration,
                gameKey,
                point,
            },
            method: { initGame, restartGame, stopGame, chooseItem, nextGame, getItemStatus },
        }),
        [status, boardGame, items, level, itemStatus, point]
    );

    return <PokemonContext.Provider value={store}>{children}</PokemonContext.Provider>;
}
