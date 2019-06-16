Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :employees, only: %i[index]
  resources :branches, only: %i[index]

  namespace :bff do
    resources :employees, only: %i[index]
  end
end
