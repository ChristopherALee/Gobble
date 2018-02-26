Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :create, :show, :update]
    resource :session, only: [:create, :destroy]

    resources :channels, only: [:index, :create, :show, :update, :destroy]
    resources :memberships, only: [:index, :create, :show, :destroy]
    resources :messages, only: [:index, :create, :show, :update, :destroy]

    get '/channels/:name/messages', to: 'channels#messages'

    resources :direct_message_channels, only: [:index, :show, :create, :destroy]
    resources :direct_message_channel_memberships, only: [:index, :create, :show, :destroy]
    resources :direct_messages, only: [:index, :create, :show, :update, :destroy]

    get '/direct_message_channels/:id/messages', to: 'direct_message_channels#messages'
  end
end
