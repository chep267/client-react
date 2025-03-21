/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import Stack from '@mui/material/Stack';

/** constants */

/** hooks */
import { usePokemon } from '@module-game/hooks/usePokemon';

export default function PokemonTimer() {
    const {
        data: { duration, second },
    } = usePokemon();

    // Tính phần trăm thời gian còn lại
    const percent = (second / duration) * 100;

    return (
        <Stack className="w-full gap-2">
            <Stack className="relative h-2 w-full overflow-hidden rounded-lg shadow-lg">
                <div
                    className="absolute top-0 right-0 bottom-0 left-0"
                    style={{
                        backgroundImage: 'linear-gradient(to right, red, orange, yellow, green)',
                        clipPath: `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`, // Cắt từ phải sang trái
                    }}
                />
            </Stack>
            <span className="text-lg font-bold">Time Left: {second}s</span>
        </Stack>
    );
}
