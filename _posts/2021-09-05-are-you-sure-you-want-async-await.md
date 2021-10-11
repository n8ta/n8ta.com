---
layout: post
title:  "Ask not if async/await is good enough for you, ask if you are you good enough for async/await"
date:   2021-09-05 10:00:00 +0700
categories: [async,await,c#]
---

```c#
async Task<int> doesYourCodeLookLikeThisAsync() {
    var ifItDoes = await this.YouMightFindThat();
    var thereWasNoPoint = await to.usingAsyncAwait();
    because.There = await isNoParalellism(that, we, can exploit, here);
    becuase.What = await youActuallyWanted(was, to, make, single-thread, code, faster);
    // but that is hard so instead just use 
    // async await and that'll make everythign faster somehow. 
}
```

If you actually want to use async/await to make thing faster you need to notice what work can be done in parallel and 
actually do it in parallel and then await strategically when you need the result.

Here's what I see a lot. Code that boils down to be blocking non-async code.

```c#
var c_data = await this.loadCustomerData();
await this.process(c_data); // wait for customer work to be done
var v_data = await this.loadVendorData(); // then do vendor work
await this.process(v_data);
```

If you actually want a speedup you need something like this. 
```c#
var customerWork = Task.Run(async () => {
    var c_data = await this.loadCustomerData();
    await this.process(c_data);
});
var vendorWork = Task.Run(async () => {
    var v_data = await this.loadVendorData();
    await this.process(v_data);
});
Task.WhenAll(customerWork, vendorWork); // wait for both to complete in parallel
```

This isn't simpler. It's quite a bit more complicated. It's also harder to read.
In general I'd only want to implement this kind of solution when perf matters OR if the team is ready to normalize
async/await complexity.

If you don't have perf problems and don't want to run into async await complexity, code like it's 1990 (okay this is c# so 2000).

```c#
var c_data = this.loadCustomerData();
this.process(c_data);
var v_data = this.loadVendorData();
this.process(v_data);
```