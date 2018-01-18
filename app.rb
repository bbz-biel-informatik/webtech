require 'sinatra'

get '/*.md' do
  send_file "#{params[:splat].first}.md"
end

get '/plugin/*' do |file|
  send_file "plugin/#{params[:splat].first}"
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

get '/:number' do
  @number = params[:number]
  erb "slides/show".to_sym
end


