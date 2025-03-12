/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Close as CloseIcon } from '@mui/icons-material';

/** types */
import type { TypeDocumentMessageData } from '@module-messenger/types';

type ImagePreviewProps = {
    className?: string;
    fid: string;
    file?: TypeDocumentMessageData['files'][string];
    onRemoveFile(fid: string): void;
};

export default function ImagePreview(props: ImagePreviewProps) {
    const { className, file, fid, onRemoveFile } = props;

    if (!file?.fileData) {
        return null;
    }

    return (
        <Box className={classnames('group/image relative h-20 w-20 overflow-hidden rounded-xl', className)} bgcolor="divider">
            <IconButton
                className="invisible absolute top-0.5 right-0.5 border border-solid p-0 group-hover/image:visible"
                sx={{
                    borderColor: 'error.main',
                    '& > svg': {
                        color: 'error.main',
                    },
                    '&:hover': {
                        backgroundColor: 'error.main',
                        '& > svg': {
                            color: 'common.white',
                        },
                    },
                }}
                onClick={() => onRemoveFile(fid)}
                size="small"
            >
                <CloseIcon fontSize="small" />
            </IconButton>
            <img alt="" className="h-full w-full" src={URL.createObjectURL(file.fileData)} />
        </Box>
    );
}
