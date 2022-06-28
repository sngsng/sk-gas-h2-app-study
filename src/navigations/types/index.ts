import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParams = {
  Tutorial: undefined;
  Main: undefined;
  Signin: undefined;
  Signup: undefined;
  Home: undefined;
  SignupAgree: undefined;
  InfoInput: undefined;
  InfoCertification: { idValue: string; password: string };
  StackSignUp: undefined;
  FindId: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParams>;
