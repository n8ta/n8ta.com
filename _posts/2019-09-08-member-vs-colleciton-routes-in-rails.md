---
layout: post
title:  "The difference between member and collections routes in rails"
date:   2019-07-21 06:20:00 +0700
categories: [Rails]
---


Rails resources are fantastic but the docs can be a little lacking in depth. Unfortunately it’s not exactly clear from the docs how you can create a route like /documents/trash without the show route getting in the way.

I recently found myself in the situation where I wanted to create these two routes:
{% highlight url %}/documents/trash{% endhighlight %}
{% highlight url %}/documents/1/{% endhighlight %}
In order to help a user easily restore deleted documents.

My naive implementation was using a member route, take a look:
{% highlight ruby %}
  get '/users/trash' => 'users#trash', as: "users_trash"
  resources :users
    member do
      ... 
      get ':user_id' => 'users#show'
    end
    resources :user_roles, only: [:new, :destroy, :create]
  end
{% endhighlight %}
Now this did function but it was in no way the rails way of doing things. Instead after some reading I learned the right way to do this was collection routes:
{% highlight ruby %}
  resources :users do
    collection do
      get 'trash'
    end
    member do
      ...
    end
  end
{% endhighlight %}
Leaving out my irrelevant member routes you can see I've added a collection route. <strong>Collection routes are routes that belongs to the entire collection of resources not just one member. Member routes are routes that apply an action to a specific member of the resource.</strong>


So next time you need a route inside a resource don't use a one-off use a collection route.

