/**
 *
 * @author dongntd267@gmail.com
 *
 */

/** libs */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';

/** components */
import FieldText from '@module-auth/components/general/FieldEmail';

const ElementTest = (props: { name: string; label: string; value: string }) => {
    const { name, label, value } = props;
    const { control } = useForm({
        defaultValues: {
            [name]: value,
        },
    });
    return <FieldText name={name} label={label} control={control} />;
};

describe('FieldText', () => {
    const label = 'Text field';
    const value = 'user@test.com';
    it('renders and shows initial value', () => {
        const { getByLabelText } = render(<ElementTest name="email" label={label} value={value} />);
        const input = getByLabelText(label);
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(value);
    });
});
