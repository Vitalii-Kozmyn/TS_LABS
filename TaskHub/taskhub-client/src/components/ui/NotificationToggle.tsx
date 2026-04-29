import type { NotificationToggleProps } from '../../types/notification';

function NotificationToggle({ checked, onChange, label }: NotificationToggleProps) {
	return (
		<label>
			<input
				type="checkbox"
				checked={checked}
				onChange={(e) => onChange(e.target.checked)}
			/>
			{label && <span>{label}</span>}
		</label>
	);
}

export default NotificationToggle;