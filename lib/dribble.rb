require 'net/http'
require 'json'

module Sntaln
  module Dribble

    module_function

    DRIBBLE_USERNAME = 'sntaln'
    DRIBBLE_API_URL = 'http://api.dribbble.com/players/%s/shots'

    def get_shots
      shots = []
      navigate_through_shots do |shot|
        shots << shot
      end
      shots
    end

    def navigate_through_shots(&block)
      page = 1
      max_pages = 1

      while page <= max_pages
        response = get_page(page)
        response['shots'].each(&block)
        page += 1
        max_pages = response['pages'].to_i
      end
    end

    def get_page(page)
      uri = URI(DRIBBLE_API_URL % DRIBBLE_USERNAME)
      uri.query = URI.encode_www_form(per_page: 30, page: page)
      raw_response = Net::HTTP.get_response(uri).body

      JSON.parse(raw_response)
    end
  end
end
