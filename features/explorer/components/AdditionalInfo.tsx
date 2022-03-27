import { DuplicateIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import Button from 'components/Button';
import { buttonIconSize } from 'components/Button/constants';
import { cloneElement } from 'react';
import toast from 'react-hot-toast';
import { copyToClipboard } from 'utils/copyToClipboard';

const IconComponent = ({
  icon,
}: Pick<AdditionalInfoProps, 'icon'>): JSX.Element =>
  cloneElement(icon, buttonIconSize['medium']);

export type AdditionalInfoProps = {
  icon: JSX.Element;
  label: string;
  value: string | number | JSX.Element;
  isCopyEnabled?: boolean;
  wrapperClassName?: string;
};

const AdditionalInfo = ({
  icon,
  label,
  value,
  isCopyEnabled,
  wrapperClassName = '',
}: AdditionalInfoProps) => {
  const wrapperClasses = classNames(
    'flex items-center space-x-4',
    wrapperClassName
  );

  const onCopy = () => {
    copyToClipboard({ value: `${value}` });
    toast.success(`${label} copied to the clipboard!`);
  };

  return (
    <div className={wrapperClasses}>
      <IconComponent icon={icon} />
      <div className="flex-1 flex items-center space-x-1 text-sm">
        <span className="font-medium">{label}:</span>
        <span>{value}</span>
      </div>

      {isCopyEnabled && (
        <Button
          colorScheme="gray"
          size="small"
          icon={<DuplicateIcon />}
          onClick={onCopy}
        >
          Copy
        </Button>
      )}
    </div>
  );
};

export default AdditionalInfo;
