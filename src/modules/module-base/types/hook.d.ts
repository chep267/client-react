/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type { ReactNode } from 'react';
import type { AlertColor } from '@mui/material/Alert';

/** useCountdown */
export type TypeUseCountdownProps = {
    numberCountdown?: number /** thời gian đếm ngược */;
    timer?: number /**  khoảng đếm ngược */;
    isContinue?: boolean /** có  tiếp tục đếm ngược khi về 0 */;
    callback?(): void /** fn callback khi  đếm ngược khi về 0 */;
};

/** useNotify */
export type TypeNotify = {
    open?: boolean;
    message?: ReactNode;
    messageIntl?: string;
    color?: AlertColor;
    duration?: number;
    top?: number;
};
export type TypeNotifyContext = {
    data: TypeNotify;
    method: {
        toggleNotify(notify?: TypeNotify): void;
        closeNotify(): void;
    };
};

/** useListSearch */
export type TypeUseListSearchProps = {
    disableEventKey: boolean; // có tắt phím mũi tên không, mặc định là không
    total: number; // số phần tử
    indexSelect: number; // vị trí đang select, mặc định là chưa chọn
    indexHover: number; // ví trí đang hover, mặc định là chưa chọn
    idSelect: string; // id đang select, mặc định là chưa chọn
};

/** useSider */
export type TypeSiderState = 'collapse' | 'expand' | 'hidden' | 'force';

export type TypeSiderContext = {
    data: {
        siderState: TypeSiderState;
    };
    method: {
        toggleSider(): void;
    };
};
