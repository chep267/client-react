/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { PokemonItemStatus } from '@module-game/constants/PokemonItemStatus';
import { PokemonGameLevel } from '@module-game/constants/PokemonGameLevel';
import { PokemonGameStatus } from '@module-game/constants/PokemonGameStatus';

/** contexts */
import { defaultPokemonState, PokemonContext } from '@module-game/contexts/PokemonContext';

/** utils */
import { delay } from '@module-base/utils/delay';
import { PokemonService } from '@module-game/utils/PokemonService';

/** hooks */
import { useCountdown } from '@module-base/hooks/useCountdown';

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
    const [count, setCount] = React.useState(0);

    const hookCountDown = useCountdown({ numberCountdown: 0 });

    /** Effect init game */
    React.useEffect(() => {
        startGame(level);
    }, [count]);

    /** Effect victory game */
    React.useEffect(() => {
        if (point >= PokemonService.GameLevel[level].point) {
            setStatus(PokemonGameStatus.next);
        }
    }, [point]);

    /** Effect select item */
    React.useEffect(() => {
        const statusPresent: TypePokemonItemStatus =
            items.length > 1
                ? PokemonService.hasPruneItem(boardGame, items)
                    ? PokemonItemStatus.success
                    : PokemonItemStatus.error
                : PokemonItemStatus.select;
        if (statusPresent === PokemonItemStatus.error) {
            delay(1000, () => setItems([])).then();
        } else if (statusPresent === PokemonItemStatus.success) {
            const item1 = items[0];
            const item2 = items[1];
            delay(1000, () => {
                setBoardGame((prev) => {
                    const board = [...prev];
                    board[item1.x][item1.y].value = 0;
                    board[item2.x][item2.y].value = 0;
                    return board;
                });
                setItems([]);
            }).then();
        }
        setItemStatus(statusPresent);
        if (statusPresent === PokemonItemStatus.success) {
            delay(1200, () => setPoint((prev) => prev + 2)).then();
        }
    }, [items]);

    const startGame = React.useCallback<PokemonContextProps['method']['startGame']>((level) => {
        setLevel(level);
        setBoardGame(PokemonService.genBoardGame(level));
        setStatus(PokemonGameStatus.start);
        hookCountDown.onRefresh(PokemonService.GameLevel[level].duration);
    }, []);

    const restartGame = React.useCallback<PokemonContextProps['method']['restartGame']>(() => {
        setCount((prev) => prev + 1);
    }, []);

    const nextGame = React.useCallback<PokemonContextProps['method']['nextGame']>(() => {
        setLevel((prev) => (prev === PokemonGameLevel.easy ? PokemonGameLevel.normal : PokemonGameLevel.hard));
        setCount((prev) => prev + 1);
    }, []);

    const stopGame = React.useCallback<PokemonContextProps['method']['stopGame']>(() => {
        setStatus(PokemonGameStatus.stop);
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

    return (
        <PokemonContext.Provider
            value={{
                data: {
                    boardGame,
                    items,
                    status,
                    level,
                    second: hookCountDown.second,
                    duration: PokemonService.GameLevel[level].duration,
                    point,
                },
                method: { startGame, restartGame, stopGame, chooseItem, nextGame, getItemStatus },
            }}
        >
            {children}
        </PokemonContext.Provider>
    );
}
