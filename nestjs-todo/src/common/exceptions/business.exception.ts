import { HttpException, HttpStatus } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from './business.error.codes';

type BusinessError = {
    code: number;
    message: string;
    success: boolean;
    data: null;
};

export class BusinessException extends HttpException {
    constructor(message: Partial<BusinessError> | string, code?: number) {
        if (typeof message === 'string') {
            message = {
                ...BusinessException.defaultExceptionResp,
                message: message,
            };
        }
        let _resp = Object.assign(BusinessException.defaultExceptionResp, message);

        if (code) {
            _resp = Object.assign(BusinessException.defaultExceptionResp, code);
        }
        super(
            _resp,
            HttpStatus.OK,
        );
    }

    static defaultExceptionResp: BusinessError = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: 'fail',
        success: false,
        data: null,
    };

    // 举例：自定义无权限异常（大家根据自己的业务情况追加）
    static throwForbidden() {
        throw new BusinessException({
            code: BUSINESS_ERROR_CODE.ACCESS_FORBIDDEN,
            message: '抱歉哦，您无此权限！',
        });
    }

    static throwUnAuthorization() {
        throw new BusinessException({
            code: BUSINESS_ERROR_CODE.TOKEN_INVALID,
            message: '登录状态已失效，请重新登录',
        });
    }

    static throwResourceNotFound(message?: string) {
        throw new BusinessException({
            code: BUSINESS_ERROR_CODE.RESOURCE_NOT_FOUND,
            message: message || '抱歉，您查询的资源不存在',
        });
    }
}