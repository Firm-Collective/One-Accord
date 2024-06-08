import React, { Children } from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

type InfoTooltipProps = {
  title: string;
};

const InfoTooltip: React.FC<InfoTooltipProps> = ({ title }) => (
    <Tooltip title={title} arrow >
        <InfoIcon style={{ marginLeft: 8, cursor: 'pointer', fontSize: 18 }} />
    </Tooltip>
);

export default InfoTooltip;
