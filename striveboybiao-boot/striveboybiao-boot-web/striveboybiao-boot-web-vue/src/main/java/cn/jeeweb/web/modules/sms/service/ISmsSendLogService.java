package cn.jeeweb.web.modules.sms.service;

import cn.jeeweb.web.modules.sms.entity.SmsSendLog;
import cn.jeeweb.common.mybatis.mvc.service.ICommonService;

import java.io.Serializable;
import java.util.List;

/**
* All rights Reserved, Designed By www.jeeweb.cn
*
* @version V1.0
* @package cn.jeeweb.web.modules.sms.service
* @title: 发送日志服务接口
* @description: 发送日志服务接口
* @author: 王存见
* @date: 2018-09-14 09:47:53
* @copyright: 2018 www.jeeweb.cn Inc. All rights reserved.
*/
public interface ISmsSendLogService extends ICommonService<SmsSendLog> {
    /**
     * <p>
     * 短信重发
     * </p>
     *
     * @param idList 主键ID列表
     * @return boolean
     */
    boolean retrySend(List<? extends Serializable> idList);
}