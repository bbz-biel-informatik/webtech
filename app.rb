require 'sinatra/base'

class MyApp < Sinatra::Base
  get '/presentations/*.md' do
    send_file "presentations/#{params[:splat].first}.md"
  end

  get '/' do
    send_file 'index.html', layout: false
  end

  get '/skript.html' do
    send_file 'skript.html'
  end

  get '/plugin/*' do |file|
    send_file "plugin/#{params[:splat].first}"
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
    if !File.exist?("#{@number}.md")
      @number = "0" + @number
    end
    erb "slides/show".to_sym
  end
end
