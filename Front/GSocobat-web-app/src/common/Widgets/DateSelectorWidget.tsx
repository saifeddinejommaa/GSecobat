import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
type DateSelectorProps = {
    selectedDate: Date,
    onChange:(date:Date | null) => void
};
export function DateSelector({onChange, selectedDate}: DateSelectorProps) {
    return (
            <DatePicker
                selected={selectedDate}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                className="glass-input"
                popperPlacement="bottom-start"
            />
    );
}