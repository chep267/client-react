/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

/** constants */
import { GameRouterPath } from '@module-game/constants/GameRouterPath';

/** screens */
const ListGameScreen = React.lazy(() => import('@module-game/screens/ListGameScreen'));
const PokemonScreen = React.lazy(() => import('@module-game/screens/PokemonScreen'));

export default function GameCenterScreen() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route index element={<ListGameScreen />} />
                <Route path={GameRouterPath.pokemon} element={<PokemonScreen />} />
                <Route path="*" element={<Navigate to={GameRouterPath.game} replace />} />
            </Routes>
        </React.Suspense>
    );
}
