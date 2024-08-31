import { LoadingSpinner } from '@/components';
import { ButtonProps } from '@/interfaces';

const Button = ({
  variant,
  className = '',
  text,
  active = true,
  isLoading = false,
  onClick,
}: ButtonProps) => {
  let baseClasses = 'button bg-light px-2 py-1 text-white';
  if (variant === 'PRIMARY')
    baseClasses =
      'button bg-primary px-2 py-1 shadow-lg text-white hover:bg-transparent hover:text-primary border-2 border-primary hover:scale-105 transition-all';
  else if (variant === 'OUTLINE')
    baseClasses =
      'button bg-light-bg border-2 shadow-lg border-primary px-2 py-1 text-primary hover:scale-105 transition-all';
  else if (variant === 'GHOST')
    baseClasses =
      'button bg-accent px-2 py-1 text-greyDark hover:bg-transparent hover:text-black border-2 hover:border-black transition-all';
  // Add a variant for Success
  else if (variant === 'SUCCESS')
    baseClasses =
      'button bg-success px-2 py-1 text-white hover:bg-transparent hover:text-success border-2 border-success hover:scale-105 transition-all';
  if (!active) baseClasses = 'button bg-greyDark text-contentLight px-2 py-1';

  const loadingContainer = isLoading && (
    <LoadingSpinner
      height={3}
      width={3}
      className='bg-secondary'
      borderColour='white'
    />
  );

  return (
    <button
      className={`${baseClasses} ${className} flex items-center justify-center gap-2`}
      disabled={!active}
      onClick={onClick}
    >
      {loadingContainer}
      {text}
    </button>
  );
};

export default Button;
