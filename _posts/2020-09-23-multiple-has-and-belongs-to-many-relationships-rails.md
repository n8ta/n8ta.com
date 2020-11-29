---
layout: post
title:  "Multiple has_and_belongs_to_many relationships to the same model rails"
date:   2020-09-23 09:00:00 +0700
categories: [Rails]
---

Sometimes you need multiple has_and_belongs_to_many relationships to another model. Obviously in sql this would be easy, either create two join tables
or add some additional column to the join table specifying the type of relationship. We'll use the first approach in rails.

### Our example:
People (have) has_and_belongs_to_many buildings.
1. A person may own a building (we'll call it a property)
2. A person may have visited a building (we'll call it a location).
Assume we have tables for people and buildings.

First we'll create a new migration (you may not be using bundler)
```bash
$ bundle exec rails g migration people_own_and_visit_buildings
```

This will create a new file `db/migrate/xyz_people_own_and_visit_buildings.rb`

In this file we will define a migration that creates a new [join table](https://apidock.com/rails/ActiveRecord/ConnectionAdapters/SchemaStatements/create_join_table):
Here's the minimum possible to create two join table in rails. Scroll to the bottom for a complete implementation with null checks, foreign keys, and indices.
```ruby
# db/migrate/xyz_people_own_and_visit_buildings.rb
class PeopleOwnAndVisitBuildings < ActiveRecord::Migration[6.0]
  def change
    create_join_table(:people, :buildings, table_name: "person_building_visited")
    create_join_table(:people, :buildings, table_name: "person_building_owned")
  end
end
```

Next we need to define the models
```ruby
# app/models/Person.rb
class Person < ApplicationRecord
  has_and_belongs_to_many :properties, class_name: 'Building', join_table: :person_building_owned
  has_and_belongs_to_many :locations, class_name: 'Building', join_table: :person_building_visited
end

# app/models/Building.rb
class Building < ApplicationRecord
  has_and_belongs_to_many :owners, class_name: 'Person', join_table: :person_building_owned
  has_and_belongs_to_many :visitors, class_name: 'Person', join_table: :person_building_visited
end
```


Let's see how it works
<code class='bash'>
$ bundle exec rails console
p1 = Person.create(name: "Nate")
p2 = Person.create(name: "Li")
build1 = Building.create(name: "Home")
build2 = Building.create(name: "Apt 3C")
p1.properties << build1
p1.propreties.first.name
=> "Home"
build1.owners.first.name
=> "Nate"
p1.locations << build1
p1.locations << build2
p2.locations << build2
build2.visitors.pluck(:name)
=> ["Nate", "Li"]
</code>

This creates a nice two way relationships and lets us developers use pretty names like visitors and properties when writing code.
You may decide you want to add additional data to your join_table (How many visits, purchase price etc). I'll cover this in another post. This involves creating a model to represent the join.

### Robust Join Table Example

```ruby
# db/migrate/xyz_people_own_and_visit_buildings.rb
class PeopleOwnAndVisitBuildings < ActiveRecord::Migration[6.0]
  def change
    # Create the table  
    create_join_table(:people, :buildings, table_name: "person_building_visited")
    # If the table gets large we'll need indices on id  
    add_index "person_building_visited", ["person_id"]
    add_index "person_building_visited", ["building_id"]
    # Enforce FK relationships  
    add_foreign_key "person_building_visited", "people"
    add_foreign_key "person_building_visited", "buildings"
    # No null entries        
    change_column_null(:person_building_visited, :person_id, false)
    change_column_null(:person_building_visited, :building_id, false)
    # Prevent duplicate entries  
    add_index "person_building_visited", ["person_id", "building_id"], unique: true

    create_join_table(:people, :buildings, table_name: "person_building_owned")
    add_index "person_building_owned", ["person_id"]
    add_index "person_building_owned", ["building_id"]
    add_foreign_key "person_building_owned", "people"
    add_foreign_key "person_building_owned", "buildings"
    change_column_null(:person_building_owned, :person_id, false)
    change_column_null(:person_building_owned, :building_id, false)
    add_index "person_building_owned", ["person_id", "building_id"], unique: true
  end
end
```
 
