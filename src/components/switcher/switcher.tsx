import React, { useCallback, useState } from 'react';
import Switch from '@mui/material/Switch';
import { FormControlLabel, Typography } from '@mui/material';

export type ISwitcherProps = {
    /**
     * A label which get toggelt when the switch is on or of
     */
    checkedLabel: { isChecked: string, isNotChecked: string };
    /**
     * returns the boolean if the switch is checked
     */
    isChecked: (check: boolean) => void;
    /**
     * sets the label for the switcher on the right side
     */
    label: string;
}


const Switcher: React.FC<ISwitcherProps> = (props) => {
    const { checkedLabel, isChecked, label, } = props;
    const [checked, setChecked] = useState(false);

    const setCheck = useCallback((e: any) => {
        setChecked((e.target as HTMLInputElement).checked);
        isChecked(checked);
    }, [checked, isChecked])

    return (
        <FormControlLabel onChange={setCheck} control={<Switch />} label={<Typography sx={{ color: 'black' }}>
            {label} {checked ? checkedLabel.isChecked : checkedLabel.isNotChecked}
        </Typography>} />
    );
}

export { Switcher };