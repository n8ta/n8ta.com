---
layout: post
title:  "The easiest way to fix a join table with duplicate entries"
date:   2019-07-21 06:20:00 +0700
categories: [SQL, Rails]
---

I recently create some join tables I blissfully let a script run to populate them. The script ran for a few hours and it added about 20k entries which seemed reasonable. Only after it finished did I realize I had failed to create unique constraints on the join table so there were tons of duplicates. So here's how you can remove duplicates from a join table in rails after the fact. 

Let's say you have two models, "model" and "other_model" and you want to remove duplicates from their join table. The easiest thing to do is:

{% highlight ruby%}
Model.all.each do |model|
    model.other_model = model.other_model.uniq
end
{% endhighlight %}

Yup it's that easy (:

You're models probably look something like this:

{% highlight ruby%}
class Model < ApplicationRecord
  has_and_belongs_to_many :other_model
end

class OtherModel < ApplicationRecord
  has_and_belongs_to_many :model
end
{% endhighlight %}

