---
layout: post
title:  "Solving the producer consumer problem with an atomic_compare_and_swap spinlock"
date:   2021-01-29 10:00:00 +0700
categories: [C++,C,mutex,spinlock]
---

Spinlocks are incredibly fast when there is 1 consumer and 1 producer. When there are more threads they are far slower than a semaphore
or conditional variable implementation.

For our spinlock we'll be using atomic_compare_and_swap. An atomic operation that takes three args 
1. *int to the lock
2. Expected value of the lock
3. The value to swap into the lock if the value from step 2 is found in the lock.

It then returns the found value of the spinlock which you must check. If the value is the value from #2 you've acquired the lock.
If not you must keep spinning.


Note that all the code is valid I just haven't included the struct used for passing around the spinlock and buffer as
that will be specific to your buffer.

The approach is thoroughly described in the code comments.

{% highlight C %}


#define FREE 0
#define LOCKED 1

#define true 1
#define false 0

// gcc built in: may be different for your compiler
#define atomic_compare_and_swap(destptr, oldval, newval) __sync_bool_compare_and_swap(destptr, oldval, newval)

int main() {
    spinlock = FREE ;
}


void acquire_lock(int* lock) {
    // Constantly check if lock is FREE and if so 
    // replace it's value with with LOCKED and return
    while (atomic_compare_and_swap(lock, FREE, LOCKED)) {};
}

void release_lock(int* lock) {
    // No races here as we have the lock
    *lock = FREE;
}


// Producer
int produce(/* spinlock and your args */) {

    while (true) {
        acquire_lock(spinlock));
        // If we can push break out of this loop
        // If not the ring is full and we must release the lock
        // To avoid contention on the lock iteself then we spin
        // on the can_push function.
        if (can_push()) { break; } 
        release_lock(spinlock);
        // spin on can_push to avoid stopping the consumer from getting the lock
        while (!can_push()) {}; 
    }   

    // PUSH ITEM ONTO THE BUFFER
    
    release_lock(spinlock)
    return 0;
}

// Consumer
int consume(/* spinlock and your args */) {

    while (true) {
        acquire_lock(spinlock));
        // If we can pull break out of this loop
        // If not the ring is empty and we must release the lock
        // To avoid contention on the lock iteself then we spin
        // on the can_pull function.
        if (can_pull()) { break; } 
        release_lock(spinlock);
        // spin on can_pull to avoid stopping the producer from getting the lock
        while (!can_pull()) {}; 
    }   

    // PULL ITEM FROM THE BUFFER
    
    release_lock(spinlock)
    return 0;
}
{% endhighlight %}