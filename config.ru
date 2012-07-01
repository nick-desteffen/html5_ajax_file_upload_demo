require 'rubygems'
require 'bundler'

environment = ENV['RACK_ENV'] ? ENV['RACK_ENV'].to_sym : :development
Bundler.require(:default, environment)

set :run, false
set :env, environment

require './app'

run Application