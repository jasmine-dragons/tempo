import styles from "./style.module.scss";

interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  return <div className={`${styles.loading} ${className || ""}`} />;
};

export default Loading;
