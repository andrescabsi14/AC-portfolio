import { useFrame, useThree } from '@react-three/fiber';

interface CameraControllerProps {
  isExpanded: boolean;
  config: {
    notExpanded: { cameraZ: number };
    expanded: { cameraZ: number };
  };
}

export const CameraController = ({ isExpanded, config }: CameraControllerProps) => {
  const { camera } = useThree();
  const interpolationSpeed = 0.08;

  useFrame(() => {
    const currentConfig = isExpanded ? config.expanded : config.notExpanded;
    const targetZ = currentConfig.cameraZ;

    camera.position.x += (0 - camera.position.x) * interpolationSpeed;
    camera.position.y += (0 - camera.position.y) * interpolationSpeed;
    camera.position.z += (targetZ - camera.position.z) * interpolationSpeed;
  });

  return null;
};
