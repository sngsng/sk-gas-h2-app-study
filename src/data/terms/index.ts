export interface ResTerms {
  resCode: string;
  detailMsg: string;
  trcNo: string;
  responseData: {
    cluList: {
      cluCd: string;
      cluVer: string;
      mndtAgrYn: string;
      cluShrtCtt: string;
    }[];
    dbio_total_count: null;
  };
}

export interface Terms {
  cluCd: string;
  cluVer?: string;
  mndtAgrYn?: string;
  cluShrtCtt: string;
}
export interface TermsList extends Terms {
  isChecked?: boolean;
}

export interface ResTermsDetail {
  resCode: string;
  detailMsg: string;
  trcNo: string;
  responseData: {
    cluTelgCtt: string;
  };
}
