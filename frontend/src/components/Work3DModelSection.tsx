import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import Model3D from './Model3D';
import '../styles/work.css';

// 리브라 컬러 팔레트 데이터
const libraColors = [
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

// 아쿠아 컬러 팔레트 데이터
const aquariusColors = [
  { id: '1022', code: 'E5E5E5', name: 'S.WHITE' },
  { id: '1023', code: 'E2CEB3', name: 'S.IVORY' },
  { id: '1024', code: '2D1600', name: 'S.BROWN' },
  { id: '1025', code: '818181', name: 'S.LGRAY' },
  { id: '1026', code: '4A4A4A', name: 'S.GRAY' },
  { id: '1027', code: '202020', name: 'S.DGRAY' },
  { id: '1028', code: '1A1D44', name: 'S.LNAVY' },
  { id: '1029', code: '151633', name: 'S.NAVY' },
  { id: '1030', code: '0D0F24', name: 'S.DNAVY' },
  { id: '1031', code: '080A1B', name: 'S.DNAVY' },
  { id: '1032', code: '000000', name: 'S.BLACK' },
  { id: '1033', code: 'E5E5E5', name: 'WHITE' },
  { id: '1035', code: 'E2CEB3', name: 'IVORY' },
  { id: '1036', code: '2D1600', name: 'BROWN' },
  { id: '2020', code: '818181', name: 'LGRAY' },
  { id: '2021', code: '4A4A4A', name: 'GRAY' },
  { id: '2022', code: '202020', name: 'DGRAY' },
  { id: '2023', code: '1A1D44', name: 'LNAVY' },
  { id: '2024', code: '151633', name: 'NAVY' },
  { id: '2025', code: '0D0F24', name: 'DNAVY' },
  { id: '2026', code: '080A1B', name: 'DNAVY' },
  { id: '2027', code: '000000', name: 'BLACK' },
  { id: '2028', code: 'E5E5E5', name: 'WHITE' },
  { id: '2029', code: 'E2CEB3', name: 'IVORY' },
  { id: '2030', code: '2D1600', name: 'BROWN' }
];

const Work3DModelSection: React.FC = () => {
  const [selectedLibraColor, setSelectedLibraColor] = useState(libraColors[0]);
  const [selectedAquariusColor, setSelectedAquariusColor] = useState(aquariusColors[0]);
  const [isLibraOpen, setIsLibraOpen] = useState(true);
  const [isAquariusOpen, setIsAquariusOpen] = useState(false);
  const [isFromaOpen, setIsFromaOpen] = useState(false);

  // 모델링 파일 경로를 반환하는 함수
  const getModelPath = (productCode: string): string => {
    const modelPath = `/홈페이지 소스정리/work/${productCode.toLowerCase()}.glb`;
    return modelPath;
  };

  // 디폴트 모델 경로
  const defaultModelPath = "/홈페이지 소스정리/work/lqm12.glb";

  return (
    <div className="work-3d-section">
      <div className="model-3d-content">
        <div className="model-left-section">
          <div className="model-3d-container">
            <Model3D 
              modelPath={getModelPath(isLibraOpen ? selectedLibraColor.id : isAquariusOpen ? selectedAquariusColor.id : selectedLibraColor.id)}
              className="work-3d-model"
              selectedColor={`#${isLibraOpen ? selectedLibraColor.code : isAquariusOpen ? selectedAquariusColor.code : selectedLibraColor.code}`}
              defaultModelPath={defaultModelPath}
            />
          </div>
          {/* 실물 제품 사진 */}
          <div className="product-photo-container">
            <img 
              src="/홈페이지 소스정리/work/2.png" 
              alt="Product View" 
              className="product-photo"
            />
          </div>
        </div>
        <div className="model-info">
          <div className="product-info">
            <h3 className="product-code">
              {isLibraOpen ? selectedLibraColor.id : isAquariusOpen ? selectedAquariusColor.id : 'LQT01'}
            </h3>
            <h4 className="product-name">
              {isLibraOpen ? selectedLibraColor.name : isAquariusOpen ? selectedAquariusColor.name : 'T.L.GRAY'}
            </h4>
          </div>
          <div className="color-options">
            <div className="color-category">
              <div className="category-header" onClick={() => {
                setIsLibraOpen(!isLibraOpen);
                if (!isLibraOpen) {
                  setIsAquariusOpen(false);
                  setIsFromaOpen(false);
                }
              }}>
                <span className="category-label">LIBRA</span>
                <button className="toggle-button">
                  <HiChevronDown className={`toggle-icon ${isLibraOpen ? 'open' : ''}`} />
                </button>
              </div>
              {isLibraOpen && (
                <div className="color-swatches">
                  {libraColors.map((color) => (
                    <button
                      key={color.id}
                      className={`color-swatch ${selectedLibraColor.id === color.id ? 'selected' : ''}`}
                      style={{ backgroundColor: `#${color.code}` }}
                      onClick={() => setSelectedLibraColor(color)}
                      title={`${color.id} - ${color.name}`}
                    >
                      {selectedLibraColor.id === color.id && (
                        <span className="selected-label">LIBRA</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="color-category">
              <div className="category-header" onClick={() => {
                setIsAquariusOpen(!isAquariusOpen);
                if (!isAquariusOpen) {
                  setIsLibraOpen(false);
                  setIsFromaOpen(false);
                }
              }}>
                <span className="category-label">AQUARIUS</span>
                <button className="toggle-button">
                  <HiChevronDown className={`toggle-icon ${isAquariusOpen ? 'open' : ''}`} />
                </button>
              </div>
              {isAquariusOpen && (
                <div className="color-swatches">
                  {aquariusColors.map((color) => (
                    <button
                      key={color.id}
                      className={`color-swatch ${selectedAquariusColor.id === color.id ? 'selected' : ''}`}
                      style={{ backgroundColor: `#${color.code}` }}
                      onClick={() => setSelectedAquariusColor(color)}
                      title={`${color.id} - ${color.name}`}
                    >
                      {selectedAquariusColor.id === color.id && (
                        <span className="selected-label">AQUA</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="color-category">
              <div className="category-header" onClick={() => {
                setIsFromaOpen(!isFromaOpen);
                if (!isFromaOpen) {
                  setIsLibraOpen(false);
                  setIsAquariusOpen(false);
                }
              }}>
                <span className="category-label">FRÖMA</span>
                <button className="toggle-button">
                  <HiChevronDown className={`toggle-icon ${isFromaOpen ? 'open' : ''}`} />
                </button>
              </div>
              {isFromaOpen && (
                <div className="color-swatches">
                  {/* 프로마 컬러 스와치들 - 나중에 추가 예정 */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work3DModelSection;

