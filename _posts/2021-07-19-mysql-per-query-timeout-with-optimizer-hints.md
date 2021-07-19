---
layout: post
title:  "mysql 5.7 per query timeout with optimizer hints in rails 6.0 and plain sql"
date:   2021-07-19 10:00:00 +0700
categories: [mysql]
---

MySQL `>= 5.7` allows a per query timeout as an optimizer hint. It only works for `SELECT`.

Here's a 500ms timeout:

```sql
SELECT /*+ MAX_EXECUTION_TIME(500) */ COUNT(DISTINCT model.id)
FROM `model`
```

And in rails you can do
```ruby
begin
  count = Model.all.optimizer_hints("MAX_EXECUTION_TIME(500)").count
rescue ActiveRecord::StatementTimeout
  puts "Uh-oH!"
end
```


It's been easy to set a max query execution time in mysql for awhile. However this breaks mysqldump and other long
running commands. [post](/mysql/2021/04/02/how-to-set-mysql-query-timeout.html). 

So I've been searching for a way to do better per-query timeouts and here it is!

[MySQL docs](https://dev.mysql.com/doc/refman/5.7/en/optimizer-hints.html#optimizer-hints-execution-time)

