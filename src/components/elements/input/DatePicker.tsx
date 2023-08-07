import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import {styles} from '../../screens/styles/edit-task.style';

interface IDatePicker {
  setData: (data: Date) => void;
  date: Date | undefined;
  style: ViewStyle;
  placeholderText: string;
}

const DatePicker: React.FC<IDatePicker> = ({
  setData,
  date,
  style,
  placeholderText,
}) => {
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const handleDateConfirm = (newDate: Date) => {
    setData(newDate);
    setIsDateTimePickerVisible(false);
  };
  const handleCloseDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };
  const handleOpenDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };
  return (
    <TouchableOpacity onPress={handleOpenDateTimePicker}>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="datetime"
        display="default"
        onConfirm={handleDateConfirm}
        onCancel={handleCloseDateTimePicker}
      />
      <Text style={style}>
        {date ? new Date(date).toLocaleString() : placeholderText}
      </Text>
    </TouchableOpacity>
  );
};

export default DatePicker;
