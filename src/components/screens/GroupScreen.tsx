import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigateBack } from "../../navigation/Navigation";
import { createTaskGroup } from "../../redux/actions/todoActions";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Task } from "../../redux/actions/types";
import { RouteProp } from "@react-navigation/native";
import { styles } from "./styles/group-screen.style";
import { RootState } from "../../redux/store/store";
import { MultiSelect } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProgiButton from "../elements/buttons/ProgiButton";
import { useTranslation } from "react-i18next";

type CreateGroupScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "CreateGroup">;
  route: RouteProp<RootStackParamList, "CreateGroup">;
};

const GroupScreen: React.FC<CreateGroupScreenProps> = (navigation,
                                                       route) => {
  const { t } = useTranslation();
  const navigateBack = useNavigateBack();
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  // @ts-ignore
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleCreateGroup = () => {
    if (groupName.trim() !== "") {
      // @ts-ignore
      dispatch(createTaskGroup(groupName, selectedTasks)); // Вызываем действие для создания группы
      useNavigateBack();
    }
  };

  const renderDataItem = (item: Task, selected: boolean | undefined) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.title}</Text>
        {selected && <Icon name="check" size={30} color="rgba(25,220,56,0.76)" />}
      </View>
    );
  };

  const handleCancel = () => {
    navigateBack();
  };

  return (
    <ScrollView style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollContentContainer}
                keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text>{t('enterGroupName')}</Text>
        <TextInput
          style={styles.input}
          value={groupName}
          onChangeText={setGroupName}
          placeholder={t('groupName')}
        />
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={tasks}
          labelField={t('title')}
          valueField="id"
          placeholder={t('selectTasks')}
          value={selectedTasks}
          search
          searchPlaceholder={t('search')}
          onChange={item => {
            setSelectedTasks(item);
          }}
          renderItem={renderDataItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.title}</Text>
                <Icon color="rgba(227,18,18,0.75)" name="delete" size={17} />
              </View>
            </TouchableOpacity>
          )}
        />
        <StatusBar animated={true} />
        <View style={styles.buttonContainer}>
          <ProgiButton
            icon={null}
            title={t('createGroup')} onPress={handleCreateGroup}
            isDisabled={!!groupName}
            style={{
              buttonStyle: {
                backgroundColor: "rgba(23,211,98,0.24)"
              },
              textStyle: {
                fontWeight: "800",
                fontSize: 20,
                opacity: 1
              }
            }}
          />
          <View style={styles.buttonSpacer} />
          <ProgiButton
            title={t("cancel")}
            onPress={handleCancel}
            icon={null}
            style={{
              buttonStyle: {
                backgroundColor: "rgba(229,17,79,0.24)"
              },
              textStyle: {
                fontWeight: "800",
                fontSize: 20,
                opacity: 1
              }
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default GroupScreen;
