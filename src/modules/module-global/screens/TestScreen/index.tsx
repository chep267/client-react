/**
 *
 * @author dongntd267@gmail.com on 26/07/2023.
 *
 */

export default function TestScreen() {
    return (
        <div className="flex flex-col w-full h-full" style={{ border: '1px solid red' }}>
            Test
            {Array.from({ length: 20 }).map((_i, key) => {
                return <div key={key} className="w-full h-20 bg-amber-600 mt-10" />;
            })}
        </div>
    );
}
