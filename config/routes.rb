Rails.application.routes.draw do
  resources :chatrooms
  resources :wishlists
  resources :messages
  resources :reviews
  resources :item_types
  resources :cities
  resources :categories
  resources :items
  resources :users

  get "/items/find/last-added", to: "items#last_items_added"
  get "/items/:id", to: "items#show"
  get "/items/category/:category_id", to: "items#show_category_items"
  get "/items/location/:city_id", to: "items#show_city_items"
  get "/items/find/:item_name", to: "items#find_by_name"
  get "/items/count/total", to: "items#total"
  get "/users/:id", to: "users#show"
  get "/users/:id/rating", to: "users#rating_average"
  get "/me", to: "users#logged_id"



  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  post '/items', to: "items#create"
  post "wishlist", to: "wishlists#create"

  delete "/logout", to: "sessions#logout"

    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
