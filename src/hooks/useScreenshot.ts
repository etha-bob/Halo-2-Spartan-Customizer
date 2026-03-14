import { useThree } from '@react-three/fiber';
import { useCallback } from 'react';

export function useScreenshot() {
  const { gl } = useThree();

  const takeScreenshot = useCallback(() => {
    const dataURL = gl.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `spartan_${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  }, [gl]);

  return takeScreenshot;
}
