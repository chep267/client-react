/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import { Stack } from '@mui/material';

/** components */
import PokemonProvider from '@module-game/components/PokemonProvider';
import PokemonTimer from '@module-game/components/PokemonTimer';
import PokemonBoardGame from '@module-game/components/PokemonBoardGame';
import PokemonGameOver from '@module-game/components/PokemonGameOver';
import PokemonGameVictory from '@module-game/components/PokemonGameVictory';
import PokemonPoint from '@module-game/components/PokemonPoint';

export default function PokemonScreen() {
    return (
        <PokemonProvider>
            <Stack className="relative w-full h-full items-center">
                <Stack className="flex-row w-full items-center justify-between h-24 min-h-24 gap-2 px-2">
                    <PokemonTimer className="w-9/12" />
                    <PokemonPoint />
                </Stack>
                <Stack className="w-full h-full items-center justify-center overflow-auto p-2">
                    <PokemonBoardGame />
                </Stack>
                <PokemonGameOver />
                <PokemonGameVictory />
            </Stack>
        </PokemonProvider>
    );
}
