/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import * as React from 'react';

/** contexts */
import { AuthContext } from '@module-auth/contexts/AuthContext';

export const useAuth = () => React.useContext(AuthContext);
