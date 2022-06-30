export interface UserData {
  id: string;
  password: string;
  name: string;
  birth: string;
  gender: string;
  service: string;
  phone: string;
}

export type CertiBody = {
  name: string;
  birth: string;
  gender: string;
  service: string;
  phone: string;
};

export interface EasyBody {
  name: string;
  phone: string;
}
