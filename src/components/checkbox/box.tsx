import { FormControlLabel, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

interface ICheckboxProps {
    checked: boolean;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Box: React.FC<ICheckboxProps> = (props) => {
    const { checked, label, onChange } = props;

    return <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked={!checked} onChange={onChange} />} label={label} />
    </FormGroup>
};
