/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { CalendarContext } from '@module-calendar/contexts/CalendarContext';

export const useCalendar = () => React.useContext(CalendarContext);
