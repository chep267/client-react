/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';
import classnames from 'classnames';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import { West as WestIcon } from '@mui/icons-material';

/** components */
import InputSearch from '@module-base/components/InputSearch';

/** hooks */
import { useUiThreadSearch } from '@module-messenger/hooks/useUiThreadSearch';

export default function ThreadSearch() {
    const {
        data: { isFocusSearch },
        method: { setFocusSearch, setSearching, setSearchKey },
    } = useUiThreadSearch();

    const onClose = React.useCallback(() => setFocusSearch(false), []);

    const onFocus = React.useCallback(() => setFocusSearch(true), []);

    return (
        <Box className={classnames('relative flex w-full items-center justify-between gap-2 px-2')}>
            <IconButton
                className={classnames('absolute left-1 z-10 scale-0 transition-transform duration-200', {
                    'scale-100': isFocusSearch,
                })}
                color="primary"
                onClick={onClose}
            >
                <WestIcon />
            </IconButton>
            <InputSearch
                variant="outlined"
                className={classnames('w-full transition-[margin] duration-300', { 'ml-12': isFocusSearch })}
                slotProps={{
                    input: { className: 'rounded-3xl' },
                }}
                onFocus={onFocus}
                onChangeValue={setSearchKey}
                onLoading={setSearching}
            />
        </Box>
    );
}
