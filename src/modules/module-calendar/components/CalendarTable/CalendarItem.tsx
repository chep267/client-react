/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import classnames from 'classnames';
import makeStyles from '@mui/styles/makeStyles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/** types */
import type { CalendarItemProps } from '@module-calendar/types';

/** styles */
const useStyles = makeStyles(({ palette }) => ({
    itemHover: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: palette.divider,
        },
    },
    itemSelected: {
        borderRadius: '50%',
        backgroundColor: palette.divider,
    },
    itemWeekend: {
        color: palette.error.main,
        '&:hover': {
            color: palette.common.white,
            backgroundColor: palette.error.main,
        },
    },
    itemDifferentMonth: {
        color: palette.text.disabled,
    },
    itemToday: {
        borderRadius: '50%',
        color: palette.primary.main,
        border: `1px solid ${palette.primary.main}`,
        backgroundColor: 'transparent',
        '&:hover': {
            color: palette.common.white,
            backgroundColor: palette.primary.main,
        },
    },
}));

export default function CalendarItem(props: CalendarItemProps) {
    const { day, isHide, isToday, isInMonth, isSelected, onSelect } = props;

    const classes = useStyles();
    const date = day.date();
    const isWeekend = day.day() === 0 || day.day() === 6;

    return isHide ? null : (
        <Stack
            className={classnames(
                'flex-row m-auto justify-center items-center w-12 h-12 rounded-full',
                { [classes.itemHover]: !!date },
                { [classes.itemToday]: isToday },
                { [classes.itemSelected]: isSelected },
                { [classes.itemDifferentMonth]: !isInMonth },
                { [classes.itemWeekend]: isWeekend },
                { hidden: isHide }
            )}
            onClick={onSelect}>
            <Typography variant="h6">{date}</Typography>
        </Stack>
    );
}
