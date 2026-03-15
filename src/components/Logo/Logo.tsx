import cn from "classnames";
import logoSrc from "../../assets/raceye.png";
import styles from "./Logo.module.scss";

type LogoProps = {
  height?: number;
  width?: number;
  className?: string;
  color?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const Logo = ({ height, width, className, color, style, ...props }: LogoProps) => {
  return (
    <img
      src={logoSrc}
      className={cn(styles.logo, className)}
      height={height}
      width={width}
      style={{ color, ...style }}
      {...props}
    />
  );
};
