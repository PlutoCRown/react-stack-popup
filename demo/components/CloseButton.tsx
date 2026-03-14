interface CloseButtonProps {
  onClick?: () => void;
}

export function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button type="button" className="close-button" onClick={onClick}>
      关闭
    </button>
  );
}
