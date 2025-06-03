/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AttachFileIcon from '@mui/icons-material/AttachFile';

/** utils */
import { MessengerLanguage } from '@module-messenger/constants/MessengerLanguage';

/** hooks */
import { useMessenger } from '@module-messenger/hooks/useMessenger';

/** types */
import type { ChangeEvent } from 'react';
import type { TypeDocumentMessageData } from '@module-messenger/types';

export default function ButtonChooseFile() {
    const { tid = '' } = useParams();
    const buttonId = React.useId();
    const { method } = useMessenger();

    const onChange = React.useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const data = event.target.files;
            if (!tid || !data) {
                return;
            }
            const fileIds: TypeDocumentMessageData['fileIds'] = [];
            const files: TypeDocumentMessageData['files'] = {};
            const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
            for (let i = 0, n = data.length; i < n; ++i) {
                const fid = `fid.${timestamp}_${i}`;
                fileIds.push(fid);
                files[fid] = {
                    fid,
                    fileData: data[i],
                    url: '',
                    name: fid,
                    size: data[i].size,
                    type: data[i].type,
                };
            }
            method.setFiles({ tid, fileIds, files });
        },
        [tid]
    );

    return (
        <Tooltip title={<FormattedMessage id={MessengerLanguage.component.button.chooseFile} />}>
            <IconButton color="primary" className="relative" component="label" htmlFor={buttonId}>
                <AttachFileIcon />
                <input
                    id={buttonId}
                    className="absolute top-0 right-0 bottom-0 left-0 -z-1 h-1 w-1"
                    accept="image/*, video/*"
                    type="file"
                    multiple
                    onChange={onChange}
                />
            </IconButton>
        </Tooltip>
    );
}
