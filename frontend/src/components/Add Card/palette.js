import React from 'react';
import { Typography } from '@material-ui/core';

export default function Palette({palette, handlePaletteChange}) 
{
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
        </div>
    )
}
