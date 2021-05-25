import { ThirdParty } from '../interface';

export interface ClientSideLoginData {
  thirdPartyId: ThirdParty;
  email: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  address1?: string;
  address2?: string;
  stateProvince?: stateProvinceString;
  postalCode?: string;
  country?: countryString;
  gender?: genderNumber;
  phone?: string;
  birthdate?: dateString;
}

/**
 * State/Province must be one of the following strings, case-sensitive. If an invalid
 * string is given, we will treat it like nothing was passed in for that data.
 * 
 * Example strings are provided below, but you can use the Name or Abbreviation
 * of any State/Province documented in the docs/states-provinces.csv file.
 */
export type stateProvinceString = 'Missouri' | 'MO' | 'Alberta' | 'AB' | 'Durango' | 'DGO'; // ...

/**
 * Country must be one of the following strings, case-sensitive. If an invalid
 * string is given, we will treat it like nothing was passed in for that data.
 * 
 * Example strings are provided below, but you can use the Name, TwoLetterCode,
 * or ThreeLetterCode of any Country documented in the docs/countries.csv file.
 */
export type countryString = 'Canada' | 'CA' | 'CAN' | 'United States of America' | 'US' | 'USA'; // ...

/**
 * Gender must be one of the following numbers. If an invalid
 * number is given, we will treat it like nothing was passed in for that data.
 */
export enum genderNumber {
  Male = 1,
  Female = 2,
  PreferNotToSay = 3,
  Other = 4,
  NonBinary = 5
}

/** 
 * Date must be provided as a string in ISO 8601 format, with no time or
 * time zone component. Examples: '2021-01-01' or '1999-12-31'
 */
export type dateString = string;