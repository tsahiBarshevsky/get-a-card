import React from 'react';
import { Typography } from '@material-ui/core';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

export default function Palette({palette, selectedPalette, handlePaletteChange}) 
{
    var selected; 
    if (palette.name === selectedPalette.name)
        selected = { visibility: 'visible' };
    else
        selected = { visibility: 'hidden' };

    return (
        <div className="palette" onClick={() => handlePaletteChange(palette.name)}>
            <Typography variant="subtitle1">{palette.name}</Typography>
            <div className="colors">
                <div className="color">
                    <Typography variant="subtitle2">Primary: {palette.primary}</Typography>
                    <div className="preview" style={{backgroundColor: `${palette.primary}`}} />
                </div>
                <div className="color">
                    <Typography variant="subtitle2">Secondary: {palette.secondary}</Typography>
                    <div className="preview" style={{backgroundColor: `${palette.secondary}`}} />
                </div>
                <div className="color">
                    <Typography variant="subtitle2">Text: {palette.text}</Typography>
                    <div className="preview" style={{backgroundColor: `${palette.text}`}} />
                </div>
            </div>
            <CheckRoundedIcon className="check" style={selected} />
        </div>
    )
}
