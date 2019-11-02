rails_env = ENV.fetch("RAILS_ENV")

# number of processes
$dev_processes  = 1 # number of child processes for development 
$prod_processes = 5 # number of child processes for production

# timeout seconds if timeout, slave"s gonna be restarted
$timeout = 30

# set variables
# $app_dir = "/var/www/rails/Orbit-api"
if rails_env == "production"
  $app_dir = "/var/www/rails/Orbit-api"
  working_directory $app_dir
end

$listen  = File.expand_path 'tmp/sockets/.unicorn.sock', $app_dir
$pid     = File.expand_path 'tmp/pids/unicorn.pid', $app_dir
$std_log = File.expand_path 'log/unicorn.log', $app_dir

# set config
worker_processes(rails_env == "production" ? $prod_processes : $dev_processes)
stderr_path $std_log
stdout_path $std_log
timeout $timeout
listen  $listen
pid $pid

# loading booster
preload_app true

if rails_env == "development"
  Thread.start(STDOUT.dup) do |printer|
    printer.sync = true

    logs = [
      File.open("log/#{rails_env}.log"),
      File.open("log/unicorn.log"),
    ]
    logs.each { |log| log.seek(0, IO::SEEK_END) }

    loop do
      logs.each do |log|
        printer.puts log.readlines
      end
      sleep 0.1
    end
  end
end

# before start forking worker
before_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.connection.disconnect!

  old_pid = "#{server.config[:pid]}.oldbin"
  if old_pid != server.pid
    begin
      Process.kill "QUIT", File.read(old_pid).to_i
    rescue Errno::ENOENT, Errno::ESRCH
    end
  end
end

# after finish forking worker
after_fork do |server, worker|
  defined?(ActiveRecord::Base) and ActiveRecord::Base.establish_connection
end
