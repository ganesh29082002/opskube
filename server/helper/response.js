export default {
    successResponse: (res, code, resData, message) => {
      res.status(200).json({
        status: "SUCCESS",
        code,
        data: resData,
        message,
        length: resData?.length || 0
      });
    },
    badRequest: (res, code, resData) => {
      res.status(400).json({
        status: "Failure",
        code: code,
        message: resData
      });
    },
    conflictErrorMsgResponse: (res, code, resData) => {
      res.status(409).json({
        status: "ERROR",
        code: code,
        message: resData
      });
    },
    somethingErrorMsgResponse: (res, code, message , data="") => {
      res.status(200).json({
        status: "ERROR",
        code: code,
        message: message,
        data: data
      });
    },
    errorMessageResponse: (res, code, resData) => {
      res.status(200).json({
        status: "ERROR",
        code: code,
        message: resData
      });
    },
    errorResponse: (res, errName) => {
      res.status(errors[errName].status).json({
        error: errors[errName].error,
        errorCode: errors[errName].errorCode
      });
    },
    unAuthorizedErrorMsgResponse: (res, code, message , data="") => {
      res.status(403).json({
        status: "ERROR",
        code: code,
        message: message,
        data: data
      });
    },
    successPdfResponse: (res, resData) => {
      res.pdf(resData);
    }
  };
  
  export const responseStatus = {
    successStatus: true,
    failedStatus: false
  };