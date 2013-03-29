require 'rubygems'
require 'bundler'
require 'erb'
require './lib/dribble'
Bundler.require(:default)

@shots = Sntaln::Dribble.get_shots.reverse.sort_by {|shot| (-1) * shot['likes_count'].to_i }
template = ERB.new(File.open("#{Dir.pwd}/index.html.erb", File::RDONLY).read)
body = template.result(binding)

map "/" do
  use Rack::Static, urls: ["/assets"], root: Dir.pwd

  run lambda { |env|
    headers = {
      "Content-Type"  => "text/html",
      "Cache-Control" => "public, max-age=86400"
    }

    [200, headers, [body]]
  }
end
