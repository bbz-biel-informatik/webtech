require 'sinatra/base'

class MyApp < Sinatra::Base
  get '/presentations/*.md' do
    send_file "presentations/#{params[:splat].first}.md"
  end

  get '/' do
    send_file 'index.html', layout: false
  end

  get '/skript.html' do
    send_file 'skript_while.html'
  end

  get '/plugin/*' do |file|
    send_file "plugin/#{params[:splat].first}"
  end

  get '/game/demo.zip' do
    if File.exist?('game/demo.zip')
      send_file 'game/demo.zip'
    end
  end

  get '/game/*' do |file|
    send_file "game/#{params[:splat].first}"
  end


  get '/samples/*' do |file|
    send_file "samples/#{params[:splat].first}"
  end

  get '/tests/*' do |file|
    send_file "tests/#{params[:splat].first}"
  end

  get '/exercises/*' do |file|
    send_file "exercises/#{params[:splat].first}"
  end

  get '/css/*' do |file|
    send_file "css/#{params[:splat].first}"
  end

  get '/images/*' do |file|
    send_file "images/#{params[:splat].first}"
  end

  get '/lib/*' do |file|
    send_file "lib/#{params[:splat].first}"
  end

  get '/js/*' do |file|
    send_file "js/#{params[:splat].first}"
  end

  get '/*.html' do
    @number = params[:splat].first.gsub('index', '').to_s
    puts "#{@number}.md"
    if !File.exist?("presentations/#{@number}.md")
      @number = "0" + @number if @number.to_i < 10
    end
    erb "slides/show".to_sym
  end
end
