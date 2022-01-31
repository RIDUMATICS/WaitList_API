export enum Type {
  Investors = 'Investors',
  AssetListers = 'Asset listers',
}

export interface WaitLister {
  /**
   *  The type would be able to accomodate two types of waitlisters:
   *  Investors
   *  Asset listers
   */
  type: Type;
  fullName: string;
  email: string;
  description?: string;
}

interface Resp {
  status: number;
  message: string;
}

export interface ErrorResp extends Resp {
  error?: any;
}

export interface SuccessResp extends Resp {
  data?: any;
}
