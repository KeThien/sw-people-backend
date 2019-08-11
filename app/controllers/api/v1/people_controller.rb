module Api
  module V1
    class PeopleController < ApplicationController
      def index
        @people = Person.order("name ASC")
        render json: @people
      end
      def show
        @person = Person.find(params[:id])
        render json: @person
      end

      def create
      end

      def update
        @person = Person.find(params[:id])
        @person.update_attributes(person_params)
        render json: @person
      end

      def destroy
      end
      
      private

      def person_params
        params.require(:person).permit(:name, :height, :mass, :hair_color, :skin_color, :eye_color, :birth_year, :gender, :species_id, :homeworld)
      end
    end
  end
end
