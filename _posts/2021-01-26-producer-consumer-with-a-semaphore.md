---
layout: post
title:  "Solving the producer consumer problem with mutexes (pthread_mutex_t) and semaphores (sem_t)"
date:   2021-01-26 10:00:00 +0700
categories: [C++,C,mutex,pthreads,semaphores]
---

A quick word about semaphores. Unless you need reference a semaphore acrosss multiple processes I highly recommend using 
`sem_init` over `sem_open`. `sem_open` creates semaphores that can persist beyond the life of your process if you don't properly close them.
Say if you ctrl+c to stop a deadlocked program. 

C code for a producer consumer buffer using mutexes and semaphores for synchronization.

Note that all the code is valid I just haven't included the struct used for passing around the semaphores, mutex, and buffer as
that will be specific to your buffer.

The approach is thoroughly described in the code comments.

{% highlight C %}

#include <semaphore.h>
#include <fcntl.h> // For O_CREAT flag


int main() {

    // You may only modify the buffer (not pictured) if you lock this mutex
    pthread_mutex_t mutex;
    pthread_cond_t space_avail; // Waited on by producers when the buffer is full
    pthread_cond_t items_ready; // Waited on by consumers when the buffer is empty

    // Init conditionals and mutex and checkf or failures
    if (pthread_cond_init(items_ready, NULL)) { return 0; }
    if (pthread_cond_init(space_avail, NULL)) { return 0; }
    if (pthread_mutex_init(mutex, NULL) != 0) {  return 0; }

    // Maybe make some threads here and call push n pull below
    return 0;

}

// Producer
int produce(/* mutex, empty, full and your args */) {

    // Lock the mutex to gain exclusive access to the buffer
    pthread_mutex_lock(mutex);
    
    // If you can't push because the buffer is full cond_wait.
    // This releases the mutex until a consumer signals space_avail 
    while (!can_push(buffer))  {
        pthread_cond_wait(space_avail, mutex);
    }
    
    // PUSH AN ITEM

    // After pushing singal items_ready so one consumer waiting 
    // on that conditional variable can wake up.
    pthread_cond_signal(items_ready);

    // We're done with the buffer so release the mutex
    pthread_mutex_unlock(mutex);

    retunr 0
}

// Consumer
int consume(/* mutex, empty, full and your args */) {
    // Get exclsuvie access to the buffer
    pthread_mutex_lock(mutex);

    // If the buffer is empty (i.e. we can't pull) call cond_wait
    // on items_ready. This will release the mutex in arg2 and 
    // wait to be signaled by a producer 
    while (!can_pull(buffer)) {
        pthread_cond_wait(items_ready, mutex);
    }

    // PULL AN ITEM HERE

    // After pulling an item there is space_available in the buffer
    // so singal a producer
    pthread_cond_signal(space_avail);

    // Relase control of the buffer
    pthread_mutex_unlock(mutex);

    return 0;
}
{% endhighlight %}