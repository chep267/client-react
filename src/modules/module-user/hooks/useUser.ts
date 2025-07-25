/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** utils */
import { validateId } from '@module-base/utils/validateId';

/** hooks */
import { useListUser } from '@module-user/hooks/useListUser';

/** types */

type UseUserProps = {
    uid?: App.ModuleUser.Data.User['uid'];
};

export function useUser(props: UseUserProps) {
    const { uid: uidProps } = props;
    const uid = validateId(`${uidProps}`, 'uid');
    const hookListUser = useListUser();

    return {
        isLoading: hookListUser.isLoading,
        data: hookListUser.data?.data?.items?.[`${uid}`],
    };
}
