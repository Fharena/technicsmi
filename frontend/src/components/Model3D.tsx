import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  modelPath: string;
  selectedColor?: string;
}

function Model({ modelPath, selectedColor, defaultModelPath }: ModelProps & { defaultModelPath: string }) {
  const sceneRef = useRef<THREE.Group>(null);
  
  // 항상 Hook을 먼저 호출
  let scene;
  try {
    console.log('Attempting to load model:', modelPath);
    scene = useGLTF(modelPath);
    console.log('Successfully loaded model:', modelPath);
  } catch (error) {
    console.warn(`Failed to load model ${modelPath}, using default model:`, error);
    try {
      console.log('Attempting to load default model:', defaultModelPath);
      scene = useGLTF(defaultModelPath);
      console.log('Successfully loaded default model:', defaultModelPath);
    } catch (defaultError) {
      console.error('Failed to load default model as well:', defaultError);
      scene = null;
    }
  }

  useEffect(() => {
    if (sceneRef.current && selectedColor && sceneRef.current.traverse) {
      sceneRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => {
              if (material instanceof THREE.MeshStandardMaterial) {
                material.color.setHex(parseInt(selectedColor.replace('#', '0x'), 16));
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.setHex(parseInt(selectedColor.replace('#', '0x'), 16));
          }
        }
      });
    }
  }, [selectedColor]);

  // scene이 유효하지 않으면 빈 그룹 반환
  if (!scene) {
    return <group />;
  }

  // GLTF 객체인지 확인하고 적절한 객체 반환
  const sceneObject = 'scene' in scene ? scene.scene : scene;
  
  return <primitive ref={sceneRef} object={sceneObject} scale={1.5} position={[0, -1, 0]} />;
}

interface Model3DProps {
  modelPath: string;
  className?: string;
  selectedColor?: string;
  defaultModelPath?: string;
}

const Model3D: React.FC<Model3DProps> = ({ modelPath, className, selectedColor, defaultModelPath = "/홈페이지 소스정리/work/lqm12.glb" }) => {
  const [key, setKey] = React.useState(0);
  const [hasError, setHasError] = React.useState(false);

  // WebGL 컨텍스트 손실 시 컴포넌트 재마운트
  React.useEffect(() => {
    const handleContextLost = () => {
      console.warn('WebGL context lost, remounting component');
      setKey(prev => prev + 1);
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
      };
    }
  }, []);

  // 에러 바운더리 컴포넌트
  const ErrorFallback = () => (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      color: '#666',
      fontSize: '16px'
    }}>
      모델을 로드할 수 없습니다.
    </div>
  );

  if (hasError) {
    return <ErrorFallback />;
  }

  return (
    <div className={className} style={{ width: '100%', height: '500px' }}>
      <Canvas 
        key={key}
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={({ gl }) => {
          // WebGL 컨텍스트 설정
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
          });
        }}
        onError={(error) => {
          console.error('Canvas error:', error);
          setHasError(true);
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Model modelPath={modelPath} selectedColor={selectedColor} defaultModelPath={defaultModelPath} />
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Model3D;