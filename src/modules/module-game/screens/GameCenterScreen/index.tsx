/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

/** constants */
import { GameRouterPath } from '@module-game/constants/GameRouterPath.ts';

/** screens */
const GameScreen = React.lazy(() => import('@module-game/screens/GameScreen'));
const PokemonScreen = React.lazy(() => import('@module-game/screens/PokemonScreen'));

export default function GameCenterScreen() {
    return (
        <React.Suspense fallback={null}>
            <Routes>
                <Route index element={<GameScreen />} />
                <Route path={GameRouterPath.pokemon} element={<PokemonScreen />} />
                <Route path="*" element={<Navigate to={GameRouterPath.game} replace />} />
            </Routes>
        </React.Suspense>
    );
}
