---
layout: post
title:  "Factory Bot Rails: Creating dummy data for developing your application "
date:   2019-05-01 06:20:00 +0700
categories: [Rails]
---

It's often helpful to see how our UI's scale with lots of data in them but seeding data manually in very slow. So using <a href='https://github.com/thoughtbot/factory_bot_rails'>factory_bot_rails</a> and <a href='https://github.com/stympy/faker'>Faker</a> I'll show you how to make a whole lot of realistic data quickly.

First step install the gems. Add these gems to your Gemfile:
{% highlight ruby %}
group :development, :test do
  gem 'factory_bot_rails'
  gem 'faker'
end
{% endhighlight %}

Next we'll need to setup our factories. A factory is an easily called snippet that creates a model for you. In general they are found in the `test/` `spec/` 
and `factories/` directories. I generally put mine in `spec/factories/model_name.rb`. So for an an example model of a user, we might provide a firstname, lastname, Department (a belongs to relationship), and username.

{% highlight ruby %}
# spec/factories/user.rb
FactoryBot.define do
  factory :user do
    firstname { 'John' }
    lastname  { 'Doe' }
    department  { Department.all[0] } # we're assuming a department exists here
    username { 'cmw233' }
  end
end
{% endhighlight %}


But this isn't great as it will create the same user every time. What if we want each user to be unique? 

Enter Faker. Faker allows you to generate either deterministic (keeps your test cases consistent) to random-ish data of many many many types. Faker can generate names, addresses, phone numbers, countries, almost whatever you need. Here's how you call it.
{% highlight ruby %}
fname = Faker::Name::first_name
{% endhighlight %}

And to see a full list of Faker's <a href='https://github.com/stympy/faker#generators'>see this list.</a>

Now combining the two ideas we can do something like this:


{% highlight ruby %}
# spec/factories/user.rb
FactoryBot.define do
  factory :user do
    firstname { Faker::Name::first_name }
    lastname  { Faker::Name::last_name }
    department  { Department.all[0] }
    username { Faker::Internet.username }
  end
end
{% endhighlight %}


And with a little bit of ruby-foo outside of Factory Bot or Faker you can randomize the relationship by selecting a random # between 0 and the number of departments - 1. 
{% highlight ruby %}
    department  { Department.all[rand(0..Department.all.length-1)] }
{% endhighlight %}


Okay now that we have factories all set up lets call them from our seeds. We can either build or create a factory. Building a factory creates the model and fills the attributes, creating it does the same but it also saves. Here's what your seeds.rb could look like:


{% highlight ruby %}
# db/seeds.rb
for x in 1..1000 do
  FactoryBot.create(:user)
  # create 1000 users and save them
end
special_user = FactoryBot.build(:user)
special_user.firstname = "Nate"
special_user.lastname = "who wrote this"
special_user.save! # without this the model wouldn't be saved to the db.
{% endhighlight %}
