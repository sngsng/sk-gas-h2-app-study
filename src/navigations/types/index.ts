import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CertiBody, EasyBody, UserData } from '@src/data';

export type RootStackParams = {
  Tutorial: undefined;
  Main: undefined;
  Signin: undefined;
  Signup: undefined;
  Home: undefined;
  SignupAgree: undefined;
  InfoInput: undefined;
  InfoCertification: { id: string; password: string };
  StackSignUp: undefined;
  SignUpComplete: undefined;
  FindId: undefined;
  Auth: { easyBody?: EasyBody; certiBody?: CertiBody; signUpData?: UserData };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParams>;
