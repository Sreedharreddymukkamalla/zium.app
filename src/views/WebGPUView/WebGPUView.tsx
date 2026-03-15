import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Button } from "../../components/Button/Button";
import styles from "./WebGPUView.module.scss";

const WEBGPU_VIZ_URL = import.meta.env.VITE_WEBGPU_VIZ_URL ?? "http://localhost:5175";

export const WebGPUView = () => {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleClose = useCallback(() => {
    if (window.opener) {
      window.close();
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <span className={styles.title}>3D Race View</span>
        <Button variant="Secondary" size="Action" iconLeft={XMarkIcon} onClick={handleClose} aria-label="Close 3D view">
          Close
        </Button>
      </div>
      <iframe
        ref={iframeRef}
        src={WEBGPU_VIZ_URL}
        className={styles.iframe}
        title="F1 WebGPU 3D Race Visualization"
        allow="accelerometer; gyroscope; xr-spatial-tracking"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
      />
    </div>
  );
};
