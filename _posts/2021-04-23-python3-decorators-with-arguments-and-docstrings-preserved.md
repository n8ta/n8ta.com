---
layout: post
title:  "Python decorators that have arguments and preserve docstrings"
date:   2021-04-23 10:00:00 +0700
categories: [python3,python,doctest,decorators]
---
tl;dr
<div id="important_line"></div>
{% highlight python %}
# Outermost decorator accepts arguments
def factory(the_arg): 
    # Inner decorator accepts the function
    def decorator(_func): 
        # Decorator creates this function 'inner' to replace the original
        def inner(*args, **kwargs): 
            print(f"Look we can use {the_arg} here!")
            return _func(*args, **kwargs)
        # Assign the original functions docstring to the new version 'inner'
        inner.__doc__ = _func.__doc__ 
        return inner
    return decorator
{% endhighlight  %}

I like using doctest for python3 to write tests. It looks like this
{% highlight python %}
def add(a,b):
    """
    >>> add(5,6)
    11
    """
    return a + b
{% endhighlight  %}

Then you can use `python3 -m doctests blah.py`
and it will run `add(5,6)` and compare it to `11`. Great easy inline tests just like rust.

The problem is in a case like this

{% highlight python %}
# Add the_arg to whatever the original function returns
def add_to_result(the_arg):
    def decorator(_func):
        def inner(*args, **kwargs):
            return _func(*args, **kwargs) + the_arg
        return inner
    return decorator

@add_to_result(10)
def add(a, b):
    """
    >>> add(1,2)
    13
    """
    return a + b
{% endhighlight  %}

doctest won't be able to find that there is a docstring on the add function because the decorator threw through it away here:
{% highlight python %}
def inner(*args, **kwargs): 
    return _func(*args, **kwargs) + the_arg # _func has the docstring
return inner # but inner doesn't becuase it's a brand new function
{% endhighlight  %}

All we have to do is add [one line ](#important_line)
`inner.__doc__ = _func.__doc__`
to our decorator and we can preserve it. 