/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import { Stack, Paper } from '@mui/material';

/** components */
import PokemonItem from './PokemonItem';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon.ts';

type PokemonBoardGameProps = {
    className?: string;
};

export default function PokemonBoardGame(props: PokemonBoardGameProps) {
    const { className } = props;
    const { data, method } = usePokemon();

    return (
        <Paper className={classnames('flex flex-col w-auto h-auto rounded-md gap-0.5 p-2.5', className)}>
            {data.boardGame.map((row, rowIndex) => {
                return (
                    <Stack key={`boardGame-${data.gameKey}-row-${rowIndex}`} className="flex-row gap-0.5">
                        {row.map((item, colIndex) => {
                            return (
                                <PokemonItem
                                    key={`boardGame-${data.gameKey}-row-${rowIndex}-col-${colIndex}`}
                                    id={`pokemon-item-${rowIndex}-${colIndex}`}
                                    item={item}
                                    status={method.getItemStatus(item)}
                                    onSelect={() => method.chooseItem(item)}
                                />
                            );
                        })}
                    </Stack>
                );
            })}
        </Paper>
    );
}
