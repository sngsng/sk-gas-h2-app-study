import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams } from '../types';

export default <T extends keyof RootStackParams>() =>
  useRoute<RouteProp<RootStackParams, T>>();
