export interface SystemUser {
  _id:             string;
  enable:          boolean;
  username:        string;
  password:        string;
  role:            string;
  commercial_code: string;
  personal_info:   PersonalInfo;
}

export interface PersonalInfo {
  ci:        string;
  full_name: string;
  address:   string;
  phone:     string;
}

export type User = {
  _id: string;
  status: boolean;
  name: string;
  username: string;
  password: string;
  address: string;
  phone: string;
  dom_description: string;
  role: string;
}
