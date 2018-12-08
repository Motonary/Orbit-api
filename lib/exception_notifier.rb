class ExceptionNotifier
  self.logger_notify(e, env, params)
    Rails.logger.error e.class
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    Rails.logger.error env
    Rails.logger.error params
  end
end