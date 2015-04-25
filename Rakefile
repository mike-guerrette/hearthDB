require 'net/ssh'

def cmd(cmd_str)
	Net::SSH.start(
		'127.0.0.1',
		'vagrant',
		:port => 2222,
		:password => 'vagrant',
		:host_key => '.vagrant/machines/default/virtualbox/private_key'
	) do |session|
		begin
			session.exec! cmd_str do |channel, stream, data|
				$stdout << data if stream == :stdout
				$stderr << data if stream == :stderr
			end
		rescue Interrupt
			session.exec! "killall -SIGINT node"
			session.exec! "killall -SIGINT nodejs"
		end
	end
end

task :install do
	cmd "cd hearthDB && npm install --no-bin-link"
end

task :start do
	cmd "node hearthDB/server.js"
end