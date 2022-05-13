import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {NavigationProp, NavigatorScreenParams} from "@react-navigation/native";

export type RootTabParamList = {
    Home: undefined,
    UsersScreen: NavigatorScreenParams<RootStackParamList>
    Details: undefined
    Todolists: undefined
};

export type RootStackParamList = {
    Stack1: undefined
    Stack2: undefined
    Stack3: undefined
};

export type HomeProps = NativeStackScreenProps<RootTabParamList, 'Home'>;
export type UsersProps = NativeStackScreenProps<RootTabParamList, 'UsersScreen'>;
export type DetailsProps = NativeStackScreenProps<RootTabParamList, 'Details'>;

export type NavigationUseType = NavigationProp<RootTabParamList>

