/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** types */
import type * as TypeData from './data.d';
import type * as TypeHook from './hook.d';
import type * as TypeComponent from './component.d';

declare global {
    namespace App.ModuleLanguage {
        namespace Data {
            type Locale = TypeData.TypeLocale;
            type Messages = TypeData.TypeMessages;
        }
        namespace Hook {
            type LanguageContext = TypeHook.TypeLanguageContext;
        }
        namespace Component {
            type LanguageProviderProps = TypeComponent.TypeLanguageProviderProps;
        }
    }
}
