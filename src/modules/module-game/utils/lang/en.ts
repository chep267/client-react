/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** constants */
import { GameLanguage } from '@module-game/constants/GameLanguage';

export const en = {
    [GameLanguage.component.label.router]: 'Pokemon',
    [GameLanguage.component.label.point]: 'Point: {point}',
    [GameLanguage.component.label.gameOver]: 'Game Over!',
    [GameLanguage.component.label.victory]: 'Victory!',
    [GameLanguage.component.button.restart]: 'Restart',
    [GameLanguage.component.button.exit]: 'Exit',
    [GameLanguage.component.button.next]: 'Next',
} as const;
