/**
 *
 * @author dongntd267@gmail.com
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
