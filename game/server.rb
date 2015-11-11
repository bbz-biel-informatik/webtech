require 'sinatra'
require 'json'
require 'sinatra/json'
require 'sinatra/cross_origin'

configure do
  enable :cross_origin
end

before do
  halt 200 if request.request_method == 'OPTIONS'
end

peers = []

post '/hello' do
  id = request.body.read
  peers << JSON.parse(id)
  200
end

post '/goodbye' do
  id = JSON.parse(request.body.read)
  peers.delete id
  200
end

get '/all' do
  json peers
end
