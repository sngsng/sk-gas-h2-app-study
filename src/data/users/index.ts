export interface UserData {
  id: string;
  password: string;
  name: string;
  birth: string;
  gender: string;
  service: string;
  phone: string;
}

export interface CertiBody {
  name: string;
  birth: string;
  gender: string;
  service: string;
  phone: string;
}

export interface EasyBody {
  name: string;
  phone: string;
}

export interface CertiReq {
  phoneNo: string;
  name: string;
  birthday: string;
  gender: string;
  phoneCorp: string;
  nation: string;
  terms1chk: string;
  terms2chk: string;
  terms3chk: string;
  terms4chk: string;
}
