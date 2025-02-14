import React, { useCallback, useEffect, useState } from "react";
import { GridProps, ScreenTypes } from "./Grid.interfaces";
import { calculateCustomGridCss } from "./Grid.utils";

export const useGridStyles = (props: GridProps) => {
  const [deviceType, setDeviceType] = useState<ScreenTypes>(
    ScreenTypes.DESKTOP
  );
  const [customStyles, setCustomStyles] = useState<React.CSSProperties>({});

  const updateDeviceType = useCallback(() => {
    const windowSize = window?.innerWidth;
    if (windowSize > 768) {
      setDeviceType(ScreenTypes.DESKTOP);
    } else if (windowSize > 426) {
      setDeviceType(ScreenTypes.TABLET);
    } else {
      setDeviceType(ScreenTypes.MOBILE);
    }
  }, []);

  useEffect(() => {
    updateDeviceType();
    window?.addEventListener("resize", updateDeviceType);
    return () => {
      window?.removeEventListener("resize", updateDeviceType);
    };
  }, [updateDeviceType]);

  useEffect(() => {
    setCustomStyles(calculateCustomGridCss(props, deviceType));
  }, [props, deviceType]);

  return {
    deviceType,
    customStyles,
  };
};
