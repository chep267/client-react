/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

/** components */
import PokemonItem from './PokemonItem';

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon';

type PokemonBoardGameProps = {
    className?: string;
};

export default function PokemonBoardGame(props: PokemonBoardGameProps) {
    const { className } = props;
    const { data, method } = usePokemon();

    return (
        <Paper className={classnames('flex h-auto w-auto flex-col gap-0.5 rounded-md p-2.5', className)}>
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
