---
layout: post
title:  "What's up with null in c# (and c, cpp, etc...)"
date:   2021-08-22 10:00:00 +0700
categories: [c sharp]
---
I constantly see this at work

```c#
public class Tmp {
	public void DoSomething(TheType a, TheOtherType b, AnOtherType c) {
		if (a == null) {
		    throw new ArgumentNullException("a");
		}
		if (b == null) {
		    throw new ArgumentNullException("b");
		}
		if (c == null) {
		    throw new ArgumentNullException("c");
		}
		Console.WriteLine("Done");
	}
}
```
And I die a little inside every time.

Didn't I say I wanted a `TheType`? Why is it possible that I am instead given a bomb type instead that'll explode if I touch it.
Eg:


```c#				
public class TheType {}
public class TheOtherType {}
public class AnotherType {}

public class Program
{
	public static void Main()
	{
		var tmp = new Tmp();
		tmp.DoSomething(null, null, null); // Somehow null is a valid `TheType`
	}
	
}
public class Tmp {
	public void DoSomething(TheType a, TheOtherType b, AnotherType c) {
		a.ToString();
		Console.WriteLine("Done");
	}
}
```

And BOOM, exception.
```
Run-time exception (line 19): Object reference not set to an instance of an object.

Stack Trace:

[System.NullReferenceException: Object reference not set to an instance of an object.]
   at Tmp.DoSomething(TheType a, TheOtherType b, AnotherType c) :line 19
   at Program.Main() :line 13

```

My poor function `DoSomething` asked for a `TheType` was handled literally nothing and the type system just let it happen.

This is made worse by the fact that c# has the idea of nullability and they get it right for primitives. Here's a program
that won't compile. (Wouldn't it be great if the earlier examples didn't compile too!)
```c#
public class Program
{
	public static void Main()
	{
		long? a = 123;
		var mapping = new Dictionary<long,long>();
		mapping[a] = 1;
	}
}
```
```awk
Error(s):
(15:11) Argument 1: cannot convert from 'long?' to 'long'
```

Hey look at that it noticed that a nullable long `long?` is not the same as a `long`.

And `C#` even has this pretty syntax:

```C#
public class Program
{
    public static void M`ai``n()
    {
        long? a = 123;
        if (a is long notNullA) {
            var mapping = new Dictionary<long,long>();
            mapping[notNullA] = 1;
        }
    }
}
```

We can unwrap our `long?` into a `long` and get a new variable with the correct type. 

Of course you can do the same unwrapping trick for classes but you shouldn't need to double check every arguement is the type
you asked for. Classes should default to non-nullable just like the primitives. 

The current behavior is un-intuitive, boilerplate heavy, and inflexible.