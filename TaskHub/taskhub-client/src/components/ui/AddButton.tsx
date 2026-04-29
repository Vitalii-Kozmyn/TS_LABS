import { useTheme } from '../../context/ThemeContext';

interface AddButtonProps {
    onClick: () => void;
}

function AddButton({ onClick }: AddButtonProps) {
    const { theme } = useTheme();

    return (
        <button className={`btn btn--add click-element ${theme}-border`} onClick={onClick}>
            + Додати завдання
        </button>
    );
}

export default AddButton;