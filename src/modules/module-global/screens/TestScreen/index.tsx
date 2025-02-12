/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export default function TestScreen() {
    return (
        <div className="flex h-full w-full flex-col" style={{ border: '1px solid red' }}>
            Test
            {Array.from({ length: 20 }).map((_i, key) => {
                return <div key={key} className="mt-10 h-20 w-full bg-amber-600" />;
            })}
        </div>
    );
}
