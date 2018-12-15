class ExceptionNotifier
  def self.logger_notify(e, params)
    Rails.logger.error e.class
    Rails.logger.error e.message
    Rails.logger.error e.backtrace.join("\n")
    Rails.logger.error params
  end
end