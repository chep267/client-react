/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { CalendarContext } from '@module-calendar/contexts/CalendarContext';

export const useCalendar = () => React.useContext(CalendarContext);
