import { outlineVariants, solidVariants } from "../utils/colorVariants";

type BadgeProps = {
  type: string;
  solid?: boolean;
};

export default function Badge({ type, solid = false }: BadgeProps): JSX.Element {
  // Obtenha a classe CSS correta com base no estado solid ou outline
  const className = solid ? solidVariants[type.toLowerCase()] || 'bg-gray-300 text-black' : outlineVariants[type.toLocaleLowerCase()] || 'border border-gray-300 text-gray-300';

  return (
    <span
      className={`border-2 ${className} select-none inline-flex rounded-full px-2 py-0.5 text-sm font-medium`}
    >
      {type}
    </span>
  );
}