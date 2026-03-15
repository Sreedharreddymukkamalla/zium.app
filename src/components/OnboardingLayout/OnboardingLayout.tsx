import { ReactNode } from "react";
import { NON_BREAKING_HYPHEN } from "../../utils/text";
import { Logo } from "../Logo/Logo";
import styles from "./OnboardingLayout.module.scss";

interface OnboardingLayoutProps {
  children: ReactNode;
  stepsCount: number;
  selectedStepIndex: number;
}
export const OnboardingLayout = ({ children, stepsCount, selectedStepIndex }: OnboardingLayoutProps) => {
  return (
    <div className={styles.fullHeightWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <div className={styles.mobileDivider}></div>
          <div className={styles.content}>
            <div className={styles.head}>
              <Logo height={40} color="var(--color-content-accent)" />
              <h1 className={styles.heading}>Formula 1 Multi{NON_BREAKING_HYPHEN}View Experience</h1>
            </div>
            {children}
            <Steps count={stepsCount} selectedIndex={selectedStepIndex} />
          </div>
          <div className={styles.mobileDivider}></div>
          <div className={styles.disclaimer}>
            This website is unofficial and is not associated in any way with the Formula 1 companies. F1, FORMULA ONE,
            FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One
            Licensing B.V.
          </div>
        </div>
      </div>
    </div>
  );
};

interface StepsProps {
  count: number;
  selectedIndex: number;
}
export const Steps = ({ count, selectedIndex }: StepsProps) => {
  if (count === 0) {
    return null;
  }

  return (
    <div className={styles.stepsContainer}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn(styles.step, { [styles.isSelected]: i === selectedIndex })}></div>
      ))}
    </div>
  );
};
