---
layout: post
title:  "Solving the producer consumer problem with pthread_mutex_t alone"
date:   2021-01-26 10:00:00 +0700
categories: [C++,C,mutex,pthreads,semaphores]
---

C code for a producer consumer buffer using semaphores for synchronization.

Note that all the code is valid I just haven't included the struct used for passing around the semaphores, mutex, and buffer as
that will be specific to your buffer.

The approach is thoroughly described in the code comments.

{% highlight C %}

#include <semaphore.h>
#include <fcntl.h> // For O_CREAT flag


int main() {

    // You may only modify the buffer (not pictured) if you lock this mutex
    pthread_mutex_t mutex;
    pthread_mutex_init(&mutex, NULL);

    // These semaphores track the # of full and empty slots in the buffer
    // Not we init the empty semaphore to the total # of slots as
    // it starts out empty.
    sem_t empty = sem_open("/empty_slots", O_CREAT );
    sem_t full = sem_open("/full_slots", O_CREAT);
    for (int i = 0; i < size; i++) {
        sem_post(empty);  
    }

    // Maybe make some threads here and call push n pull below
    return 0;

}

// Producer
int produce(/* mutex, empty, full and your args */) {

    // For a push to continue empty must not be 0 so we wait for 
    // empty != 0. When that happens sem_wait calls empty-- 
    // and pushing begins.
    sem_wait(empty);
    
    // Get exclusive use of the buffer
    pthread_mutex_lock(mutex);

    // PUSH ITEM ONTO THE BUFFER

    // Now that we've added an item there is one more full slot.
    // sem_post adds one to full possibly waking up a consumer
    sem_post(full);

    // Release the mutex for the next person
    pthread_mutex_unlock(mutex);
    return 0;
}

// Consumer
int consume(/* mutex, empty, full and your args */) {

    // To pull we need at least one full slot. Aka full != 0, so we wait 
    // on the semaphore full./ When full is non-zero we are 
    // unblocked and sem_wait decrements it.
    sem_wait(full);

    // Get exclusive use of the buffer
    pthread_mutex_lock(mutex);

    // PULL AN ITEM OF THE BUFFER
    
    // Now that we've pulled there's one more empty slot so add one 
    // to empty possibly waking up a producer
    sem_post(empty);

    // Release the mutex for the next person
    pthread_mutex_unlock(mutex);
    return 0;
}
{% endhighlight %}