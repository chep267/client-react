/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { MessengerContext } from '@module-messenger/contexts/MessengerContext';

export const useMessenger = () => React.useContext(MessengerContext);
