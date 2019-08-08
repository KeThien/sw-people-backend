module Api
  module V1
    class PeopleController < ApplicationController
      def index
        @people = Person.all
        render json: @people
      end

      def create
      end

      def update
        person = Person.find(params[:id])
        person.update_attributes(perso_params)
        render json: person
      end

      def destroy
      end
      
      private

      def people_params
        params.require(:person).permit(:name)
      end
    end
  end
end
