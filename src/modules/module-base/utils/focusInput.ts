/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** utils */
import { debounce } from '@module-base/utils/debounce.ts';

export const focusInput = (payload: { elem?: HTMLInputElement | null; fnCallback?(): void }) => {
    const { elem, fnCallback } = payload;
    if (!elem) {
        fnCallback?.();
        return false;
    }
    debounce(1, () => {
        elem.selectionStart = elem.selectionEnd = elem.value.length;
        elem.focus?.();
        fnCallback?.();
    }).then();
};
