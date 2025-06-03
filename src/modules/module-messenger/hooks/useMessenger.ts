/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { MessengerContext } from '@module-messenger/contexts/MessengerContext';

export const useMessenger = () => React.useContext(MessengerContext);
