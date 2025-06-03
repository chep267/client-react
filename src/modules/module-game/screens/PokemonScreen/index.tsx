/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import Stack from '@mui/material/Stack';

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
            <Stack className="relative h-full w-full items-center">
                <Stack className="h-24 min-h-24 w-full flex-row justify-between gap-10 p-6">
                    <PokemonTimer />
                    <PokemonPoint />
                </Stack>
                <Stack className="h-full w-full items-center justify-center overflow-auto p-2">
                    <PokemonBoardGame />
                </Stack>
                <PokemonGameOver />
                <PokemonGameVictory />
            </Stack>
        </PokemonProvider>
    );
}
