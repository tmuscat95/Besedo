import { User, UserDto } from "./DataModelTypes";

export enum ModalTypes {
  Add = 0,
  Modify = 1,
}

export type HomeLocationState = {
  rerender: boolean;
};

export enum StateActionType {
  Create,
  Update,
  Delete,
  Refresh,
}

export type StateAction = {
  type: StateActionType;
  payload?: User | UserDto | number;
};
