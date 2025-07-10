/**
 *
 * @author minh.nguyenquang@powergatesoftware.com on 26/07/2023.
 *
 */

/** components */
import IconBase from '@module-base/components/IconBase';

/** screens */
import LayerScreen from '@module-base/screens/LayerScreen';

export default function NotFoundScreen() {
    return (
        <LayerScreen>
            <IconBase name="notFound" className="h-full w-auto" />
        </LayerScreen>
    );
}
