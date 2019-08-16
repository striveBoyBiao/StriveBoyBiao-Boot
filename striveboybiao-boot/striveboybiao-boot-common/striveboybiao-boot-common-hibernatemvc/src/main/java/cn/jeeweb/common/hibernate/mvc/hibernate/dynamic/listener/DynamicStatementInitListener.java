package cn.jeeweb.common.hibernate.mvc.hibernate.dynamic.listener;

import cn.jeeweb.common.utils.SpringContextHolder;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import cn.jeeweb.common.hibernate.mvc.hibernate.dynamic.builder.DynamicStatementBuilder;
import cn.jeeweb.common.hibernate.mvc.hibernate.dynamic.builder.NoneDynamicStatementBuilder;

public class DynamicStatementInitListener implements ApplicationListener<ContextRefreshedEvent> {

	protected DynamicStatementBuilder dynamicStatementBuilder = SpringContextHolder.getApplicationContext()
			.getBean(DynamicStatementBuilder.class);

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		try {
			if (this.dynamicStatementBuilder == null) {
				this.dynamicStatementBuilder = new NoneDynamicStatementBuilder();
			}
			dynamicStatementBuilder.init();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}