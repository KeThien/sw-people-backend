module Api
  module V1
    class SpeciesController < ApplicationController
      def index
        @species = Species.order("id ASC")
        render json: @species
      end
      def show
        @species = Species.find(params[:id])
        render json: @species
      end

    end
  end
end
