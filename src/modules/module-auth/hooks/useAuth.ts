/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** libs */
import * as React from 'react';

/** constants */
import { AuthContext } from '@module-auth/contexts/AuthContext';

export const useAuth = () => React.useContext(AuthContext);
