/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

/** utils */
import { validateId } from '@module-base/utils/validateId';

/** hooks */
import { useListUser } from './useListUser';

/** types */
import type { TypeUser } from '@module-user/types';

type UseUserProps = {
    uid?: TypeUser['uid'];
};

export function useUser(props: UseUserProps) {
    const { uid: uidProps } = props;
    const uid = validateId(`${uidProps}`, 'uid');
    const hookListUser = useListUser();

    return {
        isLoading: hookListUser.isLoading,
        data: hookListUser.data?.items?.[`${uid}`],
    };
}
