import React, { useState } from 'react';
import '../styles/libra.css';

export interface LibraColor {
  id: string;
  code: string;
  name: string;
}

// 리브라 컬러 팔레트 데이터
export const libraColors: LibraColor[] = [
  { id: 'LQT01', code: '757575', name: 'T.L.GRAY' },
  { id: 'LQT02', code: '6F6E6E', name: 'T.GRAY' },
  { id: 'LQT03', code: '535252', name: 'T.D.GRAY' },
  { id: 'LQT04', code: '3A3838', name: 'T.D.GRAY' },
  { id: 'LQT05', code: '12142F', name: 'T.D.NAVY' },
  { id: 'LQT06', code: '0B0C1E', name: 'T.D.NAVY' },
  { id: 'LQT07', code: '0B0B0B', name: 'T.BLACK' },
  { id: 'LQT08', code: '4A2510', name: 'T.BROWN' },
  { id: 'LQT09', code: '351B00', name: 'T.D.BROWN' },
  { id: 'LQT10', code: 'A4824C', name: 'T.BEIGE' },
  { id: 'LQM11', code: '363333', name: 'M.L.GRAY' },
  { id: 'LQM12', code: '3A3838', name: 'M.D.GRAY' },
  { id: 'LQC13', code: '151735', name: 'M.L.NAVY' },
  { id: 'LQM14', code: '101129', name: 'M.D.NAVY' },
  { id: 'LQM15', code: '0C0D1F', name: 'M.D.NAVY' },
  { id: 'LQM16', code: '030303', name: 'M.BLACK' },
  { id: 'LQM17', code: 'EDE4D1', name: 'M.IVORY' },
  { id: 'LQP18', code: '3A3838', name: 'S.P.GRAY' },
  { id: 'LQP19', code: '1F2144', name: 'S.P.NAVY' },
  { id: 'LQC20', code: '282727', name: 'S.C.GRAY' },
  { id: 'LQC21', code: '060E28', name: 'S.C.NAVY' },
  { id: 'LQH22', code: '1B1D3F', name: 'H.NAVY' },
  { id: 'LQH23', code: '292626', name: 'H.GRAY' },
  { id: 'LQH24', code: '060606', name: 'H.BLACK' },
  { id: 'LQH25', code: '311A03', name: 'H.BROWN' },
  { id: 'LQH26', code: '424040', name: 'H.GRAY' },
  { id: 'LQH27', code: '2F2D2D', name: 'H.D.GRAY' },
  { id: 'LQH28', code: '19241A', name: 'H.KHAKI' },
  { id: 'LQH29', code: '1F2144', name: 'H.NAVY' },
  { id: 'LQT30', code: '1C1D2F', name: 'T.MNAVY' }
];

interface LibraColorPaletteProps {
  selectedColor?: LibraColor;
  onColorSelect?: (color: LibraColor) => void;
}

const LibraColorPalette: React.FC<LibraColorPaletteProps> = ({ 
  selectedColor: externalSelectedColor, 
  onColorSelect 
}) => {
  const [internalSelectedColor, setInternalSelectedColor] = useState(libraColors[0]);
  
  const selectedColor = externalSelectedColor || internalSelectedColor;

  const handleColorSelect = (color: LibraColor) => {
    if (onColorSelect) {
      onColorSelect(color);
    } else {
      setInternalSelectedColor(color);
    }
  };

  return (
    <div className="libra-color-palette">
      <div className="libra-color-palette-header">
        <h3 className="libra-color-palette-title">LIBRA</h3>
      </div>
      <div className="libra-color-swatches">
        {libraColors.map((color) => (
          <button
            key={color.id}
            className={`libra-color-swatch ${selectedColor.id === color.id ? 'selected' : ''}`}
            style={{ backgroundColor: `#${color.code}` }}
            onClick={() => handleColorSelect(color)}
            title={`${color.id} - ${color.name}`}
          >
            {selectedColor.id === color.id && (
              <span className="libra-selected-label">LIBRA</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LibraColorPalette;
