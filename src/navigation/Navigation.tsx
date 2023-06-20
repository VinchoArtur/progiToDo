import { NavigationContainerRef, useNavigation } from "@react-navigation/native";

let navigator: NavigationContainerRef<any> | null;

export const setTopLevelNavigator = (
  navigatorRef: NavigationContainerRef<any> | null,
) => {
  navigator = navigatorRef;
};

export const navigateToEditScreen = (taskId: string) => {
  if (navigator) {
    navigator.navigate('EditTask', {taskId});
  }
};


export const useNavigateBack = () => {
  const navigation = useNavigation();

  return () => {
    navigation.goBack();
  };
};
