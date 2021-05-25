import { ThirdParty } from '../interface';

export type uuid = string | number;

export interface ApiBasedLoginData {
  thirdPartyId: ThirdParty;
  uuid: uuid;
}