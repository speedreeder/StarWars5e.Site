export interface ReferenceTableType {
  content: string,
  contentType: string,
  name: string
}

export interface SearchResultType {
  globalSearchTermType: string,
  path: string,
  fullName: string,
  searchText: string,
  rowKey: string
}

export interface CharacterValidationType {
  code: number,
  isValid: boolean,
  message: string
}

export interface AuthType {
  userName: string,
  accessTokenExpiration: number,
  accessTokenExpirationDate: Date
}

export interface UserType {
  userName: string,
  mostRecentAuthType: string,
  lastLoginTimeUtc: Date,
  registrationDateUtc: Date
}
