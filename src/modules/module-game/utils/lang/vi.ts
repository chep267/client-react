/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** constants */
import { GameLanguage } from '@module-game/constants/GameLanguage';

export const vi = {
    [GameLanguage.component.label.router]: 'Pokemon',
    [GameLanguage.component.label.point]: 'Điểm: {point}',
    [GameLanguage.component.label.gameOver]: 'Kết thúc!',
    [GameLanguage.component.label.victory]: 'Chiến thắng!',
    [GameLanguage.component.button.restart]: 'Chơi lại',
    [GameLanguage.component.button.exit]: 'Thoát',
    [GameLanguage.component.button.next]: 'Tiếp tục',
} as const;
