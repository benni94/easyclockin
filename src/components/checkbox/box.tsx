import { FormControlLabel, FormGroup, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

interface ICheckboxProps {
    checked: boolean;
    fontSize?: number | string;
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
}

export const Box: React.FC<ICheckboxProps> = (props) => {
    const { checked, fontSize, label, onChange, style } = props;
    const [isChecked, setIsChecked] = useState(checked);

    console.log('isChecked', checked);

    return <FormGroup style={style}>
        <FormControlLabel control={
            <Checkbox defaultChecked={isChecked}
                onChange={(e) => { onChange(e); setIsChecked(e.target.checked) }} />
        }
            label={<Typography style={{ fontSize }}>{label}</Typography>} />
    </FormGroup>
};
