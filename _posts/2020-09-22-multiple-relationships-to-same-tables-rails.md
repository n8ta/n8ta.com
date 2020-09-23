---
layout: post
title:  "Multiple belongs_to / has_many relationships to the same model rails"
date:   2020-09-22 09:00:00 +0700
categories: [Rails]
---

First create a table two references. We'll create a bike table with a owner and a seller reference. 

```ruby
# db/migrate/123_create_bikes.rb
class CreateBikes < ActiveRecord::Migration[6.0]
  def change
    create_table :bikes do |t|
      t.references :owner, index: true, foreign_key: {to_table: :people} # column is owner_id
      t.references :seller, index: true, foreign_key: {to_table: :people} # column is seller_id
      t.timestamps
    end
  end
end
```

Now we create our two models. Bikes belong to two different people owners and sellers.

```ruby
# Bike.rb
class Bike < ApplicationRecord
  belongs_to :owner, :class_name => 'Person', :foreign_key => 'owner_id'
  belongs_to :seller, :class_name => 'Person', :foreign_key => 'seller_id'
end
```

And people have two kinds of bikes, those they've sold and those they own.

```ruby
# Person.rb
class Person < ApplicationRecord
  has_many :owned_bikes, class_name: 'Bike', foreign_key: 'owner_id' 
  has_many :sold_bikes, class_name: 'Bike', foreign_key: 'seller_id' 
end
```

Now let's see how it works in the rails console
```
$ bundle exec rails console

p1 = Person.create(name: "P1!")
p2 = Person.create(name: "P2!")
bike = Bike.create(owner: p1, seller: p2)
bike.owner.name
> "P1!"
bike.seller.name
> "P2!"
p1.owned_bikes.pluck(:id)
> [1]
p1.sold_bikes.pluck(:id)
> []
p2.owned_bikes.pluck(:id)
> [0]
p2.sold_bikes.pluck(:id)
> [1]
```

And it all looks good!
