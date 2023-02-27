export const Card = ({ color="back", value="unknown", onClick }: CardProps) => {
   const cardClass = `card card--${color}-${value}`;
   return <div className={cardClass} onClick={onClick}></div>;
};

export interface CardProps {
   color?: string;
   value?: string;
   onClick?: () => void;
}
